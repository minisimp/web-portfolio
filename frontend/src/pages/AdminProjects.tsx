import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projects";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const EMPTY_FORM: Omit<Project, "id"> = {
  slug: "",
  name: "",
  summary: "",
  tech: [],
  status: "In progress",
  featured: false,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Project, "id">>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadProjects() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function handleChange(
    field: keyof Omit<Project, "id" | "tech">,
    value: string | boolean
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleTechChange(value: string) {
    const techArray = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setForm((prev) => ({ ...prev, tech: techArray }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingId == null) {
        const created = await createProject(form);
        setProjects((prev) => [...prev, created]);
      } else {
        const updated = await updateProject(editingId, form);
        setProjects((prev) =>
          prev.map((p) => (p.id === editingId ? updated : p))
        );
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project");
    }
  }

  function startEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      slug: project.slug,
      name: project.name,
      summary: project.summary,
      tech: project.tech,
      status: project.status,
      featured: project.featured ?? false,
    });
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
    }
  }

  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        Admin – Projects
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Form */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {editingId ? "Edit project" : "Add new project"}
        </Typography>

        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Slug"
              value={form.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              fullWidth
              required
            />
          </Stack>

          <TextField
            label="Summary"
            value={form.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            multiline
            minRows={2}
            fullWidth
            required
          />

          <TextField
            label="Tech (comma-separated)"
            value={form.tech.join(", ")}
            onChange={(e) => handleTechChange(e.target.value)}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Status"
              value={form.status}
              onChange={(e) =>
                handleChange("status", e.target.value as Project["status"])
              }
              fullWidth
            />
            <Button
              variant={form.featured ? "contained" : "outlined"}
              onClick={() => handleChange("featured", !form.featured)}
            >
              {form.featured ? "Featured ✓" : "Mark as featured"}
            </Button>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">
              {editingId ? "Save changes" : "Create project"}
            </Button>
            {editingId && (
              <Button
                variant="text"
                onClick={() => {
                  setEditingId(null);
                  setForm(EMPTY_FORM);
                }}
              >
                Cancel edit
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>

      {/* List */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Existing projects
      </Typography>

      {loading ? (
        <Typography>Loading…</Typography>
      ) : (
        <Grid container spacing={2}>
          {projects.map((p) => (
            <Grid key={p.id} size={{ xs: 12, md: 6 }}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography variant="subtitle1">{p.name}</Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {p.slug}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    {p.featured && <Chip size="small" label="Featured" />}
                    <Chip size="small" label={p.status} />
                  </Stack>
                </Stack>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {p.summary}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {p.tech.map((t) => (
                    <Chip key={t} label={t} size="small" />
                  ))}
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <IconButton size="small" onClick={() => startEdit(p)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(p.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
