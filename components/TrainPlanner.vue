<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment/moment";
import { ref } from "vue";
import type { RootConnections, StationClass } from "~/interfaces";
const dateTime = ref(String(moment(Date.now()).format("YYYY-MM-DDTHH:mm")));
const stationA = ref("");
const stationD = ref("");
const stationsA = ref([] as StationClass[]);
const stationsD = ref([] as StationClass[]);
const type = ref("departure");
const emit = defineEmits();

const nowButtonClick = () => {
  dateTime.value = String(moment(Date.now()).format("YYYY-MM-DDTHH:mm"));
};
const stationInputChange = async (type: number, station: String) => {
  type == 0 ? (stationsA.value = []) : (stationsD.value = []);
  if (station.length < 3) {
    return;
  }
  const response = await useFetch(
    `/api/station/searchstation?stationname=${station}`,
  );
  type === 0
    ? (stationsA.value = response.data.value as StationClass[])
    : (stationsD.value = response.data.value as StationClass[]);
};
const stationClick = (type: number, station: string) => {
  type === 0 ? (stationA.value = station) : (stationD.value = station);
  type === 0 ? (stationsA.value = []) : (stationsD.value = []);
};
const formSubmit = async (event: Event) => {
  event.preventDefault();
  const response = await useFetch(
    `/api/connection/getconnection?stationa=${stationA.value}&stationd=${stationD.value}&datetime=${dateTime.value}&type=${type.value}`,
  );
  console.log(response.data.value);
  emit(
    "connectionSearchResult",
    (response.data.value as RootConnections).connection,
  );
};
</script>

<template>
  <Card>
    <CardHeader class="space-y-1">
      <CardTitle> Find your connection </CardTitle>
    </CardHeader>
    <CardContent>
      <form class="grid gap-4" @submit="formSubmit">
        <div class="grid gap-2">
          <Label for="station">Departure Station</Label>
          <Input
            id="stationD"
            name="text"
            v-model="stationD"
            @input="stationInputChange(1, stationD)"
          />
          <ul class="my-1">
            <li
              v-for="{ id, standardname } in stationsD"
              :key="id"
              class="my-1"
            >
              <Button
                variant="outline"
                class="w-full"
                @click="stationClick(1, standardname)"
              >
                {{ standardname }}
              </Button>
            </li>
          </ul>
        </div>
        <div class="grid gap-2">
          <Label for="station">Arrival Station</Label>
          <Input
            id="stationA"
            name="text"
            v-model="stationA"
            @input="stationInputChange(0, stationA)"
          />
          <ul class="my-1">
            <li
              v-for="{ id, standardname } in stationsA"
              :key="id"
              class="my-1"
            >
              <Button
                variant="outline"
                class="w-full"
                @click="stationClick(0, standardname)"
              >
                {{ standardname }}
              </Button>
            </li>
          </ul>
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
        <div class="grid gap-2">
          <Label for="type">Departure/Arrival</Label>
          <Select v-model="type" id="type">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="departure"> Departure </SelectItem>
                <SelectItem value="arrival"> Arrival </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" class="w-full"> Let's go </Button>
      </form>
    </CardContent>
  </Card>
</template>
