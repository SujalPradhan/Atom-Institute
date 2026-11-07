import { Storage } from "@google-cloud/storage";
import { promises as fs } from "node:fs";
import path from "node:path";

export interface Store {
  read(key: string): Promise<string | null>;
  write(key: string, data: string): Promise<void>;
  list(prefix: string): Promise<string[]>;
}

class GcsStore implements Store {
  private bucket;
  constructor(name: string) {
    this.bucket = new Storage().bucket(name);
  }
  async read(key: string) {
    const file = this.bucket.file(key);
    const [exists] = await file.exists();
    if (!exists) return null;
    const [buf] = await file.download();
    return buf.toString("utf8");
  }
  async write(key: string, data: string) {
    await this.bucket.file(key).save(data, { contentType: "application/json", resumable: false });
  }
  async list(prefix: string) {
    const [files] = await this.bucket.getFiles({ prefix });
    return files.map((f) => f.name);
  }
}

class FsStore implements Store {
  constructor(private dir: string) {}
  private resolve(key: string) {
    const p = path.resolve(this.dir, key);
    if (!p.startsWith(path.resolve(this.dir) + path.sep)) throw new Error("bad key");
    return p;
  }
  async read(key: string) {
    try {
      return await fs.readFile(this.resolve(key), "utf8");
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw e;
    }
  }
  async write(key: string, data: string) {
    const p = this.resolve(key);
    await fs.mkdir(path.dirname(p), { recursive: true });
    await fs.writeFile(p, data);
  }
  async list(prefix: string) {
    const dir = this.resolve(prefix);
    try {
      const names = await fs.readdir(dir);
      return names.map((n) => path.posix.join(prefix, n));
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw e;
    }
  }
}

export function createStore(): Store {
  if (process.env.BUCKET) return new GcsStore(process.env.BUCKET);
  if (process.env.STORAGE_DIR) return new FsStore(process.env.STORAGE_DIR);
  throw new Error("Set BUCKET or STORAGE_DIR");
}
