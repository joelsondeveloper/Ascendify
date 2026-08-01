import { Router } from "express";
import { requireAuth } from "../../middlewares/require-auth.js";
import { catalog, createReward, redeem, equip, use } from "./shop.controller.js";

export const shopRoutes = Router();
shopRoutes.use(requireAuth);

shopRoutes.get("/", catalog);
shopRoutes.post("/rewards", createReward);
shopRoutes.post("/:id/redeem", redeem);
shopRoutes.post("/:id/equip", equip);
shopRoutes.post("/:id/use", use);