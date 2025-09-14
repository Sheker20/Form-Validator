import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";
import DocumentPreview from "./components/DocumentPreview";
import ValidationResults from "./components/ValidationResults";
import SummaryPanel from "./components/SummaryPanel";

export default function App() {
  const [file, setFile] = useState(null);           // selected File object
  const [fields, setFields] = useState([]);         // [{name,value}, ...]
  const [errors, setErrors] = useState({});         // { Field_3: "msg", ... }
  const [summary, setSummary] = useState(null);     // { total, valid, review, errors }
  const [resultsReady, setResultsReady] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Called when UploadForm selects/changes file
  const handleFileSelect = (f) => {
    setFile(f);
    setResultsReady(false);
    setFields([]);
    setErrors({});
    setSummary(null);
  };

  // Called from UploadForm -> triggers HTTP upload to backend
  const handleUpload = async (f) => {
    if (!f) {
      alert("Select a file before uploading.");
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", f);

      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 20000,
      });

      const data = res.data;
      // backend returns fields: array, errors: object, summary: object
      setFields(data.fields || []);
      setErrors(data.errors || {});
      setSummary(data.summary || null);
      setResultsReady(true);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed — check backend console and network tab.");
    } finally {
      setIsUploading(false);
    }
  };

  // Export the full validation result (fields + errors + summary)
  const handleExport = () => {
    if (!resultsReady) {
      alert("No results to export");
      return;
    }
    const payload = { fields, errors, summary, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `validation-results-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      <Navbar onExport={handleExport} exportDisabled={!resultsReady} />
      <div className="p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left column: upload + preview */}
        <div className="col-span-1 space-y-4">
          <UploadForm
            onFileSelect={handleFileSelect}
            onUpload={handleUpload}
            selectedFile={file}
            isUploading={isUploading}
          />
          <DocumentPreview file={file} uploadedFileInfo={null} />
        </div>

        {/* Middle: validation results */}
        <div className="col-span-1 lg:col-span-2">
          <ValidationResults fields={fields} errors={errors} />
        </div>

        {/* Right: summary */}
        <div className="col-span-1">
          <SummaryPanel summary={summary} />
        </div>
      </div>
    </div>
  );
}
