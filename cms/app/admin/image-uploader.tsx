"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Upload, X, CheckCircle2, Loader2, Link as LinkIcon, RefreshCw } from "lucide-react";

interface ImageUploaderProps {
  name: string;
  defaultValue?: string;
  label: string;
  help?: string;
  required?: boolean;
}

// Client-side canvas compression: turns any 10MB photo into a fast, lightweight ~80KB JPEG
function compressFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const maxWidth = 1000;
        const maxHeight = 1000;
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Export as compressed 75% quality JPEG
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
        resolve(compressedDataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

export default function ImageUploader({
  name,
  defaultValue = "",
  label,
  help,
  required = false,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      // Instant client-side compression (< 100KB)
      const compressedUrl = await compressFile(file);
      setImageUrl(compressedUrl);
    } catch (err: unknown) {
      console.error("Compression error:", err);
      setError("Failed to process image. Please try another image.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setImageUrl("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="field" style={{ marginBottom: 22 }}>
      <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>
          {label} {required && <span style={{ color: "var(--danger)" }}>*</span>}
        </span>
        <button
          type="button"
          onClick={() => setShowManualInput(!showManualInput)}
          style={{
            background: "none",
            border: "none",
            color: "var(--primary)",
            fontSize: 12,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontWeight: 500,
            padding: 0,
          }}
        >
          <LinkIcon size={12} />
          <span>{showManualInput ? "Hide manual URL" : "Paste URL instead"}</span>
        </button>
      </label>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Value submitted with the form */}
      <input type="hidden" name={name} value={imageUrl} required={required} />

      {/* Manual URL input fallback if toggled */}
      {showManualInput && (
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="e.g. /img/exam.jpg or https://..."
            style={{ fontSize: 13, padding: "8px 12px" }}
          />
        </div>
      )}

      {/* Preview Area */}
      {imageUrl ? (
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--hairline)",
            borderRadius: "var(--radius-md)",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Preview"
            style={{
              width: 90,
              height: 64,
              objectFit: "cover",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--hairline)",
              background: "#f1f5f9",
              flexShrink: 0,
            }}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--teal)", fontSize: 12.5, fontWeight: 600 }}>
              <CheckCircle2 size={14} />
              <span>Image ready</span>
            </div>
            <p
              style={{
                fontSize: 12,
                color: "var(--muted)",
                marginTop: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontFamily: "monospace",
              }}
              title={imageUrl}
            >
              {imageUrl.startsWith("data:") ? "[Compressed Image Data]" : imageUrl}
            </p>
          </div>

          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button
              type="button"
              className="btn secondary sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <RefreshCw size={13} />
              <span>Replace</span>
            </button>
            <button
              type="button"
              className="btn danger sm"
              onClick={handleRemove}
              disabled={uploading}
              title="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          style={{
            background: "#ffffff",
            border: "2px dashed var(--hairline)",
            borderRadius: "var(--radius-md)",
            padding: "24px 20px",
            textAlign: "center",
            cursor: uploading ? "wait" : "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {uploading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--primary)" }}>
              <Loader2 size={26} className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />
              <b style={{ fontSize: 13.5 }}>Compressing image...</b>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--primary-soft)",
                  color: "var(--primary)",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 2,
                }}
              >
                <Upload size={18} />
              </div>
              <b style={{ fontSize: 13.5, color: "var(--ink)" }}>Click to upload an image</b>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>
                Supports PNG, JPG, WebP (automatically compressed and optimized)
              </span>
            </div>
          )}
        </div>
      )}

      {error && (
        <p style={{ color: "var(--danger)", fontSize: 12.5, marginTop: 6, fontWeight: 500 }}>
          {error}
        </p>
      )}

      {help && !error && <small>{help}</small>}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
