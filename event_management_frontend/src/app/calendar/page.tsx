"use client";

import React from "react";
import Calendar from "@/components/Calendar";
import Modal from "@/components/Modal";
import { listEvents, listAttendees, rsvpEvent } from "@/lib/api";
import type { EventItem, Attendee } from "@/types/api";

export default function CalendarPage() {
  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [selected, setSelected] = React.useState<EventItem | null>(null);
  const [attendees, setAttendees] = React.useState<Attendee[]>([]);

  React.useEffect(() => {
    listEvents().then((data) => setEvents(data || []));
  }, []);

  const onSelect = async (e: EventItem) => {
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
      <Calendar events={events} onSelectEvent={onSelect} />
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        <div className="flex flex-col gap-3">
          <div className="text-gray-700">{selected?.description || "No description."}</div>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            {selected?.location && <span className="badge">📍 {selected.location}</span>}
            {selected?.startTime && <span className="badge">🕒 {new Date(selected.startTime).toLocaleString()}</span>}
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
