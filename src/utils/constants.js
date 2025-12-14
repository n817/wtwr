const weatherConditions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../images/weather/day/clear.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../images/weather/day/clouds.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../images/weather/day/rain.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../images/weather/night/clear.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../images/weather/night/clouds.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../images/weather/night/rain.svg", import.meta.url).href,
  },
];

const coordinates = {
  // MTA
  // latitude: 41.69367863206989,
  // longitude: 44.77992010551903,
  // ROU
  latitude: 43.79337808157784,
  longitude: -79.11844794648728,
};

const APIkey = "b7f9235a9ee3dec6b31e68a3d076cc5b";

export { weatherConditions, coordinates, APIkey };