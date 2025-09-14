// backend-mock/server.js
import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log("Received file:", req.file?.originalname);

  // Generate 38 dummy fields (name/value)
  const fields = Array.from({ length: 38 }, (_, i) => ({
    name: `Field_${i + 1}`,
    value: `Value_${i + 1}`,
  }));

  // Simulated errors for some fields (object mapping name->message)
  const errors = {
    Field_3: "Missing required value",
    Field_10: "Invalid date format",
    Field_22: "Code not recognized",
    Field_30: "Value out of range",
  };

  const summary = {
    total: fields.length,
    valid: fields.length - Object.keys(errors).length,
    review: 2,
    errors: Object.keys(errors).length,
  };

  // Return the shape the frontend expects:
  res.json({
    success: true,
    fields,
    errors,
    summary,
    uploadedFileInfo: {
      originalName: req.file?.originalname || null,
      mimetype: req.file?.mimetype || null,
      size: req.file?.size || null
    }
  });
});

app.listen(PORT, () => console.log(`🚀 Mock backend running at http://localhost:${PORT}`));
