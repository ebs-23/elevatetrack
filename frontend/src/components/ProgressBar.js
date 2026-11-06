
export default function ProgressBar({ label, progress }) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      <div className="mb-2">
        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
}

