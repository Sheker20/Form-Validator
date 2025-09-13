import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Paper, Box, Typography, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function FileUpload({ onUpload, uploading }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) onUpload(acceptedFiles[0]);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, multiple: false, accept: { "application/pdf": [], "image/*": [] }
  });

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box {...getRootProps()} sx={{
        border: "2px dashed", borderColor: "divider", borderRadius: 2,
        p: 2, textAlign: "center", cursor: "pointer",
        bgcolor: isDragActive ? "grey.50" : "transparent"
      }}>
        <input {...getInputProps()} />
        <UploadFileIcon sx={{ fontSize: 36, color: "primary.main" }} />
        <Typography variant="h6">Drop PDF or Image</Typography>
        <Typography variant="body2" color="text.secondary">
          or click to select
        </Typography>
        <Box mt={2}>
          <Button variant="contained" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload File"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
