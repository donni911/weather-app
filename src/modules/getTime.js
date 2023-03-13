export const getTime = (diff) => ({
  seconds: Math.round((diff / 1000) % 60),
  minutes: Math.round((diff / (1000 * 60)) % 60),
  hours: Math.round((diff / (1000 * 3600)) % 24),
  days: Math.round((diff / (1000 * 3600 * 24)) % 30),
});

export const computedWeatherTime = (obj) => {
  return new Date(obj.dt * 1000).toLocaleString();
};

export const formatTime = (time) => {
  let hours = new Date(time).getHours();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  let strTime = hours + " " + ampm;
  return strTime;
};
