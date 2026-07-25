import { Router } from "express";
import { requireAuth } from "../../middlewares/require-auth.js";
import { index, create, complete } from "./mission.controller.js";

export const missionRoutes = Router({ mergeParams: true });
missionRoutes.use(requireAuth);
missionRoutes.get("/", index);
missionRoutes.post("/", create);

export const missionDetailRoutes = Router();
missionDetailRoutes.use(requireAuth);
missionDetailRoutes.post("/:id/complete", complete);