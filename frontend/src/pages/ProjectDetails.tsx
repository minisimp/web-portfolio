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
} from "@mui/material";
import type { Project } from "../types/project";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

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

  return (
    <Box sx={{ py: 6, maxWidth: 900 }}>
      {/* Back link */}
      <Button component={RouterLink} to="/projects" size="small" sx={{ mb: 2 }}>
        ← Back to projects
      </Button>

      {/* Hero */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="h3">{project.name}</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label={project.status} size="small" />
          {project.featured && <Chip label="Featured" size="small" />}
        </Stack>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {project.summary}
        </Typography>
      </Stack>

      {/* Optional hero image */}
      {project.hero_image_url && (
        <Box sx={{ mb: 4 }}>
          <Paper
            sx={{
              overflow: "hidden",
              borderRadius: 3,
              border: "1px solid rgba(148, 163, 184, 0.4)",
            }}
          >
            <img
              src={project.hero_image_url}
              alt={project.name}
              style={{ width: "100%", display: "block" }}
            />
          </Paper>
        </Box>
      )}

      {/* Links */}
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        {project.repo_url && (
          <Button
            href={project.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
          >
            View code
          </Button>
        )}
        {project.demo_url && (
          <Button
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
          >
            View live demo
          </Button>
        )}
      </Stack>

      {/* Detailed description */}
      {project.description && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Details
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", whiteSpace: "pre-line" }}
          >
            {project.description}
          </Typography>
        </Box>
      )}

      {/* Tech stack */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Tech stack
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {project.tech.map((t) => (
            <Chip key={t} label={t} size="small" />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
