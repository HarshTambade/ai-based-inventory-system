import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const fetchDemandPredictions = async () => {
  const { data } = await api.get('/predictions/demand');
  return data;
};

export const fetchInventoryAlerts = async () => {
  const { data } = await api.get('/alerts/inventory');
  return data;
};

export const fetchRecommendations = async (userId) => {
  const { data } = await api.get(`/recommendations/${userId}`);
  return data;
};
