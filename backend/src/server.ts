import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projectsRouter from "./routes/projects";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/projects", projectsRouter);

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
