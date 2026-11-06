
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6 border-b bg-white px-8 py-4">
      <Link href="/" className="font-medium text-slate-700 hover:text-blue-600">
        Dashboard
      </Link>

      <Link href="/tasks" className="font-medium text-slate-700 hover:text-blue-600">
        Tasks
      </Link>

      <Link href="/progress" className="font-medium text-slate-700 hover:text-blue-600">
        Learning Progress
      </Link>
    </nav>
  );
}
