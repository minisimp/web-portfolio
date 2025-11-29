import { Box, Typography, Paper, Chip, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

const MOCK_PROJECTS = [
  {
    id: 1,
    name: "Portfolio Website",
    summary: "This site - a hub for my projects and experiments.",
    tech: ["React", "TypeScript", "MUI", "Node (planned)"],
    status: "In progress",
  },
  {
    id: 2,
    name: "Mizuki Assistant",
    summary:
      "A personal AI assistant project focused on tools, memory, and homelab integration.",
    tech: ["Python", "OpenAI API", "Docker"],
    status: "Prototype",
  },
  {
    id: 3,
    name: "Homelab Automation",
    summary:
      "Scripts and services to manage my self-hosted environment and media stack.",
    tech: ["Linux", "Docker", "PowerShell"],
    status: "Ongoing",
  },
];

export default function Projects() {
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
        {MOCK_PROJECTS.map((project) => (
          <Grid size={{xs:12, md:6}} key={project.id}>
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
                <Button size="small" variant="outlined" disabled>
                  View details (coming soon)
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
