import { Router } from "express";
import {
  createTask,
  deleteTask,
  updateTask,
  getTasks,
  toggleTask
} from "../controllers/task.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createTask);
router.get("/", authenticate, getTasks);

// IMPORTANT: toggle must come before generic :id route
router.patch("/:id/toggle", authenticate, toggleTask);
router.patch("/:id", authenticate, updateTask);

router.delete("/:id", authenticate, deleteTask);

export default router;
