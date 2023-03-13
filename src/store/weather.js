import { defineStore } from "pinia";
import axios from "axios";

import {
  axiosWeatherClient,
  axiosCitiesClient,
} from "@/modules/axiosClient.js";

export const weatherStore = defineStore("weatherStore", {
  state: () => ({
    cities: [],
    searchCitiesWeather: [],

    errorMessage: null,

    loadingStatus: false,

    currentLocation: null,

    menuItems: [
      {
        linkName: "main",
        name: "Main",
        icon: "fa-solid fa-table-list",
      },
      { linkName: "starred", name: "Starred", icon: "fa-solid fa-star" },
    ],
  }),

  getters: {
    starWeather(state) {
      return state.searchCitiesWeather.filter((city) => city.starred);
    },

    loading(state) {
      return state.loadingStatus;
    },

    citiesWeatherCount(state) {
      return state.searchCitiesWeather.length;
    },

    citiesStarWeatherCount(state) {
      return state.searchCitiesWeather.filter((city) => city.starred).length;
    },
  },

  actions: {
    updateErrorMessage(message) {
      this.errorMessage = message;
    },

    async getWeatherAction(location) {
      let locationName;
      let weatherInfo;

      if (typeof location == "object") {
        locationName = location.temperatureToday.name;
        weatherInfo = location;
      } else {
        locationName = location;
        weatherInfo = {};
      }

      try {
        this.loadingStatus = true;

        await axiosWeatherClient
          .get(
            `weather?q=${locationName}` +
              `&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
          )
          .then((response) => {
            weatherInfo.temperatureToday = response.data;
          });

        await axiosWeatherClient
          .get(
            `forecast?q=${locationName}&units=metric&appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`
          )
          .then((response) => {
            weatherInfo.temperatureByHours = response.data;

            weatherInfo.temperatureByWeek = this.computedWeatherWeek(
              response.data
            );
          });

        this.searchCitiesWeather.unshift(weatherInfo);
        this.updateLocalStorage();
      } catch (error) {
        this.updateErrorMessage(error.response.data.message);
        this.loadingStatus = false;
      } finally {
        this.loadingStatus = false;
      }
    },

    computedWeatherWeek(data) {
      const dailyData = data.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000);
        const day = date.toDateString();

        if (!acc[day]) {
          acc[day] = [];
        }

        acc[day].push(item);
        return acc;
      }, {});

      const avgTemps = Object.values(dailyData).map((items) => {
        const totalTemp = items.reduce((acc, item) => acc + item.main.temp, 0);

        const averageTemp = totalTemp / items.length;
        const date = items[0].dt_txt;

        return {
          dt_txt: date,
          main: {
            temp: Math.round(averageTemp),
          },
        };
      });
      return avgTemps;
    },

    async getCitiesAction(input) {
      await axiosCitiesClient
        .get(
          `direct?q=${input}&limit=5&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
        )
        .then((response) => {
          this.cities = response.data;
        });
    },

    async getCurrentLocationAction() {
      await axios.get("https://ipapi.co/json/").then((response) => {
        this.currentLocation = response.data;
      });
    },

    deleteWeatherAction(value) {
      const valueToDelete = this.searchCitiesWeather
        .map((el) => el)
        .indexOf(value);
      this.searchCitiesWeather.splice(valueToDelete, 1);
      this.updateLocalStorage();
    },

    updateLocalStorage() {
      localStorage.weatherInCities = JSON.stringify(this.searchCitiesWeather);
      if (JSON.parse(localStorage.weatherInCities).length === 0) {
        localStorage.removeItem("weatherInCities");
      }
    },
  },
});
