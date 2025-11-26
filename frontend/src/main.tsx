import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

//import App from "./App.tsx";
import Layout from "./components/layout.tsx";
import Home from "./pages/Home.tsx";
import Projects from "./pages/Projects.tsx";

import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7209b7", // core purple
      light: "#b5179e", // lighter purple/magenta
      dark: "#560bad", // deeper purple
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#4895ef", // bright blue
      light: "#4cc9f0", // cyan highlight
      dark: "#3f37c9", // deeper blue
      contrastText: "#0b1020",
    },
    background: {
      default: "#050816", // custom deep background (very dark navy/purple)
      paper: "#0b1020", // cards/panels slightly lighter
    },
    text: {
      primary: "#f8fafc", // soft white
      secondary: "#cbd5f5", // desaturated light
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderBottom: "1px solid rgba(148, 163, 184, 0.25)",
          boxShadow: "none",
          backdropFilter: "blur(12px)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/projects", element: <Projects /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
