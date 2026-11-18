import mongoose from "mongoose";
import { execSync } from "node:child_process";

function convertSrvUri(uri) {
  try {
    const match = uri.match(/^mongodb\+srv:\/\/([^@]+)@([^/?]+)(\/[^?]*)?(\?.*)?$/);
    if (!match) return null;

    const [, userinfo, hostname, pathname = "", search = ""] = match;

    const srvCmd = `powershell -NoProfile -Command "Resolve-DnsName -Name _mongodb._tcp.${hostname} -Type SRV | Select-Object -ExpandProperty NameTarget"`;
    const srvOutput = execSync(srvCmd, { encoding: "utf-8" });
    const hosts = srvOutput
      .split(/\r?\n/)
      .map((s) => s.trim().replace(/\.$/, ""))
      .filter(Boolean)
      .map((target) => `${target}:27017`)
      .join(",");

    if (!hosts) return null;

    let extraParams = "ssl=true";
    try {
      const txtCmd = `powershell -NoProfile -Command "Resolve-DnsName -Name ${hostname} -Type TXT | Select-Object -ExpandProperty Strings"`;
      const txtOutput = execSync(txtCmd, { encoding: "utf-8" }).trim();
      if (txtOutput) {
        extraParams += `&${txtOutput}`;
      }
    } catch {
      extraParams += "&authSource=admin";
    }

    const queryPrefix = search ? `${search}&` : "?";
    return `mongodb://${userinfo}@${hosts}${pathname}${queryPrefix}${extraParams}`;
  } catch {
    return null;
  }
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI ortam değişkeni tanımlanmamış.");
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB bağlantısı başarılı: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    // Windows c-ares / hotspot DNS SRV EBADRESP durumunda sistem DNS fallback'i
    if (error.message.includes("querySrv") || error.message.includes("EBADRESP")) {
      const fallbackUri = convertSrvUri(uri);
      if (fallbackUri) {
        try {
          const conn = await mongoose.connect(fallbackUri);
          console.log(`MongoDB bağlantısı başarılı: ${conn.connection.host}`);
          return conn;
        } catch (fallbackError) {
          console.error("MongoDB bağlantı hatası:", fallbackError.message);
          throw fallbackError;
        }
      }
    }

    console.error("MongoDB bağlantı hatası:", error.message);
    throw error;
  }
}
