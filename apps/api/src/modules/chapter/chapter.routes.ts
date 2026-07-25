import { Router } from "express";
import { requireAuth } from "../../middlewares/require-auth.js";
import { index, show, create, active } from "./chapter.controller.js";

export const chapterRoutes = Router();

chapterRoutes.use(requireAuth);
chapterRoutes.get("/", index);
chapterRoutes.get("/active", active);
chapterRoutes.get("/:id", show);
chapterRoutes.post("/", create);