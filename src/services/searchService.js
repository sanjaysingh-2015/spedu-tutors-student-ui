import axios from 'axios'
import api from './api'

const API_BASE = import.meta.env.VITE_ADMIN_API_BASE_URL || ''

export const getTutors = (keyword) => api.get(`/api/tutors?keyword=${keyword}`);
export const getSuggestedTutors = () => api.get("/api/tutors/suggested");
export const getFileResource = (tutorCode) => api.get(`/api/tutors/file/${tutorCode}`, { responseType: 'blob' })

