// src/pages/BookSlotCalendar.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getAvailableSlots, bookSlot } from "../services/slotService";
import { useMessages } from "../context/MessageContext";

export default function BookSlotCalendar() {
  const { tutorId } = useParams();
  const { addMessage } = useMessages();
  const [events, setEvents] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]); // Flat array of selected slots

const fetchSlots = async () => {
    try {
      const res = await getAvailableSlots(tutorId);
      console.log("✅ Available Slots:", res.data);

      if (Array.isArray(res.data.bookings)) {
        const formatted = res.data.bookings.map((day) => ({
          id: `${day.eventId}-${day.startTime}-${day.endTime}`,
          title: `${day.eventName || "Session"}`,
          start: `${day.eventDate}T00:00:00`,
          backgroundColor: "#22c55e", // bright green
          borderColor: "#15803d", // darker green
          textColor: "white",
          extendedProps: {
            eventId: day.eventId,
            startTime: day.startTime,
            endTime: day.endTime,
            availableCount: day.availableCount,
          },
        }));
        setEvents(formatted);
      }
    } catch (err) {
      addMessage("❌ Failed to fetch available slots:", "error");
    }
  };

  // Fetch available slots
  useEffect(() => {
    fetchSlots();
  }, [tutorId]);

  // Handle slot click
  const handleEventClick = (clickInfo) => {
    const slot = clickInfo.event.extendedProps;
    const slotKey = `${slot.eventId}-${slot.startTime}-${slot.endTime}`;

    setSelectedSlots((prev) => {
      const exists = prev.some(
        (s) =>
          s.eventId === slot.eventId &&
          s.startTime === slot.startTime &&
          s.endTime === slot.endTime
      );

      if (exists) {
        // Deselect slot
        clickInfo.event.setProp("backgroundColor", "#22c55e");
        clickInfo.event.setProp("borderColor", "#15803d");
        clickInfo.event.setProp("textColor", "white");
        return prev.filter(
          (s) =>
            !(
              s.eventId === slot.eventId &&
              s.startTime === slot.startTime &&
              s.endTime === slot.endTime
            )
        );
      } else {
        // Select slot
        clickInfo.event.setProp("backgroundColor", "#3b82f6");
        clickInfo.event.setProp("borderColor", "#1d4ed8");
        clickInfo.event.setProp("textColor", "white");
        return [
          ...prev,
          {
            eventId: slot.eventId,
            startTime: slot.startTime,
            endTime: slot.endTime,
          },
        ];
      }
    });
  };

  // Handle booking
  const handleBooking = async () => {
    if (selectedSlots.length === 0) {
      addMessage("Please select at least one slot to book.", "success");
      return;
    }

    try {
      console.log("📤 Booking payload:", selectedSlots);
      await bookSlot(tutorId, selectedSlots);
      addMessage("🎉 Booking successful!", "success");
      setSelectedSlots([]);
      await fetchSlots();
    } catch (err) {
      addMessage("❌ Booking failed:", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        📅 Book Available Classes
      </h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        height="auto"
        eventDisplay="block"
        eventContent={(arg) => {
            const { availableCount } = arg.event.extendedProps;
            return {
              html: `
                <div style="font-weight: 600;">${arg.event.title}</div>
                <div style="font-size: 12px; line-height: 1.2;">
                  Available(${availableCount})
                </div>
              `,
            };
          }}
      />

      <button
        onClick={handleBooking}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition"
      >
        Book Selected Slots ({selectedSlots.length})
      </button>
    </div>
  );
}
