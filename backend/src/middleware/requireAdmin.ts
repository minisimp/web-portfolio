import type { Request, Response, NextFunction } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.ADMIN_TOKEN;

  if (!expected) {
    console.warn("ADMIN_TOKEN is not set in environment variables.");
    return res.status(500).json({ error: "Admin configuration error" });
  }

  const provided = req.headers["x-admin-token"];

  if (!provided || provided !== expected) {
    return res.status(403).json({ error: "Forbidden: Admin access required" });
  }

  return next();
}
