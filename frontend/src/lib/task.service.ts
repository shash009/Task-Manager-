import api from "./axios";
import { Task } from "@/types/task";

interface GetTasksParams {
  page: number;
  limit: number;
  status?: string | null;
  search?: string;
}

export const taskService = {
  async getTasks(params: GetTasksParams) {
    const res = await api.get("/tasks", { params });
    return res.data;
  },

  async createTask(title: string) {
    const res = await api.post("/tasks", { title });
    return res.data as Task;
  },

  async updateTask(id: string, title: string) {
    const res = await api.patch(`/tasks/${id}`, { title });
    return res.data as Task;
  },

  async toggleTask(id: string) {
    const res = await api.patch(`/tasks/${id}/toggle`);
    return res.data as Task;
  },

  async deleteTask(id: string) {
    await api.delete(`/tasks/${id}`);
  },
};
