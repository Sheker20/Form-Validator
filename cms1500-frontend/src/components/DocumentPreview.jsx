import React from "react";

export default function DocumentPreview({ file }) {
  if (!file) {
    return (
      <div className="bg-white p-4 rounded shadow text-gray-500">
        No file selected
      </div>
    );
  }

  const isImage = file.type && file.type.startsWith("image/");
  const previewUrl = isImage ? URL.createObjectURL(file) : null;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold mb-2">Document Preview</h4>

      {isImage && (
        <div className="mb-2">
          <img src={previewUrl} alt="preview" className="max-h-48 object-contain rounded" />
        </div>
      )}

      <div className="text-sm text-gray-700">
        <div><strong>Name:</strong> {file.name}</div>
        <div><strong>Type:</strong> {file.type || "—"}</div>
        <div><strong>Size:</strong> {(file.size / 1024).toFixed(1)} KB</div>
        <div><strong>Last Modified:</strong> {new Date(file.lastModified).toLocaleString()}</div>
      </div>
    </div>
  );
}
