import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        userId: req.userId!,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { page = "1", limit = "5", status, search } = req.query;

    const pageNumber = parseInt(page as string);
    const pageSize = parseInt(limit as string);

    const whereClause: any = {
      userId: req.userId,
    };

    if (typeof status === "string") {
        whereClause.status = status;
    }


    if (search) {
      whereClause.title = {
        contains: search as string,
        mode: "insensitive",
      };
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.task.count({
      where: whereClause,
    });

    res.json({
      total,
      page: pageNumber,
      limit: pageSize,
      tasks,
    });

  } catch (error) {
    console.error("GET TASKS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const { title, description, priority, status, dueDate } = req.body;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        status,
        dueDate: typeof dueDate === "string" ? new Date(dueDate) : undefined,
      },
    });

    res.json(updatedTask);

  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Task deleted successfully" });

  } catch (error) {
    console.error("DELETE TASK ERROR:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

export const toggleTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        status: task.status === "PENDING" ? "COMPLETED" : "PENDING",
      },
    });

    res.json(updatedTask);

  } catch (error) {
    console.error("TOGGLE TASK ERROR:", error);
    res.status(500).json({ message: "Failed to toggle task" });
  }
};
