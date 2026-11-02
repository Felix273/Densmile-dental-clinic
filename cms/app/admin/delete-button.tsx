"use client";

import { Trash2 } from "lucide-react";

export default function DeleteButton({
  confirmText = "Are you sure you want to delete this?",
  showText = false,
}: {
  confirmText?: string;
  showText?: boolean;
}) {
  return (
    <button
      type="submit"
      className="btn danger sm"
      onClick={(e) => {
        if (!confirm(confirmText)) {
          e.preventDefault();
        }
      }}
      title="Delete"
    >
      <Trash2 size={13} />
      {showText && <span>Delete</span>}
    </button>
  );
}
