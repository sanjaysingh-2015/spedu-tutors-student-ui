import axios from 'axios'
import api from './api'

const API_BASE = import.meta.env.VITE_ADMIN_API_BASE_URL || ''

export const getWallet = () => api.get(`/api/payments/wallet`);
export const getWalletTrans = () => api.get(`/api/payments/wallet/trans`);
export const getPayments = () => api.get(`/api/payments/list`);
export const getInitiatePayment = (payload) => api.post(`/api/payments/initiate`, payload)

