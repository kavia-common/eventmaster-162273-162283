"use client";

import React from "react";
import EventCard from "@/components/EventCard";
import Modal from "@/components/Modal";
import { listEvents, rsvpEvent, listAttendees } from "@/lib/api";
import type { EventItem, Attendee } from "@/types/api";

export default function DashboardPage() {
  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [selected, setSelected] = React.useState<EventItem | null>(null);
  const [attendees, setAttendees] = React.useState<Attendee[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    listEvents({ my: true })
      .then((data) => setEvents(data || []))
      .finally(() => setLoading(false));
  }, []);

  const openEvent = async (e: EventItem) => {
    setSelected(e);
    try {
      const a = await listAttendees(e._id);
      setAttendees(a);
    } catch { setAttendees([]); }
  };

  const onRsvp = async (status: "yes" | "no" | "maybe") => {
    if (!selected) return;
    await rsvpEvent(selected._id, status);
    alert("RSVP submitted");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-sm text-gray-500">My upcoming</div>
          <div className="text-2xl font-semibold">{events.length}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">This week</div>
          <div className="text-2xl font-semibold">
            {events.filter(e => e.startTime && (new Date(e.startTime).getTime() - Date.now()) < 7 * 86400000).length}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">RSVPs pending</div>
          <div className="text-2xl font-semibold">
            {events.length > 0 ? "—" : 0}
          </div>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Recent events</h2>
        </div>
        {loading ? (
          <div className="text-gray-500">Loading…</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {events.map((e) => (
              <EventCard key={e._id} event={e} onOpen={openEvent} />
            ))}
            {events.length === 0 && (
              <div className="text-gray-500">No events found.</div>
            )}
          </div>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        <div className="flex flex-col gap-3">
          <div className="text-gray-700">{selected?.description || "No description."}</div>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            {selected?.location && <span className="badge">📍 {selected.location}</span>}
            {selected?.startTime && <span className="badge">🕒 {new Date(selected.startTime).toLocaleString()}</span>}
            {selected?.endTime && <span className="badge">🕒 {new Date(selected.endTime).toLocaleString()}</span>}
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={() => onRsvp("yes")}>RSVP Yes</button>
            <button className="btn btn-secondary" onClick={() => onRsvp("maybe")}>Maybe</button>
            <button className="btn btn-secondary" onClick={() => onRsvp("no")}>No</button>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Attendees</h4>
            <ul className="space-y-1">
              {attendees.map((a, i) => (
                <li key={i} className="text-sm text-gray-700">• {a?.name || a?.email || "User"}</li>
              ))}
              {attendees.length === 0 && <li className="text-sm text-gray-500">No attendees yet.</li>}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
}
