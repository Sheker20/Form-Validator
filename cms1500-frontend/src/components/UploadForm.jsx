import React, { useRef, useState, useEffect } from "react";

export default function UploadForm({ onFileSelect, onUpload, selectedFile, isUploading }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [localFile, setLocalFile] = useState(selectedFile || null);

  useEffect(() => setLocalFile(selectedFile || null), [selectedFile]);

  const openPicker = () => inputRef.current && inputRef.current.click();

  const handleChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setLocalFile(f);
      onFileSelect && onFileSelect(f);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) {
      setLocalFile(f);
      onFileSelect && onFileSelect(f);
    }
  };

  const clickUpload = () => {
    if (!localFile) {
      alert("Select a file first (either drag-drop or browse).");
      return;
    }
    onUpload && onUpload(localFile);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Upload Document</h3>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openPicker}
        className={`h-36 border-2 border-dashed rounded flex items-center justify-center cursor-pointer transition ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
      >
        <div className="text-center text-sm text-gray-600">
          {localFile ? (
            <div>
              <div className="font-medium">{localFile.name}</div>
              <div className="text-xs mt-1">{localFile.type || "Unknown type"}</div>
              <div className="text-xs mt-1">{(localFile.size / 1024).toFixed(1)} KB</div>
              <div className="text-xs mt-1 text-gray-500">{new Date(localFile.lastModified).toLocaleString()}</div>
            </div>
          ) : (
            <div>
              <div className="font-medium">Drag & drop a file here</div>
              <div className="text-xs mt-1">or click to browse (PDF / JPG / PNG)</div>
            </div>
          )}
        </div>
      </div>

      <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="hidden" />

      <div className="mt-3 flex gap-2">
        <button onClick={openPicker} className="px-3 py-1 border rounded bg-gray-50">Browse</button>
        <button onClick={clickUpload} className="px-3 py-1 bg-blue-600 text-white rounded" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </button>
        <button onClick={() => { setLocalFile(null); onFileSelect && onFileSelect(null); }} className="px-3 py-1 border rounded">Clear</button>
      </div>
    </div>
  );
}
