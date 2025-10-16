import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8084/chat-api";

const ChatBox = ({ userId, tutorId, studentId }) => {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Connect to WebSocket
  useEffect(() => {
    const socket = new SockJS(`${API_BASE}/ws`);
    const client = Stomp.Stomp.over(socket);

    client.connect(
      {},
      () => {
        setConnected(true);
        setStompClient(client);

        // Subscribe to this chat room topic
        client.subscribe(`/topic/chat/${chatRoomId}`, (msg) => {
          if (msg.body) {
            const received = JSON.parse(msg.body);
            setMessages((prev) => [...prev, received]);
          }
        });
      },
      (error) => {
        console.error("WebSocket connection error:", error);
        setConnected(false);
      }
    );

    return () => {
      client.disconnect(() => console.log("Disconnected"));
    };
  }, [chatRoomId]);

  // Load previous messages (from REST)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // 1️⃣ Create or get existing chat room
        const res = await axios.post(`${API_BASE}/api/chat/create-room`, {
          tutorId,
          studentId
        });

        const roomCode = res.data.roomCode;
        // 3️⃣ Set chatRoomId state and open chat modal
        setChatRoomId(roomCode);

        const msgRes = await axios.get(`${API_BASE}/api/chat/${roomCode}/messages`);
        setMessages(msgRes.data);
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    };
    fetchMessages();
  }, [chatRoomId]);

  // Send message
  const sendMessage = () => {
      console.log(messageContent);
    if (stompClient && connected && messageContent.trim() !== "") {
      const chatMessage = {
        senderId: studentId,
        content: messageContent.trim(),
        roomId: chatRoomId,
        sentAt: new Date().toISOString(),
      };
      stompClient.send(`/app/chat.sendMessage/${chatRoomId}`, {}, JSON.stringify(chatMessage));
      setMessageContent("");
    }
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white rounded-t-xl flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chats</h2>
        <span className={`text-sm ${connected ? "text-green-200" : "text-red-200"}`}>
          {connected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.senderId === studentId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                msg.senderId === studentId
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{msg.content}</p>
              <span className="block text-xs opacity-60 mt-1 text-right">
                {new Date(msg.sentAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Box */}
      <div className="p-4 border-t flex items-center bg-white rounded-b-xl">
        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          disabled={!connected}
          className="ml-3 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
