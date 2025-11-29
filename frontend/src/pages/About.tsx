import { Box, Typography, Stack } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ py: 6, maxWidth: 800 }}>
      <Typography variant="h3" gutterBottom>
        About
      </Typography>

      <Stack spacing={2.5} sx={{ color: "text.secondary" }}>
        <Typography variant="body1">
          I&apos;m Az, an IT consultant who&apos;s spent the last 8 years
          working in IT ranging from helpdesk and deskside support, database
          administration, Systems integration and scripting, Reporting and BI
          development, and maintaining legacy tools.
        </Typography>

        <Typography variant="body1">
          Over time that pushed me toward building things rather than just
          maintaining them. I&apos;ve been moving into web development -
          starting with projects like this portfolio, hosted solutions for
          various business applications, and various tools for automating my own
          workflows.
        </Typography>

        <Typography variant="body1">
          Outside of work I run a small homelab, experiment with Docker and
          self-hosted services, and slowly level up my skills in React,
          TypeScript, Node, and Python. I care about practical, reliable
          systems: tools that make life less chaotic, not more complicated.
        </Typography>

        <Typography variant="body1">
          This site is a place to collect that journey - the experiments,
          finished projects, and everything in between - as I shift my career
          more toward web development.
        </Typography>
      </Stack>
    </Box>
  );
}
