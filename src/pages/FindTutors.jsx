import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTutors,
  getSuggestedTutors,
  getFileResource,
} from "../services/searchService";
import { getProfile } from "../services/profileService";
import ChatModal from "../components/ChatModal";
import FilePreviewModal from "../components/FilePreviewModal";
import { SparklesIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import backgroundImage from "../assets/images/student-bg.jpg";

export default function FindTutors() {
  const [tutors, setTutors] = useState([]);
  const [suggestedTutors, setSuggestedTutors] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const studentId = localStorage.getItem("studentId");
  const userId = localStorage.getItem("userId");
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuggestedTutors();
    fetchTutors();
    getProfile().then((res) => setStudent(res.data));
  }, []);

  const handleStartChat = (tutor) => {
    setSelectedTutor(tutor);
    setShowChatModal(true);
  };

  const fetchTutors = async (kw = "") => {
    setLoading(true);
    try {
      const res = await getTutors(kw);
      setTutors(res.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestedTutors = async () => {
    const res = await getSuggestedTutors(studentId);
    setSuggestedTutors(res.data);
  };

  const handleSearch = () => fetchTutors(keyword);

  const handleBookSession = (tutorCode) => {
    navigate(`/book/${tutorCode}`);
  };

  const handleBookClass = (tutorCode) => {
    navigate(`/classes/${tutorCode}`);
  };

  const handleShowFile = async (tutorCode) => {
    try {
      const response = await getFileResource(tutorCode);
      const contentType = response.headers["content-type"] || "";
      const blob = new Blob([response.data], { type: contentType });
      const url = URL.createObjectURL(blob);
      setFileUrl(url);
      setFileType(contentType.includes("pdf") ? "pdf" : "image");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

      <div className="relative z-10 px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 flex justify-center items-center gap-2">
          <SparklesIcon className="h-7 w-7 text-yellow-500" />
          Find Your Perfect Tutor
        </h1>

        {/* Search */}
        <div className="max-w-3xl mx-auto flex mb-10 shadow-md rounded-lg overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Search by skill, subject, or name..."
            className="flex-1 p-3 text-gray-700 focus:outline-none"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              fetchTutors(e.target.value);
            }}
          />
          <button
            onClick={handleSearch}
            className="px-6 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-1"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            Search
          </button>
        </div>

        {/* Suggested Tutors */}
        {suggestedTutors.length > 0 && (
          <div className="max-w-6xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              🌟 Suggested Tutors
            </h2>
            <TutorGrid
              tutors={suggestedTutors}
              onShowFile={handleShowFile}
              onStartChat={handleStartChat}
              onBookSession={handleBookSession}
              onBookClass={handleBookClass}
            />
          </div>
        )}

        {/* All Tutors */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            👩‍🏫 All Tutors
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading tutors...</p>
          ) : tutors.length > 0 ? (
            <TutorGrid
              tutors={tutors}
              onShowFile={handleShowFile}
              onStartChat={handleStartChat}
              onBookSession={handleBookSession}
              onBookClass={handleBookClass}
            />
          ) : (
            <p className="text-center text-gray-500 italic">
              No tutors found. Try different keywords.
            </p>
          )}
        </div>
      </div>

      {/* Resume Modal */}
      <FilePreviewModal
        show={showModal}
        fileUrl={fileUrl}
        fileType={fileType}
        onClose={() => {
          setShowModal(false);
          setFileUrl(null);
          setFileType(null);
        }}
      />

      {/* Chat Modal */}
      {showChatModal && selectedTutor && (
        <ChatModal
          tutor={selectedTutor}
          studentId={studentId}
          userId={userId}
          apiBase="http://localhost:8084/chat-api"
          onClose={() => setShowChatModal(false)}
        />
      )}
    </div>
  );
}

function TutorGrid({ tutors, onShowFile, onStartChat, onBookClass, onBookSession }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {tutors.map((tutor) => (
        <TutorCard
          key={tutor.id}
          tutor={tutor}
          onShowFile={onShowFile}
          onStartChat={onStartChat}
          onBookSession={onBookSession}
          onBookClass={onBookClass}
        />
      ))}
    </div>
  );
}

function TutorCard({ tutor, onShowFile, onStartChat, onBookClass, onBookSession }) {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-lg">
            {tutor.name
              ?.split(" ")
              .map((w) => w[0].toUpperCase())
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{tutor.name}</h3>
            <p className="text-sm text-gray-500">{tutor.levelName}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-700">
            ₹{tutor.fee ?? "N/A"}/hr
          </p>
          <button
            onClick={() => onShowFile(tutor.code)}
            className="text-blue-600 underline hover:text-blue-800 text-sm"
          >
            View Resume
          </button>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-2 line-clamp-1">
        <strong>Skills:</strong> {tutor.skills || "N/A"}
      </p>

      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{tutor.bio}</p>

      <div className="flex justify-between items-center">
        <button
          onClick={() => onStartChat(tutor)}
          className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-medium text-sm hover:bg-green-200 transition"
        >
          💬 Chat
        </button>
        <button
          onClick={() => onBookSession(tutor.code)}
          className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm hover:bg-blue-200 transition"
        >
          🕒 Book Session
        </button>
        <button
          onClick={() => onBookClass(tutor.code)}
          className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm hover:bg-blue-200 transition"
        >
          🎯 Book Class
        </button>
      </div>
    </div>
  );
}
