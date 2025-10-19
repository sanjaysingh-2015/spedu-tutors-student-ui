import axios from 'axios'
import api from './api'

const API_BASE = import.meta.env.VITE_ADMIN_API_BASE_URL || ''

export const getAvailableSlots = (tutorId) => api.get(`/api/slots/${tutorId}`);
export const bookSlot = (tutorId,payload) => api.post(`/api/slots/book/${tutorId}`, payload);
