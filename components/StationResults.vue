<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TrainCard from "~/components/customcomponent/TrainCard.vue";

const props = defineProps(["searchResult"]);
</script>

<template>
  <Card class="pb-2">
    <CardHeader>
      <CardTitle>Station Results</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea class="h-48">
        <div v-if="props.searchResult.length > 0">
          <TrainCard
            v-for="{
              id,
              station,
              platform,
              canceled,
              delay,
              time,
              vehicleinfo,
            } in props.searchResult"
            :key="id"
            :station="station"
            :platform="platform"
            :canceled="canceled"
            :delay="delay"
            :time="time"
            :vehicleNumber="vehicleinfo.number"
            :vehicleShortName="vehicleinfo.shortname"
          />
        </div>
        <p v-else>No Results</p>
      </ScrollArea>
    </CardContent>
  </Card>
</template>
