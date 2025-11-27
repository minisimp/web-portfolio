import { Box, Button, Stack, Typography, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  return (
    <Box
      sx={{
        py: 8,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={6}
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        {/* Left side – text */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="overline"
            sx={{ color: "secondary.light", letterSpacing: 2 }}
          >
            FULL-STACK / AI / AUTOMATION
          </Typography>

          <Typography
            variant="h3"
            component="h1"
            sx={{ mt: 2, mb: 2, fontWeight: 700 }}
          >
            Hi, I&apos;m{" "}
            <Box component="span" sx={{ color: "primary.light" }}>
              Az
            </Box>
            . I build practical systems, not just demos.
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            IT contractor turned web dev & AI tinkerer. I like turning messy,
            real-world problems into clean, reliable tools that people actually
            use.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              component={RouterLink}
              to="/projects"
              variant="contained"
              size="large"
              onClick={() => {}}
            >
              View Projects
            </Button>
            <Button
              component={RouterLink}
              to="/about"
              variant="outlined"
              size="large"
            >
              About Me
            </Button>
          </Stack>
        </Box>

        {/* Right side – visual */}
        <Box sx={{ flex: 1, width: "100%" }}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              background:
                "radial-gradient(circle at top left, rgba(247,37,133,0.22), transparent 55%), radial-gradient(circle at bottom right, rgba(72,149,239,0.3), transparent 55%)",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ mb: 2, color: "text.secondary" }}
            >
              Coming soon
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Portfolio Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              This area will eventually preview your featured projects, recent
              work, or even a small stat card about your stack & tools.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}
