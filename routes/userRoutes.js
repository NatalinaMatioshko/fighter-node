import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.use(responseMiddleware);

router.get("/", (req, res) => {
  try {
    const users = userService.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error fetching users",
    });
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const user = userService.getOneById(id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error fetching user",
    });
  }
});

router.post("/", createUserValid, (req, res) => {
  try {
    const userData = req.body;
    const newUser = userService.create(userData);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Error creating user",
    });
  }
});

router.patch("/:id", updateUserValid, (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const user = userService.getOneById(id);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    const updatedUser = userService.update(id, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message || "Error updating user",
    });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const user = userService.getOneById(id);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    userService.delete(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error deleting user",
    });
  }
});

export { router };
