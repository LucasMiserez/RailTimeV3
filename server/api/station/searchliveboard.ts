import moment from "moment";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  try {
    const station = query.station;
    const inputDate = moment(query.datetime as string);
    const date = inputDate.format("DDMMYY");
    const time = inputDate.format("HHmm");
    const response = await fetch(
      `https:/api.irail.be/liveboard/?station=${station}&date=${date}&time=${time}&format=json&lang=en`,
    );
    return await response.json();
  } catch (error) {
    return { data: null };
  }
});
