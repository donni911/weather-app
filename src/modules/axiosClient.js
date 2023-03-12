import axios from "axios";

const axiosWeatherClient = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_BASE_URL,
});

const axiosCitiesClient = axios.create({
  baseURL: import.meta.env.VITE_CITIES_BASE_URL,
});

export { axiosWeatherClient, axiosCitiesClient };
