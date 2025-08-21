import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-items-center py-20">
      <div className="max-w-2xl text-center flex flex-col items-center gap-6">
        <div className="h-14 w-14 rounded-2xl bg-[var(--color-primary)] text-white grid place-items-center text-2xl">E</div>
        <h1 className="text-3xl font-semibold">Welcome to EventMaster</h1>
        <p className="text-gray-600">
          Create, manage, and participate in events. View schedules on a responsive calendar, RSVP, and see attendee lists.
        </p>
        <div className="flex gap-3">
          <Link href="/events" className="btn btn-primary">Browse Events</Link>
          <Link href="/auth/login" className="btn btn-secondary">Login</Link>
        </div>
      </div>
    </div>
  );
}
