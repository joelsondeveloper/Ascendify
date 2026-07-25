import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { characterRoutes } from "./modules/character/character.routes.js";
import { chapterRoutes } from "./modules/chapter/chapter.routes.js";
import { subplotRoutes, subplotDetailRoutes } from "./modules/subplot/subplot.routes.js";
import { missionRoutes, missionDetailRoutes } from "./modules/mission/mission.routes.js";
import { habitRoutes, habitDetailRoutes } from "./modules/habit/habit.routes.js";

const app = express();
const PORT = process.env.PORT ?? 3333;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Handler do Better Auth ANTES do express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api/character", characterRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/chapters/:chapterId/subplots", subplotRoutes);
app.use("/api/subplots", subplotDetailRoutes);
app.use("/api/subplots/:subplotId/missions", missionRoutes);
app.use("/api/missions", missionDetailRoutes);
app.use("/api/subplots/:subplotId/habits", habitRoutes);
app.use("/api/habits", habitDetailRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Ascendify API rodando 🚀" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
