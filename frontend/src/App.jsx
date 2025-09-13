import React, { useState } from "react";
import {
  Box, Container, Grid, Typography, AppBar, Toolbar,
  IconButton, Button
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import FileUpload from "./components/FileUpload";
import PreviewPanel from "./components/PreviewPanel";
import ResultsPanel from "./components/ResultsPanel";
import SummaryPanel from "./components/SummaryPanel";
import axios from "axios";

// Clerk
import { useAuth, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function App() {
  const [uploading, setUploading] = useState(false);
  const [documentFile, setDocumentFile] = useState(null);
  const [results, setResults] = useState(null);

  const { getToken } = useAuth(); // Clerk hook

  // Handle file upload with backend JWT auth
  async function handleFile(file) {
    setUploading(true);
    setDocumentFile(file);

    try {
      const token = await getToken(); // get JWT from Clerk
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        `${process.env.VITE_API_BASE_URL}/api/ocr`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // send JWT
          },
        }
      );

      console.log("✅ Backend Response:", res.data);
      setResults(res.data);
    } catch (err) {
      console.error("❌ Error connecting to backend:", err);
      setResults({ error: "Backend connection failed" });
    } finally {
      setUploading(false);
    }
  }

  // Update field manually
  function handleUpdateField(fieldName, newValue) {
    setResults((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        fields: prev.fields.map((f) =>
          f.field === fieldName
            ? {
                ...f,
                value: newValue,
                resolvedManually: true,
                status: f.status === "error" ? "warn" : f.status,
              }
            : f
        ),
      };
    });
  }

  // Export results to JSON
  function handleExport() {
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: "application/json",
    });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "validated_output.json";
    a.click();
    URL.revokeObjectURL(href);
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* -------- When Signed Out -------- */}
      <SignedOut>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            gap: 2,
          }}
        >
          <Typography variant="h4">Welcome to Health Insurance Validator</Typography>

          <SignInButton>
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          </SignInButton>

          <SignUpButton>
            <Button variant="outlined" color="secondary">
              Sign Up
            </Button>
          </SignUpButton>
        </Box>
      </SignedOut>

      {/* -------- When Signed In -------- */}
      <SignedIn>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Health Insurance Document Validator
            </Typography>
            <IconButton color="inherit">
              <SaveIcon />
            </IconButton>
            <Button color="inherit" startIcon={<DownloadIcon />} onClick={handleExport}>
              Export
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FileUpload onUpload={handleFile} uploading={uploading} />
              <Box mt={2}>
                <PreviewPanel file={documentFile} />
              </Box>
              <Box mt={2}>
                <Typography variant="caption" color="text.secondary">
                  Included: CMS-1500 template & validation scenarios in /assets
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <ResultsPanel results={results} onUpdateField={handleUpdateField} />
            </Grid>
            <Grid item xs={12} md={3}>
              <SummaryPanel results={results} />
              <Box mt={2}>
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Apply Suggestions
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </SignedIn>
    </Box>
  );
}
