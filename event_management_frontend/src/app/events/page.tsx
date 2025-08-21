"use client";

import React from "react";
import EventCard from "@/components/EventCard";
import Modal from "@/components/Modal";
import { listEvents, listAttendees, rsvpEvent } from "@/lib/api";
import type { EventItem, Attendee } from "@/types/api";

export default function EventsPage() {
  const [q, setQ] = React.useState("");
  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [selected, setSelected] = React.useState<EventItem | null>(null);
  const [attendees, setAttendees] = React.useState<Attendee[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchEvents = React.useCallback(() => {
    setLoading(true);
    listEvents({ q }).then((data) => setEvents(data || [])).finally(() => setLoading(false));
  }, [q]);

  React.useEffect(() => { fetchEvents(); }, [fetchEvents]);

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
      <div className="card p-4 flex items-center gap-2">
        <input
          className="input w-full"
          placeholder="Search events by title, location..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={fetchEvents}>Search</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {loading ? (
          <div className="text-gray-500">Loading…</div>
        ) : events.length > 0 ? (
          events.map((e) => <EventCard key={e._id} event={e} onOpen={openEvent} />)
        ) : (
          <div className="text-gray-500">No events found.</div>
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
