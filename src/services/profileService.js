import axios from 'axios'
import api from './api'

const API_BASE = import.meta.env.VITE_ADMIN_API_BASE_URL || ''

export const getCountries = () => api.get("/api/master/countries");

export const getSteps = () => api.get("/api/students/me/steps");
export const getProfile = () => api.get("/api/students/me");
export const getProfileCountry = () => api.get("/api/students/me/country");
export const getProfileAddress = () => api.get("/api/students/me/address");

export const createProfile = (payload) => api.post("/api/students/me", payload);
export const createProfileAddress = (payload) => api.post("/api/students/me/address", payload);
export const createProfileCountry = (payload) => api.post("/api/students/me/country", payload);


