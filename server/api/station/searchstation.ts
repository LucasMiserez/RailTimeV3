import { StationClass } from "~/interfaces";

export default defineEventHandler(async (event) => {
  const stationname = getQuery(event).stationname as string;
  try {
    const response = await fetch(
      "https:/api.irail.be/stations/?format=json&lang=en",
    );
    const data = await response.json();
    return data.station.filter((station: StationClass) =>
      station.standardname.toLowerCase().includes(stationname.toLowerCase()),
    );
  } catch (error) {
    return { data: null };
  }
});
