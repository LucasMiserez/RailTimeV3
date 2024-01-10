<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import moment from "moment";
defineProps({
  station: String,
  platform: String,
  canceled: String,
  delay: String,
  time: String,
  vehicleNumber: String,
  vehicleShortName: String,
});
</script>

<template>
  <Card class="bg-black text-white">
    <CardHeader>
      <CardTitle
        >{{ station }} (<a
          :href="`https://www.beluxtrains.net/indexnl.php?page=belgium-files/2023_2/2023-${vehicleNumber}`"
          target="_blank"
          class="underline"
          >{{ vehicleShortName }} </a
        >)</CardTitle
      >
    </CardHeader>
    <CardContent>
      <div class="flex justify-between" v-if="canceled != '1'">
        <p>
          {{
            moment
              .unix(parseInt(time as string) + parseInt(delay as string))
              .format("HH:mm A")
          }}
        </p>
        <p v-if="delay != '0'" class="text-red-600">
          ({{ moment.unix(parseInt(time as string)).format("HH:mm A") }} +
          {{
            moment()
              .startOf("day")
              .seconds(parseInt(delay as string))
              .format("HH:mm")
          }})
        </p>
        <p>Track {{ platform }}</p>
      </div>
      <div v-else class="text-red-600 text-bold">CANCELED</div>
    </CardContent>
  </Card>
</template>
