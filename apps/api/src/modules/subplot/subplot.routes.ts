import { Router } from "express";
import { requireAuth } from "../../middlewares/require-auth.js";
import { index, show, create } from "./subplot.controller.js";

export const subplotRoutes = Router({ mergeParams: true });

subplotRoutes.use(requireAuth);
subplotRoutes.get("/", index);
subplotRoutes.post("/", create);

export const subplotDetailRoutes = Router();
subplotDetailRoutes.use(requireAuth);
subplotDetailRoutes.get("/:id", show);