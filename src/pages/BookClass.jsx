// src/pages/BookClass.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClassById, bookClass } from "../services/classService";
import {
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export default function BookClass() {
  const { classId } = useParams();
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClassDetails();
  }, [classId]);

  const fetchClassDetails = async () => {
    setLoading(true);
    try {
      const res = await getClassById(classId);
      setCls(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async () => {
    try {
      await bookClass(classId);
      setBookingSuccess(true);
      setTimeout(() => navigate("/my-classes"), 1500); // redirect after booking
    } catch (err) {
      alert("Failed to book class. Try again later.");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading class details...</p>;

  if (!cls) return <p className="text-center text-gray-500 mt-10">Class not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl mt-10 p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
        <BookOpenIcon className="h-6 w-6 text-yellow-500" />
        {cls.subjectName}
      </h1>

      <p className="text-gray-700 mb-4">{cls.description}</p>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-5 w-5 text-blue-500" />
          <span>{cls.startDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="h-5 w-5 text-yellow-500" />
          <span>
            {cls.startTime} ({cls.sessionDuration} min)
          </span>
        </div>
        <div className="flex items-center gap-1">
          <UsersIcon className="h-5 w-5 text-green-500" />
          <span>
            {cls.maxStudents} Students ({cls.enrolledCount ?? 0} Enrolled)
          </span>
        </div>
      </div>

      <a
        href={cls.courseContentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800 text-sm mb-4 inline-block"
      >
        📘 View Course Content
      </a>

      {bookingSuccess ? (
        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
          <CheckCircleIcon className="h-5 w-5" />
          <span>Successfully booked! Redirecting...</span>
        </div>
      ) : (
        <button
          onClick={handleBook}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          🎯 Confirm Booking
        </button>
      )}
    </div>
  );
}
