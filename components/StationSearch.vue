<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import moment from "moment";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { RootDepartures, StationClass } from "~/interfaces";
const dateTime = ref(String(moment(Date.now()).format("YYYY-MM-DDTHH:mm")));
const station = ref("");
const stations = ref([] as StationClass[]);
const emit = defineEmits();
const submitForm = async (event: Event) => {
  event.preventDefault();
  const response = await useFetch(
    `/api/station/searchliveboard?station=${station.value}&datetime=${dateTime.value}`,
  );
  emit(
    "searchResult",
    (response.data.value as RootDepartures).departures.departure,
  );
};
const nowButtonClick = () => {
  dateTime.value = String(moment(Date.now()).format("YYYY-MM-DDTHH:mm"));
};
const stationInputChange = async (
  event: InputEvent & { target: HTMLInputElement },
) => {
  stations.value = [];
  if (event.target.value.length < 3) {
    return;
  }
  const response = await useFetch(
    `/api/station/searchstation?stationname=${event.target.value}`,
  );
  stations.value = response.data.value as StationClass[];
};
const stationClick = (event: Event) => {
  station.value = (event.target as HTMLElement).innerHTML;
  stations.value = [];
};
const testDate = (event: Event) => {
  dateTime.value = (event.target as HTMLInputElement).value;
};
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Station</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-6">
      <form @submit="submitForm" class="space-y-4">
        <div class="grid gap-2">
          <Label for="station">Station</Label>
          <div>
            <Input
              id="station"
              name="text"
              v-model="station"
              @input="stationInputChange"
            />
            <ul class="my-1">
              <li
                v-for="{ id, standardname } in stations"
                :key="id"
                class="my-1"
              >
                <Button variant="outline" class="w-full" @click="stationClick">
                  {{ standardname }}
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div class="grid gap-2">
          <Label for="datetime">Time</Label>
          <div class="flex w-full items-center gap-1.5">
            <Input
              id="datetime"
              type="datetime-local"
              name="datetime-local"
              v-model="dateTime"
              class="w-full"
            />
            <Button type="button" @click="nowButtonClick">Now</Button>
          </div>
        </div>
        <Button type="submit" class="w-full">Search Station</Button>
      </form>
    </CardContent>
  </Card>
</template>
