import {
  Box,
  Button,
  Stack,
  Typography,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
import type { Project } from "../types/project";
import { useEffect, useState } from "react";
import { fetchProjects } from "../api/projects";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchProjects();
        if (!cancelled) {
          setProjects(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 6, display: "Flex", JustifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 6 }}>
        <Typography variant="h3" gutterBottom>
          Projects
        </Typography>
        <Typography sx={{ mb: 2 }} color="error">
          Failed to load projects: {error}
        </Typography>
      </Box>
    );
  }

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
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
            IT consultant and aspiring web dev & AI tinkerer. I like turning
            messy, real-world problems into clean, reliable tools that people
            actually use.
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

      {/* Featured Projects Section */}
      <Box sx={{ mt: 10 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography variant="h5" fontWeight={600}>
            Featured Projects
          </Typography>
          <Button
            component={RouterLink}
            to="/projects"
            variant="text"
            size="small"
          >
            View all
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {featuredProjects.map((project, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={project.id}>
              <Paper
                component={RouterLink}
                to={`/projects/${project.slug}`}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  borderRadius: 3,
                  border: "1px solid rgba(148, 163, 184, 0.3)",
                  textDecoration: "none",
                  background:
                    index === 0
                      ? "radial-gradient(circle at top left, rgba(157, 78, 221, 0.16), transparent 55%), #0b1220"
                      : "radial-gradient(circle at top right, rgba(72,149,239,0.16), transparent 55%), #0b1220",
                  transition: "transform 150ms ease, box-shadow 150ms ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.9)",
                  },
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Featured
                </Typography>
                <Typography variant="h6">{project.name}</Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", flexGrow: 1 }}
                >
                  {project.summary}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  sx={{ rowGap: 1, mt: 1 }}
                >
                  {project.tech.map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      size="small"
                      sx={{
                        fontSize: 11,
                        bgcolor: "rgba(148, 163, 184, 0.15)",
                      }}
                    />
                  ))}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tech Stack Section */}
      <Box sx={{ mt: 8 }}>
        <Typography
          variant="overline"
          sx={{ letterSpacing: 2, color: "text.secondary" }}
        >
          TECH & TOOLS
        </Typography>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" sx={{ mt: 2 }}>
          {[
            "React",
            "TypeScript",
            "Node.js",
            "MUI",
            "Supabase",
            "PostgreSQL",
            "Docker",
            "PowerShell",
          ].map((t) => (
            <Chip
              key={t}
              label={t}
              size="small"
              sx={{
                fontSize: 11,
                bgcolor: "rgba(15, 23, 42, 0.9)",
                borderRadius: 999,
                border: "1px solid rgba(148, 163, 184, 0.4)",
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
