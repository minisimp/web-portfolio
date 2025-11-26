import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "600",
              color: "primary.light",
              letterSpacing: 0.5,
            }}
          >
            Aaron's Portfolio
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}
