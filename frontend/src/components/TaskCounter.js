
"use client";

import { useState } from "react";

export default function TaskCounter() {

  const [count, setCount] = useState(0);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm text-slate-900">

      <h2 className="text-xl font-semibold text-slate-900">
        Task Counter
      </h2>

      <p className="my-4 text-3xl font-bold text-slate-900">
        {count}
      </p>

      <button
        onClick={() => setCount(count + 1)}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Add Task
      </button>

    </div>
  );
}