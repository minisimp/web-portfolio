import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Button,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import type { Project } from "../types/project"; // wherever your Project type lives

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

function statusColor(status: Project["status"]) {
  switch (status) {
    case "Completed":
      return "success";
    case "In progress":
      return "warning";
    case "Prototype":
      return "info";
    case "Ongoing":
    default:
      return "default";
  }
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/projects/${slug}`);
        if (!res.ok) {
          throw new Error(`Failed to load project: ${res.status}`);
        }
        const data = (await res.json()) as Project;
        if (!cancelled) {
          setProject(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
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
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Project not found
        </Typography>
        <Typography sx={{ mb: 2, color: "text.secondary" }}>
          {error ?? "This project doesn&apos;t exist or could not be loaded."}
        </Typography>
        <Button component={RouterLink} to="/projects" variant="outlined">
          Back to projects
        </Button>
      </Box>
    );
  }

  const hasRepo = !!project.repo_url;
  const hasDemo = !!project.demo_url;
  const hasHero = !!project.hero_image_url;
  const hasDescription = !!project.description;

  return (
    <Box sx={{ py: 6 }}>
      {/* Back link */}
      <Button
        component={RouterLink}
        to="/projects"
        size="small"
        sx={{ mb: 2 }}
      >
        ← Back to projects
      </Button>

      <Stack spacing={3}>
        {/* Hero block */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" sx={{ mb: 1 }}>
              {project.name}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 1 }} flexWrap="wrap">
              <Chip
                label={project.status}
                color={statusColor(project.status)}
                size="small"
              />
              {project.featured && (
                <Chip label="Featured" size="small" variant="outlined" />
              )}
            </Stack>

            <Typography
              variant="body1"
              sx={{ color: "text.secondary", maxWidth: 720 }}
            >
              {project.summary}
            </Typography>
          </Box>

          {/* Optional hero image on the right */}
          {hasHero && (
            <Paper
              sx={{
                flexShrink: 0,
                width: { xs: "100%", md: 260 },
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid rgba(148, 163, 184, 0.4)",
              }}
            >
              <img
                src={project.hero_image_url!}
                alt={project.name}
                style={{ width: "100%", display: "block" }}
              />
            </Paper>
          )}
        </Stack>

        {/* Links */}
        {(hasRepo || hasDemo) && (
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {hasRepo && (
              <Button
                href={project.repo_url!}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
              >
                View code
              </Button>
            )}
            {hasDemo && (
              <Button
                href={project.demo_url!}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
              >
                View live site
              </Button>
            )}
          </Stack>
        )}

        <Divider sx={{ my: 1 }} />

        {/* Main content section */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="flex-start"
        >
          {/* Left: description / story */}
          <Box sx={{ flex: 2 }}>
            <Typography variant="h5" gutterBottom>
              About this project
            </Typography>
            {hasDescription ? (
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  whiteSpace: "pre-line",
                }}
              >
                {project.description}
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                I haven&apos;t written a full description for this project yet.
                For now, the summary above gives the high-level overview.
              </Typography>
            )}
          </Box>

          {/* Right: tech stack */}
          <Box
            sx={{
              flex: 1,
              minWidth: { xs: "100%", md: 260 },
            }}
          >
            <Paper
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid rgba(148, 163, 184, 0.4)",
                background:
                  "radial-gradient(circle at top left, rgba(148, 163, 184, 0.18), transparent 60%), #020617",
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
                Tech stack
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {project.tech.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    sx={{
                      fontSize: 11,
                      bgcolor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(148, 163, 184, 0.5)",
                    }}
                  />
                ))}
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
