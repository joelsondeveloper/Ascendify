import { Router } from "express";
import { requireAuth } from "../../middlewares/require-auth.js";
import { index, create, checkIn } from "./habit.controller.js";

export const habitRoutes = Router({ mergeParams: true });
habitRoutes.use(requireAuth);
habitRoutes.get("/", index);
habitRoutes.post("/", create);

export const habitDetailRoutes = Router();
habitDetailRoutes.use(requireAuth);
habitDetailRoutes.post("/:id/check-in", checkIn);