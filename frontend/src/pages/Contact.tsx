import { Box, Typography, Stack, Link as MuiLink } from "@mui/material";

export default function Contact() {
  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        Get in touch
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
        This page will eventually include a contact form or links where people
        can reach you about work, collaborations, or questions.
      </Typography>

      <Stack spacing={1}>
        <Typography variant="body2">
          Email:{" "}
          <MuiLink href="mailto:minisimp@gmail.com" underline="hover">
            minisimp@gmail.com
          </MuiLink>
        </Typography>
        <Typography variant="body2">
          GitHub:{" "}
          <MuiLink
            href="https://github.com/minisimp"
            target="_blank"
            rel="noreferrer"
            underline="hover"
          >
            github.com/minisimp
          </MuiLink>
        </Typography>
        {/* Later: LinkedIn, Mastodon, website, etc. */}
      </Stack>
    </Box>
  );
}
