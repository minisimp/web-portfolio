import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Button,
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
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">{project.name}</Typography>
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
                sx={{ color: "text.secondary", flexGrow: 1 }}
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

              <Box sx={{ mt: 2 }}>
                <Button
                  component={RouterLink}
                  to={`/projects/${project.slug}`}
                  size="small"
                  variant="outlined"
                >
                  View details
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
