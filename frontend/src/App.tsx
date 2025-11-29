import { Box, Button, Typography } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h3" component="h1">
        Aaron's Portfolio - WIP
      </Typography>

      <Typography variant="body1">
        React + Vite + Typescript + MUI is up and running.
      </Typography>

      <Button variant="contained">Primary Action</Button>
    </Box>
  );
}

export default App;
