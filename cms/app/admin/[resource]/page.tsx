import Link from "next/link";
import { notFound } from "next/navigation";
import { query } from "@/lib/db";
import { getResource } from "@/lib/resources";
import { deleteResource } from "@/lib/actions";
import { Plus, Pencil, Eye, EyeOff, Image as ImageIcon } from "lucide-react";
import DeleteButton from "../delete-button";

export default async function ListPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  const res = getResource(resource);
  if (!res) notFound();

  let rows: Record<string, string | number>[] = [];
  try {
    rows = await query(`SELECT * FROM ${res.table} ORDER BY sort, id`);
  } catch {
    rows = [];
  }

  const hasImage = res.fields.some((f) => f.name === "image_url" || f.name === "logo_url");
  const imgField = res.fields.find((f) => f.name === "image_url" || f.name === "logo_url")?.name;

  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <h1>{res.label}</h1>
          <p>
            Manage and publish {res.label.toLowerCase()} displayed on the public website ({rows.length} total).
          </p>
        </div>

        <Link className="btn" href={`/admin/${res.key}/new`}>
          <Plus size={16} />
          <span>Add {res.singular}</span>
        </Link>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-wrapper" style={{ border: 0, borderRadius: 0 }}>
          <table>
            <thead>
              <tr>
                {hasImage && <th style={{ width: 60 }}>Preview</th>}
                <th>{res.fields.find((f) => f.name === res.titleField)?.label || "Title"}</th>
                {res.subtitleField && <th>{res.fields.find((f) => f.name === res.subtitleField)?.label}</th>}
                <th style={{ width: 80 }}>Order</th>
                <th style={{ width: 110 }}>Visibility</th>
                <th style={{ textAlign: "right", width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const imgVal = imgField ? String(r[imgField] || "") : "";
                return (
                  <tr key={r.id}>
                    {hasImage && (
                      <td>
                        {imgVal ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={imgVal}
                            alt=""
                            className="table-thumb"
                          />
                        ) : (
                          <div className="table-thumb" style={{ display: "grid", placeItems: "center", color: "var(--muted-light)" }}>
                            <ImageIcon size={18} />
                          </div>
                        )}
                      </td>
                    )}

                    <td>
                      <b style={{ color: "var(--ink)", display: "block", fontSize: 14.5 }}>
                        {String(r[res.titleField] || "Untitled")}
                      </b>
                      {r.slug && <span style={{ fontSize: 12, color: "var(--muted)" }}>/{r.slug}</span>}
                    </td>

                    {res.subtitleField && (
                      <td>
                        <span style={{ fontSize: 13.5, color: "var(--muted)" }}>
                          {String(r[res.subtitleField] || "—")}
                        </span>
                      </td>
                    )}

                    <td>
                      <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>
                        {r.sort ?? 0}
                      </span>
                    </td>

                    <td>
                      <span className={`badge ${r.published ? "published" : "draft"}`}>
                        {r.published ? <Eye size={12} /> : <EyeOff size={12} />}
                        <span>{r.published ? "Live" : "Draft"}</span>
                      </span>
                    </td>

                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <div style={{ display: "inline-flex", gap: 8 }}>
                        <Link className="btn ghost sm" href={`/admin/${res.key}/${r.id}`}>
                          <Pencil size={13} />
                          <span>Edit</span>
                        </Link>

                        <form
                          style={{ display: "inline" }}
                          action={deleteResource.bind(null, res.key, Number(r.id))}
                        >
                          <DeleteButton confirmText={`Are you sure you want to delete this ${res.singular.toLowerCase()}?`} />
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={hasImage ? 6 : 5}
                    style={{ textAlign: "center", padding: "48px 16px", color: "var(--muted)" }}
                  >
                    <p style={{ marginBottom: 12 }}>No {res.label.toLowerCase()} found.</p>
                    <Link className="btn sm" href={`/admin/${res.key}/new`}>
                      <Plus size={14} />
                      <span>Create the first {res.singular.toLowerCase()}</span>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
