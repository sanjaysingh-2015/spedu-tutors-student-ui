import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTutors,
  getSuggestedTutors,
  getFileResource
} from "../services/searchService";

import { getProfile } from "../services/profileService";
import ChatBox from "../components/ChatBox";
import ChatModal from "../components/ChatModal"; // ✅ new

import backgroundImage from "../assets/images/student-bg.jpg";
import FilePreviewModal from "../components/FilePreviewModal";

export default function FindTutors() {
  const [tutors, setTutors] = useState([]);
  const [suggestedTutors, setSuggestedTutors] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [student, setStudent] = useState(null);
  const studentId = localStorage.getItem("studentId");
  const userId = localStorage.getItem("userId");
  const [studentCode, setStudentCode] = useState('');
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const navigate = useNavigate();

  // ✅ Modal state
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTutors();
    fetchSuggestedTutors();

  }, []);

  useEffect(() => {
      getProfile().then((res) => {
          setStudent(res.data);
      })
  }, []);

  const handleStartChat = (tutor) => {
    setSelectedTutor(tutor);
    setShowChatModal(true);
  };

  const fetchTutors = async () => {
    const res = await getTutors(keyword);
    setTutors(res.data);
  };

  const fetchSuggestedTutors = async () => {
    const res = await getSuggestedTutors(studentId);
    setSuggestedTutors(res.data);
  };

  const handleSearch = () => {
    fetchTutors(keyword);
  };

  const handleBookClass = (tutorCode) => {
    navigate(`/book/${tutorCode}`);
  };
  // ✅ Single handler to preview tutor’s resume
  const handleShowFile = async (tutorCode) => {
    try {
      const response = await getFileResource(tutorCode);
      const contentType = response.headers["content-type"] || "";
      const blob = new Blob([response.data], { type: contentType });
      const url = URL.createObjectURL(blob);

      setFileUrl(url);
      if (contentType.includes("image")) setFileType("image");
      else if (contentType.includes("pdf")) setFileType("pdf");
      else setFileType("unknown");

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
      <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm"></div>

      <div className="relative z-10 px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Find Your Perfect Tutor
        </h1>

        {/* Search */}
        <div className="max-w-3xl mx-auto flex mb-10">
          <input
            type="text"
            placeholder="Search tutors by skill or bio..."
            className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-6 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Suggested Tutors */}
        <div className="max-w-6xl mx-auto mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Suggested Tutors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedTutors.map((t) => (
              <TutorCard key={t.id} tutor={t} onShowFile={handleShowFile} />
            ))}
          </div>
        </div>

        {/* All Tutors */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Tutors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((t) => (
              <TutorCard
                key={t.id}
                tutor={t}
                onShowFile={handleShowFile}
                onStartChat={handleStartChat} // ✅ new prop
                onBookClass={handleBookClass}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Modal */}
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

      {/* ✅ Chat Modal */}
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

function TutorCard({ tutor, onShowFile, onStartChat, onBookClass }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-lg transition hover:-translate-y-1">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
            {tutor.name
              ?.split(" ")
              .map((w) => w[0].toUpperCase())
              .slice(0, 2)
              .join("")}
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-800">{tutor.name}</h3>
            <p className="text-sm text-gray-500">{tutor.levelName}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-gray-700">
            Fee: ₹{tutor.fee ?? "N/A"}
          </p>
          <button
            onClick={() => onShowFile(tutor.code)}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Resume
          </button>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-2">
        <strong>Skills:</strong> {tutor.skills}
      </p>
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{tutor.bio}</p>

      <div className="flex justify-between items-center">
        <button
          onClick={() => onStartChat(tutor)} // ✅ chat link
          className="text-green-600 underline hover:text-green-800 font-medium"
        >
          💬 Chat
        </button>
        <button
          onClick={() => onBookClass(tutor.code)}
          className="text-blue-600 underline hover:text-blue-800"
        >
          Book a Class
        </button>
      </div>
    </div>
  );
}

