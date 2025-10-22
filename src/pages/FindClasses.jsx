import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllClasses } from "../services/classService"; // new API service
import { BookOpenIcon, CalendarIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/solid";
import backgroundImage from "../assets/images/student-bg.jpg";

export default function FindClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await getAllClasses();
      setClasses(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClass = (classId) => {
    navigate(`/book-class/${classId}`);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

      <div className="relative z-10 px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 flex justify-center items-center gap-2">
          <BookOpenIcon className="h-8 w-8 text-yellow-500" />
          Explore Tutor Classes
        </h1>

        <div className="max-w-6xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading classes...</p>
          ) : classes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {classes.map((cls) => (
                <ClassCard key={cls.id} cls={cls} onBookClass={handleBookClass} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">
              No classes available right now.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ClassCard({ cls, onBookClass }) {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <BookOpenIcon className="h-6 w-6 text-blue-600" />
            {cls.subjectName}
          </h3>
          <p className="text-sm text-gray-500">By {cls.tutorName}</p>
        </div>
        <p
          className={`px-3 py-1 text-sm rounded-full ${
            cls.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {cls.status}
        </p>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
        {cls.description}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-700">
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
          <span>{cls.maxStudents} Students</span>
        </div>
        <div className="flex items-center gap-1">
          <BookOpenIcon className="h-5 w-5 text-purple-500" />
          <span>{cls.noOfSessions} Sessions</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <a
          href={cls.courseContentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800 text-sm"
        >
          📘 View Course Content
        </a>
        <button
          onClick={() => onBookClass(cls.id)}
          className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm hover:bg-blue-200 transition"
        >
          🎯 Book Class
        </button>
      </div>
    </div>
  );
}
