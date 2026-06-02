import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.use(responseMiddleware);


router.get("/", (req, res) => {
  try {
    const fighters = fighterService.getAll();
    res.status(200).json(fighters);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error fetching fighters",
    });
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const fighter = fighterService.getOneById(id);

    if (!fighter) {
      return res.status(404).json({
        error: true,
        message: "Fighter not found",
      });
    }

    res.status(200).json(fighter);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error fetching fighter",
    });
  }
});

router.post("/", createFighterValid, (req, res) => {
  try {
    const fighterData = req.body;
    const newFighter = fighterService.create(fighterData);
    res.status(200).json(newFighter);
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Error creating fighter",
    });
  }
});

router.patch("/:id", updateFighterValid, (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const fighter = fighterService.getOneById(id);
    if (!fighter) {
      return res.status(404).json({
        error: true,
        message: "Fighter not found",
      });
    }

    const updatedFighter = fighterService.update(id, updateData);
    res.status(200).json(updatedFighter);
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Error updating fighter",
    });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const fighter = fighterService.getOneById(id);
    if (!fighter) {
      return res.status(404).json({
        error: true,
        message: "Fighter not found",
      });
    }

    fighterService.delete(id);
    res.status(200).json(fighter);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error deleting fighter",
    });
  }
});

export { router };
