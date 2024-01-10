import type { disturbanceplanned } from "~/interfaces";

export default defineEventHandler(async (event) => {
  try {
    const response = await fetch(
      "https://api.irail.be/disturbances/?format=json&lineBreakCharacter=%27%27&lang=en",
    );
    const data = await response.json();
    return data.disturbance.filter(
      (disturbance: disturbanceplanned) => disturbance.type === "disturbance",
    );
  } catch (error) {
    return { data: null };
  }
});
