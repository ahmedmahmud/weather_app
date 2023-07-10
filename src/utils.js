const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getDayName = (date) => {
  return days[new Date(date).getDay()];
};

export const todayName = () => {
  return days[new Date().getDay()];
};

export const weatherIcon = (code) => {
  switch (code) {
    case 0:
      return require("../assets/weather_icons/sunny.png");

    case 1:
      return require("../assets/weather_icons/clear-cloudy.png");

    case 2:
      return require("../assets/weather_icons/partly-cloudy.png");

    case 3:
      return require("../assets/weather_icons/mostly-cloudy.png");

    case 45:
    case 48:
      return require("../assets/weather_icons/foggy.png");
    case 51:
    case 53:
    case 55:
      return require("../assets/weather_icons/drizzle.png");

    case 61:
    case 63:
    case 65:
      return require("../assets/weather_icons/showers.png");

    case 66:
    case 67:
      return require("../assets/weather_icons/sleet.png");

    case 71:
    case 73:
    case 75:
    case 77:
      return require("../assets/weather_icons/snow-flurries.png");

    case 80:
    case 81:

    case 82:
      return require("../assets/weather_icons/showers.png");

    case 85:
    case 86:
      return require("../assets/weather_icons/snow.png");

    case 95:
    case 96:
    case 99:
      return require("../assets/weather_icons/thunderstorms.png");
  }
};
