import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";

// API for getting datas

export const getDataAPI = async (page: number, limit: number) => {

  console.log(API_URL_BASE);

  try {
    let result = await axios(
      `${API_URL_BASE}/artworks?page=${page}&limit=${limit}`,
      {
        method: "GET",
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};
