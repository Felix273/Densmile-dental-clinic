import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await requireSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file was selected for upload." }, { status: 400 });
    }

    const mime = file.type || "image/jpeg";
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "image/avif",
    ];

    if (!allowed.includes(mime)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a JPEG, PNG, WebP, GIF, or SVG image." },
        { status: 400 },
      );
    }

    // Convert to Base64 Data URL (fits directly in Turso DB, 100% Vercel serverless compatible)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${mime};base64,${base64}`;

    return NextResponse.json({ url: dataUrl, success: true });
  } catch (err) {
    console.error("Image upload failed:", err);
    return NextResponse.json({ error: "Failed to process image." }, { status: 500 });
  }
}
