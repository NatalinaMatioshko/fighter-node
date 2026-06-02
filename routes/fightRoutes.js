import { Router } from "express";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.use(responseMiddleware);

// OPTIONAL TODO: Implement route controller for fights

export { router };
