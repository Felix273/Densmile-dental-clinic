import Link from "next/link";
import { notFound } from "next/navigation";
import { queryOne } from "@/lib/db";
import { getResource } from "@/lib/resources";
import { saveResourceAction } from "@/lib/actions";
import ResourceForm from "../../resource-form";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EditPage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  const { resource, id } = await params;
  const res = getResource(resource);
  if (!res) notFound();

  let values: Record<string, string | number> = { published: 1, sort: 0, rating: 5 };
  if (id !== "new") {
    const rawRow = await queryOne<Record<string, string | number>>(
      `SELECT * FROM ${res.table} WHERE id = ?`,
      [Number(id)]
    );
    if (!rawRow) notFound();
    // JSON round-trip guarantees a 100% pure plain object, preventing React #441
    values = JSON.parse(JSON.stringify(rawRow));
  }

  const isNew = id === "new";
  const title = isNew ? `New ${res.singular}` : `Edit ${res.singular}`;

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Link
          href={`/admin/${res.key}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13.5,
            color: "var(--muted)",
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to {res.label}</span>
        </Link>
      </div>

      <div className="page-header" style={{ marginBottom: 20 }}>
        <div className="page-header-info">
          <h1>{title}</h1>
          <p>
            {isNew
              ? `Fill in the details below to create a new ${res.singular.toLowerCase()}.`
              : `Modify the fields below. Changes will immediately update on the public website.`}
          </p>
        </div>
      </div>

      <ResourceForm
        fields={res.fields}
        values={values}
        resourceKey={res.key}
        resourceId={id}
        action={saveResourceAction}
        cancelHref={`/admin/${res.key}`}
      />
    </>
  );
}
