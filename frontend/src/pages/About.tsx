import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        About
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 700 }}>
        This page will introduce who you are, your background in IT, and the shift
        you&apos;re making toward web development and AI-focused work. Later we can
        expand this into a proper story and timeline.
      </Typography>
    </Box>
  );
}
