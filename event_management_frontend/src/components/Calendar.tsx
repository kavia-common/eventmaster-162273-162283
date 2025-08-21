"use client";

import React from "react";
import type { EventItem } from "@/types/api";

function getMonthMatrix(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startDay = start.getDay(); // 0-6
  const daysInMonth = end.getDate();
  const matrix: Array<Array<Date | null>> = [];
  let week: Array<Date | null> = [];
  // leading blanks
  for (let i = 0; i < startDay; i++) week.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(new Date(date.getFullYear(), date.getMonth(), d));
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }
  // trailing blanks
  if (week.length) {
    while (week.length < 7) week.push(null);
    matrix.push(week);
  }
  return matrix;
}

export default function Calendar({
  events,
  onSelectEvent,
}: {
  events: EventItem[];
  onSelectEvent: (e: EventItem) => void;
}) {
  const [refDate, setRefDate] = React.useState(new Date());
  const matrix = getMonthMatrix(refDate);

  const mapByDay = React.useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const e of events) {
      if (!e.startTime) continue;
      const key = new Date(e.startTime).toDateString();
      const arr = map.get(key) || [];
      arr.push(e);
      map.set(key, arr);
    }
    return map;
  }, [events]);

  const monthLabel = refDate.toLocaleString(undefined, { month: "long", year: "numeric" });

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <button className="btn btn-secondary" onClick={() => setRefDate(new Date(refDate.getFullYear(), refDate.getMonth() - 1, 1))}>←</button>
        <div className="font-semibold">{monthLabel}</div>
        <button className="btn btn-secondary" onClick={() => setRefDate(new Date(refDate.getFullYear(), refDate.getMonth() + 1, 1))}>→</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-sm">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="text-center text-gray-500">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {matrix.map((week, wi) => (
          <React.Fragment key={wi}>
            {week.map((day, di) => {
              const key = day ? day.toDateString() : `${wi}-${di}-empty`;
              const dayEvents = day ? mapByDay.get(key) || [] : [];
              const isToday = day ? new Date().toDateString() === day.toDateString() : false;
              return (
                <div key={key} className="min-h-28 border border-[var(--color-border)] rounded-lg p-2 bg-white">
                  <div className={`text-xs ${isToday ? "text-[var(--color-primary)] font-semibold" : "text-gray-500"}`}>{day?.getDate() ?? ""}</div>
                  <div className="flex flex-col gap-1 mt-1">
                    {dayEvents.slice(0,3).map((e) => (
                      <button
                        key={e._id}
                        className="text-xs text-left px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 truncate"
                        onClick={() => onSelectEvent(e)}
                        title={e.title}
                      >
                        {e.title}
                      </button>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-[10px] text-gray-400">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
