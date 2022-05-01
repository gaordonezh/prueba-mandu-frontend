import axios from "axios";
import { API_MANDU } from "config/api.config";

export const getDivisions = async () => {
  const res = await axios.get(`${API_MANDU}/divisions`);
  return res.data;
};
