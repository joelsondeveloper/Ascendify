import { Router } from "express";
import { requireAuth } from "../../middlewares/require-auth.js";
import { getMyCharacter } from "./character.controller.js";

export const characterRoutes = Router();

characterRoutes.get("/me", requireAuth, getMyCharacter);