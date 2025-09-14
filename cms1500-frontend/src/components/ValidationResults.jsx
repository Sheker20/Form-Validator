import React, { useEffect, useState } from "react";

export default function ValidationResults({ fields = [], errors = {} }) {
  const [localFields, setLocalFields] = useState([]);

  useEffect(() => {
    // copy props to local state so inputs are editable
    setLocalFields(fields.map((f) => ({ ...f })));
  }, [fields]);

  const onChange = (idx, val) => {
    const copy = [...localFields];
    copy[idx].value = val;
    setLocalFields(copy);
  };

  if (!fields || fields.length === 0) {
    return <div className="bg-white p-4 rounded shadow text-gray-500">No results yet — upload a document.</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Validation Results</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
        {localFields.map((f, idx) => {
          const errMsg = errors[f.name];
          return (
            <div key={f.name} className="flex flex-col">
              <label className="text-sm font-medium mb-1">{f.name}</label>
              <input
                value={f.value}
                onChange={(e) => onChange(idx, e.target.value)}
                className={`border px-2 py-1 rounded ${errMsg ? "border-red-500" : "border-gray-300"}`}
              />
              {errMsg && <div className="text-xs mt-1 text-red-600">{errMsg}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
