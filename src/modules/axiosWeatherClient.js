import axios from "axios";

const axiosWeatherClient = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_BASE_URL,
});

export default axiosWeatherClient;
