
"use client";

import { useState } from "react";

export default function TaskManager({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) {
  const [taskTitle, setTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  // Add task
  async function handleSubmit(event) {
    event.preventDefault();

    if (isLoading) return;

    const trimmedTitle = taskTitle.trim();

    setError("");
    setSuccess("");

    if (!trimmedTitle) {
      setError("Task title cannot be empty.");
      return;
    }

    if (trimmedTitle.length > 100) {
      setError("Task title cannot exceed 100 characters.");
      return;
    }

    setIsLoading(true);

    try {
      await onAddTask(trimmedTitle);
      setTaskTitle("");
      setSuccess("Task added successfully!");
    } catch (error) {
      setError(error.message || "Unable to add task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Toggle task completion
  async function handleToggle(id) {
    if (processingId !== null) return;

    setError("");
    setSuccess("");
    setProcessingId(id);

    try {
      await onToggleTask(id);
      setSuccess("Task updated successfully!");
    } catch (error) {
      setError(error.message || "Unable to update task.");
    } finally {
      setProcessingId(null);
    }
  }

  // Delete task
  async function handleDelete(id) {
    if (processingId !== null) return;

    setError("");
    setSuccess("");
    setProcessingId(id);

    try {
      await onDeleteTask(id);
      setSuccess("Task deleted successfully!");
    } catch (error) {
      setError(error.message || "Unable to delete task.");
    } finally {
      setProcessingId(null);
    }
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-slate-900">
        Task Management
      </h2>

      {/* Add Task Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={taskTitle}
            onChange={(event) => {
              setTaskTitle(event.target.value);
              setError("");
              setSuccess("");
            }}
            placeholder="Enter a new task..."
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isLoading ? "Adding..." : "Add Task"}
          </button>
        </div>
      </form>

      {/* Messages */}
      {error && (
        <p className="mb-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p className="mb-4 text-sm text-green-600">
          {success}
        </p>
      )}

      {/* Task Statistics */}
      <div className="mb-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-sm text-slate-500">Total</p>
          <p className="text-2xl font-bold text-slate-900">
            {tasks.length}
          </p>
        </div>

        <div className="rounded-lg bg-green-50 p-3">
          <p className="text-sm text-green-700">Completed</p>
          <p className="text-2xl font-bold text-green-700">
            {tasks.filter((task) => task.completed).length}
          </p>
        </div>

        <div className="rounded-lg bg-orange-50 p-3">
          <p className="text-sm text-orange-700">Pending</p>
          <p className="text-2xl font-bold text-orange-700">
            {tasks.filter((task) => !task.completed).length}
          </p>
        </div>
      </div>

      {/* Task Filters */}
      <div className="mb-5 flex flex-wrap gap-3">
        {["all", "pending", "completed"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-lg px-4 py-2 text-sm capitalize ${
              filter === item
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="py-6 text-center text-slate-500">
            No tasks found.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  disabled={processingId !== null}
                  onChange={() => handleToggle(task.id)}
                  className="h-4 w-4 cursor-pointer"
                />

                <span
                  className={`break-words ${
                    task.completed
                      ? "text-slate-400 line-through"
                      : "text-slate-800"
                  }`}
                >
                  {task.title}
                </span>
              </div>

              <button
                type="button"
                disabled={processingId !== null}
                onClick={() => handleDelete(task.id)}
                className="shrink-0 text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
              >
                {processingId === task.id ? "Processing..." : "Delete"}
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
