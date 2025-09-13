import rules from "./validation/rules";

/**
 * Mock API that "extracts" fields from an uploaded CMS-1500 form and applies validation rules.
 * This is a simplified simulation to help the frontend demonstrate flagging using the provided rules.
 */

const sampleExtracted = {
  subscriberFirstName: "John",
  subscriberLastName: "Doe",
  dob: "13-45-2020",
  gender: "",
  policyNumber: "A123456",
  npi: "1234567890",
  serviceDate: "2025-07-32",
  cpt: "99213",
  icd: "Z00.00",
  units: "0",
  placeOfService: "11",
  signature: ""
};

function sleep(ms) { return new Promise((res) => setTimeout(res, ms)); }

function applyRules(extracted) {
  const fields = Object.keys(extracted).map((k) => {
    const value = extracted[k];
    // find matching rules by field name
    const matched = rules.filter(r => r.fields.includes(k));
    let status = "ok";
    let issue = "";
    let suggestion = "";
    for (const r of matched) {
      if (r.type === "missing" && (!value || String(value).trim().length===0)) {
        status = status === "error" ? "error" : "error";
        issue = r.message;
        suggestion = r.suggestion;
      }
      if (r.type === "format") {
        if (!r.regex.test(String(value))) {
          status = status === "error" ? "error" : "error";
          issue = r.message;
          suggestion = r.suggestion;
        }
      }
      if (r.type === "cross" && r.check) {
        try {
          const res = r.check(extracted);
          if (res) {
            status = res.status || status;
            issue = res.message || issue;
            suggestion = res.suggestion || suggestion;
          }
        } catch(e) {}
      }
    }
    return {
      field: k,
      label: k,
      value,
      status,
      issue,
      suggestion
    };
  });

  return { summary: `${fields.length} fields — ${fields.filter(f=>f.status==='error').length} errors, ${fields.filter(f=>f.status==='warn').length} warnings`, fields };
}

export default {
  async uploadAndValidate(file) {
    await sleep(800);
    // in real app we'd call OCR and parser; here use sampleExtracted as base
    const result = applyRules(sampleExtracted);
    return result;
  }
};
