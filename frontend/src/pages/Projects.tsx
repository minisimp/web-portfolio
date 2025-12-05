import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import type { Project } from "../types/project";
import { useEffect, useState } from "react";
import { fetchProjects } from "../api/projects";
import { Link as RouterLink } from "react-router-dom";

export default function Projects() {
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

  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        Projects
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", maxWidth: 720, mb: 4 }}
      >
        A growing collection of the things I&apos;ve built, experimented with,
        or shipped. Over time this page will link out to dedicated apps, tools,
        and writeups.
      </Typography>

      <Grid container spacing={3}>
        {projects.map((project) => (
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
              textDecoration: "none",
              color: "inherit",
              border: "1px solid rgba(148, 163, 184, 0.25)",
              background:
                "radial-gradient(circle at top left, rgba(148, 163, 184, 0.08), transparent 55%), #020617",
              transition: "transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 18px 45px rgba(15, 23, 42, 0.9)",
                borderColor: "rgba(148, 163, 184, 0.5)",
                cursor: "pointer",
              },
            }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {project.name}
                </Typography>
                <Chip
                  size="small"
                  label={project.status}
                  sx={{
                    fontSize: 11,
                    backgroundColor:
                      project.status === "In progress"
                        ? "primary.dark"
                        : "rgba(148, 163, 184, 0.2)",
                  }}
                />
              </Stack>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  flexGrow: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {project.summary}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                sx={{ rowGap: 1 }}
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
  );
}
