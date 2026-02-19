export interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: string;
  status: "PENDING" | "COMPLETED";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
