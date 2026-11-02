import { query, getSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

const headers = { "Access-Control-Allow-Origin": process.env.WEBSITE_ORIGIN ?? "*" };

export async function GET() {
  const list = async (t: string) => {
    try {
      return await query(`SELECT * FROM ${t} WHERE published = 1 ORDER BY sort, id`);
    } catch {
      return [];
    }
  };

  const [settings, services, team, testimonials, faqs, partners, gallery, pillars, branches] = await Promise.all([
    getSettings(),
    list("services"),
    list("team"),
    list("testimonials"),
    list("faqs"),
    list("partners"),
    list("gallery"),
    list("pillars"),
    list("branches"),
  ]);

  return Response.json(
    { settings, services, team, testimonials, faqs, partners, gallery, pillars, branches },
    { headers }
  );
}
