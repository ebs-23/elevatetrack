
"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import TaskManager from "@/components/TaskManager";
import { getTasks, createTask, updateTask, deleteTask } from "@/lib/api";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Load tasks from PostgreSQL through FastAPI
  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error loading tasks:", error);
        setError("Unable to load tasks. Please check the backend.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []);

  // Add a new task
  async function addTask(title) {
    try {
      setError("");
      const newTask = await createTask(title);
      setTasks((previousTasks) => [...previousTasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Unable to add task. Please try again.");
    }
  }

  // Toggle task completion
  async function toggleTask(id) {
    const task = tasks.find((item) => item.id === id);

    if (!task) return;

    try {
      setError("");

      const updatedTask = await updateTask(id, {
        completed: !task.completed,
      });

      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item.id === id ? updatedTask : item
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Unable to update task. Please try again.");
    }
  }

  // Delete a task
  async function removeTask(id) {
    try {
      setError("");
      await deleteTask(id);

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Unable to delete task. Please try again.");
    }
  }

  // Calculate dashboard statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">
          ElevateTrack
        </h1>
        <p className="mt-2 text-slate-500">
          Manage your tasks and track your learning progress.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-800">
          Welcome back!
        </h2>
        <p className="mt-1 text-slate-500">
          Here is an overview of your progress.
        </p>
      </section>

      {error && (
        <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </p>
      )}

      {isLoading ? (
        <p className="text-slate-500">Loading tasks...</p>
      ) : (
        <>
          {/* Dashboard statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <StatCard
              title="Total Tasks"
              value={totalTasks}
              color="text-slate-900"
            />

            <StatCard
              title="Completed"
              value={completedTasks}
              color="text-green-600"
            />

            <StatCard
              title="Pending"
              value={pendingTasks}
              color="text-orange-500"
            />
          </section>

          {/* Task management */}
          <section className="mt-10">
            <TaskManager
              tasks={tasks}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={removeTask}
            />
          </section>
        </>
      )}

    </main>
  );
}
