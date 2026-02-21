"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { taskService } from "@/lib/task.service";
import { Task } from "@/types/task";
import { useCallback } from "react";


import { Button } from "@/components/ui/button";
import DashboardStats from "@/components/ui/dashboard-stats";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);
  const { toast } = useToast();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [newTitle, setNewTitle] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const limit = 5;

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);

      const data = await taskService.getTasks({
        page,
        limit,
        status: statusFilter,
        search,
      });

      setTasks(data.tasks);
      setTotal(data.total);
      // compute completed count by fetching a larger page to include most tasks
      try {
        const all = await taskService.getTasks({ page: 1, limit: 1000 });
        const completed = (all.tasks || []).filter(
          (t) => t.status === "COMPLETED"
        ).length;
        setCompletedCount(completed);
      } catch {
        setCompletedCount(0);
      }
    } catch {
      toast({
        title: "Failed to fetch tasks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search, toast]);

  useEffect(() => {
  if (!accessToken) {
    router.push("/login");
    return;
  }

  fetchTasks();
}, [accessToken, fetchTasks, router]);


  const totalPages = Math.ceil(total / limit);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const createTask = async () => {
    if (!newTitle.trim()) return;

    try {
      await taskService.createTask(newTitle);
      setNewTitle("");
      fetchTasks();
      toast({ title: "Task created" });
    } catch {
      toast({
        title: "Failed to create task",
        variant: "destructive",
      });
    }
  };

  const updateTask = async () => {
    if (!editingTask || !editTitle.trim()) return;

    try {
      await taskService.updateTask(editingTask.id, editTitle);

      setEditingTask(null);
      setEditTitle("");
      fetchTasks();

      toast({ title: "Task updated" });
    } catch {
      toast({
        title: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const toggleTask = async (id: string) => {
    try {
      await taskService.toggleTask(id);
      fetchTasks();
    } catch {
      toast({
        title: "Failed to toggle task",
        variant: "destructive",
      });
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks();
      toast({ title: "Task deleted" });
    } catch {
      toast({
        title: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  if (!accessToken) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Add Task
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-slate-900 text-white border border-white/20">
                <DialogHeader>
                  <DialogTitle>Create Task</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <Input
                    placeholder="Task title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="bg-white/20 border-white/30 text-white"
                  />

                  <Button
                    onClick={createTask}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    Create
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <DashboardStats
          total={total}
          completed={completedCount}
          pending={Math.max(0, total - completedCount)}
        />

        {/* Search + Filter */}
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="bg-white/20 border-white/30 text-white"
          />

          <Button
            variant={!statusFilter ? "default" : "outline"}
            onClick={() => {
              setPage(1);
              setStatusFilter(null);
            }}
          >
            All
          </Button>

          <Button
            variant={statusFilter === "PENDING" ? "default" : "outline"}
            onClick={() => {
              setPage(1);
              setStatusFilter("PENDING");
            }}
          >
            Pending
          </Button>

          <Button
            variant={statusFilter === "COMPLETED" ? "default" : "outline"}
            onClick={() => {
              setPage(1);
              setStatusFilter("COMPLETED");
            }}
          >
            Completed
          </Button>
        </div>

        {/* Task List */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 space-y-4">
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-white/20 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p
                    className={`font-medium ${
                      task.status === "COMPLETED"
                        ? "line-through text-gray-300"
                        : ""
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm">{task.status}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setEditingTask(task);
                      setEditTitle(task.title);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => toggleTask(task.id)}
                  >
                    Toggle
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </Button>

          <span className="self-center">
            Page {page} of {totalPages || 1}
          </span>

          <Button
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>

        {/* Edit Dialog */}
        <Dialog
          open={!!editingTask}
          onOpenChange={() => setEditingTask(null)}
        >
          <DialogContent className="bg-slate-900 text-white border border-white/20">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-white/20 border-white/30 text-white"
              />

              <Button
                onClick={updateTask}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                Update
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}
