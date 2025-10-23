import axios from 'axios'
import api from './api'

const API_BASE = import.meta.env.VITE_ADMIN_API_BASE_URL || ''

export const getAllClasses = () => api.get("/api/classes");
export const getClassesByTutor = (tutorId) => api.get(`/api/classes/tutor/${tutorId}`);
export const getClassById = (classId) => api.get(`/api/classes/${classId}`);
export const bookClass = (classId) => api.post(`/api/classes/${classId}/book`);
export const getMyClasses = (studentId) => api.get(`/api/classes/student/${studentId}`);
export const getMySessions = (studentId) => api.get(`/api/classes/sessions/${studentId}`)
export const getMySessionsWithDate = (studentId, eventDate) => api.get(`/api/classes/sessions/${studentId}?eventDate=${eventDate}`)