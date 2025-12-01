import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

//import App from "./App.tsx";
import Layout from "./components/layout.tsx";
import Home from "./pages/Home.tsx";
import Projects from "./pages/Projects.tsx";
import Contact from "./pages/Contact.tsx";
import About from "./pages/About.tsx";
import AdminProjects from "./pages/AdminProjects.tsx";

import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7209b7", // core purple
      light: "#9d4edd", // magenta highlight
      dark: "#560bad",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#4895ef", // bright blue
      light: "#4cc9f0",
      dark: "#3f37c9",
      contrastText: "#0b1020",
    },
    background: {
      default: "#050816", // deep navy-purple
      paper: "#0b1220", // slightly lighter for cards
    },
    text: {
      primary: "#f8fafc",
      secondary: "#cbd5f5",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 16,
          border: "1px solid rgba(148, 163, 184, 0.25)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
          boxShadow: "none",
          backdropFilter: "blur(12px)",
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
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      { path: "/admin", element: <AdminProjects /> },
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
