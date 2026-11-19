import { createClient, Client } from "@libsql/client";

const globalForDb = globalThis as unknown as { __db?: Client };

export function getDb(): Client {
  if (!globalForDb.__db) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url || !authToken) {
      throw new Error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN environment variables.");
    }

    globalForDb.__db = createClient({
      url,
      authToken,
    });
  }
  return globalForDb.__db;
}

function toPlainObject<T>(columns: string[], row: any): T {
  const obj: Record<string, any> = {};
  for (const col of columns) {
    obj[col] = row[col];
  }
  return obj as T;
}

export async function query<T = Record<string, any>>(sql: string, args: any[] = []): Promise<T[]> {
  const db = getDb();
  const res = await db.execute({ sql, args });
  return res.rows.map((row) => toPlainObject<T>(res.columns, row));
}

export async function queryOne<T = Record<string, any>>(sql: string, args: any[] = []): Promise<T | null> {
  const db = getDb();
  const res = await db.execute({ sql, args });
  const row = res.rows[0];
  if (!row) return null;
  return toPlainObject<T>(res.columns, row);
}

export async function execute(sql: string, args: any[] = []): Promise<void> {
  const db = getDb();
  await db.execute({ sql, args });
}

export async function getSettings(): Promise<Record<string, string>> {
  const rows = await query<{ key: string; value: string }>("SELECT key, value FROM settings");
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}
