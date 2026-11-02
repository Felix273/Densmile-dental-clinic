import { createClient, Client } from "@libsql/client";

const globalForDb = globalThis as unknown as { __db?: Client };

const TURSO_URL = process.env.TURSO_DATABASE_URL || "libsql://densmile-db-felix273.aws-us-west-2.turso.io";
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTIzMjg1NzgsImlkIjoiMDFhMTRmMWItMjIwMS03ZjI0LWIxM2UtZDM5YTA4OThiZGEyIiwia2lkIjoibnhYTlFWNFdFNFVqdERuTFF0WTh2TjdBcWRhLW5waEktdkNRU2c1M25aYyIsInJpZCI6IjcxOTliM2RmLWQzZDctNDI1NS04MDI2LWIxNTI1MWM0ZWEyOSJ9.ALVM3qwW0CaltNb-c_26zBdlEjZNfALsLUjffd_-zN6wKJOM8mZiu5aXYN11N6yVdtW5d5WcK9YkjN6ZTlHtAg";

export function getDb(): Client {
  if (!globalForDb.__db) {
    globalForDb.__db = createClient({
      url: TURSO_URL,
      authToken: TURSO_TOKEN,
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
