import moment from "moment/moment";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  try {
    const stationA = query.stationa;
    const stationD = query.stationd;
    const inputDate = moment(query.datetime as string);
    const type = query.type;
    const date = inputDate.format("DDMMYY");
    const time = inputDate.format("HHmm");
    const response = await fetch(
      `https:/api.irail.be/connections/?from=${stationD}&to=${stationA}&timesel=${type}&date=${date}&time=${time}&format=json&lang=en`,
    );
    return await response.json();
  } catch (error) {
    return { data: null };
  }
});
