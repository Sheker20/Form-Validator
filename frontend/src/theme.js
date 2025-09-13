import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#0b61a4" },
    secondary: { main: "#00a99d" },
    error: { main: "#d32f2f" },
    warning: { main: "#f57c00" },
    success: { main: "#2e7d32" },
    background: { default: "#f6f8fb", paper: "#ffffff" }
  },
  shape: { borderRadius: 10 }
});

export default theme;
