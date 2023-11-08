import axios from 'axios';
/**
 * Create axios request instance
 * @param method HTTP method
 * @param url API endpoint
 * @param payload Request payload
 */
export const generateRequest = async (method: string, url: string, payload: any = null) => {
  return axios({
    method,
    url,
    data: payload,
  });
}

/**
 * TV Maze API Endpoints
 */
const mazeApi = {
  getShows: async (page: number) => await generateRequest('get', `https://api.tvmaze.com/shows?page=${page}`),
  searchShows: async (query: string) => await generateRequest('get', `http://api.tvmaze.com/search/shows?q=${query}`),
  getShowById: async (id: number) => await generateRequest('get', `http://api.tvmaze.com/shows/${id}`),
};

export default mazeApi

