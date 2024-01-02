// apiService.ts
import axios, {AxiosResponse} from 'axios';

interface Item {
  id: number;
  image_id: string;
  title: string;
  artist_display: string;
  medium_display: string;
}

interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string | null;
}

interface ApiResponse {
  pagination: Pagination;
  data: [];
  config: {};
}

interface ApiResponseDetail {
  data: Item;
  info: {};
  config: {};
}

const BASE_URL = 'https://api.artic.edu/api/v1/artworks';

const apiService = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const fetchItems = async (
  page: number = 1,
  limit: number = 20,
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await apiService.get('/', {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const fetchArtwork = async (
  artworkId: string,
): Promise<ApiResponseDetail> => {
  try {
    const response: AxiosResponse<ApiResponseDetail> = await apiService.get(
      '/' + artworkId,
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};
