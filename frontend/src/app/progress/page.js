
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";

const learningActivities = [
  {
    id: 1,
    title: "Next.js Fundamentals",
    category: "Frontend Development",
    progress: 80,
  },
  {
    id: 2,
    title: "FastAPI Backend",
    category: "Backend Development",
    progress: 45,
  },
  {
    id: 3,
    title: "Redis and Celery",
    category: "Backend Technologies",
    progress: 25,
  },
];

export default function ProgressPage() {
  const totalCourses = learningActivities.length;

  const completedCourses = learningActivities.filter(
    (activity) => activity.progress === 100
  ).length;

  const inProgressCourses = totalCourses - completedCourses;

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">
          Learning Progress
        </h1>
        <p className="mt-2 text-slate-500">
          Track your learning activities and development progress.
        </p>
      </header>

      <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <StatCard title="Total Courses" value={totalCourses} color="text-slate-900" />
        <StatCard title="Completed" value={completedCourses} color="text-green-600" />
        <StatCard title="In Progress" value={inProgressCourses} color="text-blue-600" />
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-8 text-xl font-bold text-slate-900">
          My Learning Activities
        </h2>

        <div className="space-y-8">
          {learningActivities.map((activity) => (
            <div key={activity.id}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">
                  {activity.title}
                </h3>

                <span className="font-semibold text-blue-600">
                  {activity.progress}%
                </span>
              </div>

              <ProgressBar
                label={activity.category}
                progress={activity.progress}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
