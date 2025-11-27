import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Container,
  Box,
} from "@mui/material";
import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Layout() {
  const location = useLocation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <AppBar position="sticky" color="transparent">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontWeight: 600,
                letterSpacing: 0.5,
                color: "primary.light",
              }}
            >
              Az Portfolio
            </Typography>

            <Stack direction="row" spacing={1}>
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Button
                    key={link.to}
                    component={RouterLink}
                    to={link.to}
                    color="inherit"
                    sx={{
                      textTransform: "none",
                      fontWeight: isActive ? 600 : 400,
                      fontSize: 14,
                      px: 1.5,
                      ...(isActive && {
                        color: "primary.light",
                      }),
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ flex: 1 }}>
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{
          borderTop: "1px solid rgba(148, 163, 184, 0.2)",
          mt: 4,
          py: 2,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            © {new Date().getFullYear()} Az — Portfolio in progress.
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Built with React, TypeScript, MUI.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
