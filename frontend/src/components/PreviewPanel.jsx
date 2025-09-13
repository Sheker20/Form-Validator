import React from "react";
import { Paper, Typography, Box, Link } from "@mui/material";

export default function PreviewPanel({ file }) {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="subtitle1">Document Preview</Typography>
      {!file ? (
        <Box sx={{ pt: 2, color: "text.secondary" }}>No file uploaded.</Box>
      ) : (
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2"><strong>Name:</strong> {file.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(file.size / 1024)} KB • {file.type}
          </Typography>
        </Box>
      )}
      <Box mt={2}>
        <Typography variant="caption">Reference assets:</Typography><br/>

      </Box>
    </Paper>
  );
}
