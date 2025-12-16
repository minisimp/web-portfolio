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
            IT consultant and aspiring web dev. I like turning real-world problems into clean, reliable tools that people
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
          <Box
  sx={{
    width: "100%",
    height: "100%",
    minHeight: 320,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <Box
    component="svg"
    viewBox="0 0 600 420"
    sx={{
      width: "100%",
      height: "100%",
      opacity: 0.9,
      overflow: "visible",
    }}
  >
    <defs>
      <linearGradient id="netLine" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="rgba(72,149,239,0.55)" />
        <stop offset="1" stopColor="rgba(247,37,133,0.45)" />
      </linearGradient>

      <filter id="dotGlow">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="softGlow">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <style>
        {`
          .line { stroke: url(#netLine); stroke-width: 2; opacity: 0.25; }
          .lineStrong { stroke: url(#netLine); stroke-width: 2.5; opacity: 0.45; }
          .node { fill: rgba(226,232,240,0.85); }
          .nodeDim { fill: rgba(226,232,240,0.55); }
          .label { fill: rgba(226,232,240,0.55); font-size: 12px; letter-spacing: 0.6px; }
          .switchBody { fill: rgba(226,232,240,0.14); stroke: rgba(226,232,240,0.55); stroke-width: 1.2; }
          .switchPort { fill: rgba(226,232,240,0.55); opacity: 0.75; }
        `}
      </style>
    </defs>

    {/* Pull the whole composition LEFT and scale slightly so it fills the gap */}
    <g transform="translate(10, 34) scale(1.35)">
      {/* WAN */}
      <circle cx="90" cy="60" r="6" className="nodeDim" />
      <text x="108" y="64" className="label">
        WAN
      </text>

      {/* Router */}
      <circle cx="180" cy="110" r="7" className="node" filter="url(#dotGlow)" />
      <text x="198" y="114" className="label">
        Router
      </text>

      {/* lines */}
      <path d="M 90 60 L 180 110" className="line" />
      <path d="M 180 110 L 280 160" className="lineStrong" />

      {/* Switch icon */}
      <g transform="translate(280, 160)">
        <circle cx="0" cy="0" r="14" fill="rgba(72,149,239,0.10)" filter="url(#softGlow)" />
        <rect x="-18" y="-12" width="36" height="24" rx="6" className="switchBody" />
        <rect x="-12" y="-3" width="5" height="3" rx="1" className="switchPort" />
        <rect x="-5" y="-3" width="5" height="3" rx="1" className="switchPort" />
        <rect x="2" y="-3" width="5" height="3" rx="1" className="switchPort" />
        <rect x="9" y="-3" width="5" height="3" rx="1" className="switchPort" />
        <circle cx="14" cy="7" r="1.8" fill="rgba(247,37,133,0.55)" />
      </g>
      <text x="300" y="164" className="label">
        Switch
      </text>

      {/* downstream (pulled slightly IN so it won't clip) */}
      <circle cx="380" cy="110" r="6" className="nodeDim" />
      <text x="398" y="114" className="label">
        Prox
      </text>

      <circle cx="410" cy="190" r="6" className="nodeDim" />
      <text x="428" y="194" className="label">
        Ubuntu
      </text>

      <circle cx="355" cy="240" r="6" className="nodeDim" />
      <text x="373" y="244" className="label">
        NAS
      </text>

      <circle cx="290" cy="285" r="6" className="nodeDim" />
      <text x="308" y="289" className="label">
        Clients
      </text>

      <circle cx="225" cy="240" r="6" className="nodeDim" />
      <text x="243" y="244" className="label">
        Wi-Fi
      </text>

      {/* links */}
      <path d="M 280 160 L 380 110" className="line" />
      <path d="M 280 160 L 410 190" className="line" />
      <path d="M 280 160 L 355 240" className="line" />
      <path d="M 280 160 L 290 285" className="line" />
      <path d="M 280 160 L 225 240" className="line" />

      {/* Wi-Fi arcs */}
      <path
        d="M 225 240 m -18 0 a 18 18 0 0 1 36 0"
        fill="none"
        stroke="rgba(72,149,239,0.22)"
        strokeWidth="2"
      />
      <path
        d="M 225 240 m -28 0 a 28 28 0 0 1 56 0"
        fill="none"
        stroke="rgba(247,37,133,0.16)"
        strokeWidth="2"
      />
    </g>
  </Box>
</Box>


  
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
