
export default function StatCard({ title, value, color, description }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h3 className={`mt-3 text-3xl font-bold ${color}`}>
        {value}
      </h3>

      {description && (
        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

