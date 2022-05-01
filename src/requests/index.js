import axios from "axios";
import { API_MANDU } from "config/api.config";

// DIVISIONS REQUESTS

export const getDivisions = async () => {
  const res = await axios.get(`${API_MANDU}/divisions`);
  return res.data;
};

export const postDivisions = async (data) => {
  const res = await axios.post(`${API_MANDU}/divisions`, data);
  return res.data;
};

export const putDivisions = async (data, divisionId) => {
  const res = await axios.put(`${API_MANDU}/divisions/${divisionId}`, data);
  return res.data;
};

export const deleteDivisions = async (divisionId) => {
  const res = await axios.delete(`${API_MANDU}/divisions/${divisionId}`);
  return res.data;
};

// SUBDIVISIONS REQUESTS

export const postSubDivisions = async (data) => {
  const res = await axios.post(`${API_MANDU}/subdivisions`, data);
  return res.data;
};

export const deleteSubDivisions = async (id) => {
  const res = await axios.delete(`${API_MANDU}/subdivisions/${id}`);
  return res.data;
};

// TOPDIVISIONS REQUESTS

export const postTopDivisions = async (data) => {
  const res = await axios.post(`${API_MANDU}/topdivisions`, data);
  return res.data;
};

export const putTopDivisions = async (data, divisionId) => {
  const res = await axios.put(`${API_MANDU}/topdivisions/${divisionId}`, data);
  return res.data;
};

export const deleteTopDivisions = async (divisionId) => {
  const res = await axios.delete(`${API_MANDU}/topdivisions/${divisionId}`);
  return res.data;
};
