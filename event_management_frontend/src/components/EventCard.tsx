"use client";

import React from "react";
import type { EventItem } from "@/types/api";

export default function EventCard({ event, onOpen }: { event: EventItem; onOpen: (e: EventItem) => void }) {
  return (
    <div className="card p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">{event.title}</h4>
        <button className="btn btn-secondary" onClick={() => onOpen(event)}>Details</button>
      </div>
      {event.description ? <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p> : null}
      <div className="flex flex-wrap gap-2 text-sm text-gray-500">
        {event.location && <span className="badge">📍 {event.location}</span>}
        {event.startTime && <span className="badge">🕒 {new Date(event.startTime).toLocaleString()}</span>}
        {event.organizer?.name && <span className="badge">👤 {event.organizer.name}</span>}
      </div>
    </div>
  );
}
