import { z } from "zod";
import { execute } from "@/lib/db";

export const dynamic = "force-dynamic";

const headers = {
  "Access-Control-Allow-Origin": process.env.WEBSITE_ORIGIN ?? "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  email: z.union([z.literal(""), z.string().email().max(150)]).default(""),
  service: z.string().trim().max(150).default(""),
  preferred_date: z.string().trim().max(30).default(""),
  message: z.string().trim().max(1000).default(""),
});

const hits = new Map<string, number[]>();

export function OPTIONS() {
  return new Response(null, { status: 204, headers });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return Response.json({ error: "Too many requests" }, { status: 429, headers });
  hits.set(ip, [...recent, now]);

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Please check the form and try again." }, { status: 400, headers });

  const d = parsed.data;
  await execute(
    "INSERT INTO appointments (name,phone,email,service,preferred_date,message) VALUES (?,?,?,?,?,?)",
    [d.name, d.phone, d.email, d.service, d.preferred_date, d.message]
  );
  return Response.json({ ok: true }, { status: 201, headers });
}
