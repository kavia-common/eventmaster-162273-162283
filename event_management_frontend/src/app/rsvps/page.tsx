"use client";

import React from "react";
import Modal from "@/components/Modal";
import { apiFetch, listAttendees } from "@/lib/api";
import type { RsvpItem, Attendee } from "@/types/api";

export default function MyRsvpsPage() {
  const [items, setItems] = React.useState<RsvpItem[]>([]);
  const [selected, setSelected] = React.useState<RsvpItem | null>(null);
  const [attendees, setAttendees] = React.useState<Attendee[]>([]);

  React.useEffect(() => {
    apiFetch<RsvpItem[]>("/rsvps/me").then((data) => setItems(data || []));
  }, []);

  const open = async (r: RsvpItem) => {
    setSelected(r);
    try {
      const a = await listAttendees(r.event._id);
      setAttendees(a);
    } catch { setAttendees([]); }
  };

  return (
    <div className="card p-4">
      <h1 className="text-lg font-semibold mb-3">My RSVPs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((r, i) => (
          <div key={i} className="card p-4 bg-white">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{r.event.title}</h4>
              <span className="badge">RSVP: {r.status}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {r.event.startTime && <>🕒 {new Date(r.event.startTime).toLocaleString()}</>}
            </div>
            <div className="text-sm text-gray-600">
              {r.event.location && <>📍 {r.event.location}</>}
            </div>
            <div className="mt-2">
              <button className="btn btn-secondary" onClick={() => open(r)}>View</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="text-gray-500">No RSVPs found.</div>}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.event.title}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            {selected?.event.location && <span className="badge">📍 {selected.event.location}</span>}
            {selected?.event.startTime && <span className="badge">🕒 {new Date(selected.event.startTime).toLocaleString()}</span>}
            <span className="badge">Status: {selected?.status}</span>
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
