import dotenv from "dotenv";
dotenv.config();

// Third-party imports
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// Local imports
import projectsRouter from "./routes/projects";

const app = express();

// Security middleware
app.use(helmet());

app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));

// Body parsing middleware
app.use(express.json());

// Logging middleware
app.use(morgan("dev"));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
});

app.use(limiter);

// Routes
app.use("/projects", projectsRouter);

// Centralized error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
  (
    err: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Unhandled Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
);

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
