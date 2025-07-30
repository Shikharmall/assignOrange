import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";
import type { ArtApiResponse } from "../utils/types";

export const getDataAPI = async (page: number, limit: number): Promise<ArtApiResponse> => {
  try {
    const result = await axios.get<ArtApiResponse>(
      `${API_URL_BASE}/artworks?page=${page}&limit=${limit}`
    );
    return result.data;
  } catch (error) {
    console.error("API error:", error);
    throw new Error("Failed to fetch data");
  }
};

