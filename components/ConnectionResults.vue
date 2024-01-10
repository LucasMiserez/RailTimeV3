<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TrainConnectionCard from "~/components/customcomponent/TrainConnectionCard.vue";

const props = defineProps(["connectionSearchResult"]);
</script>
<template>
  <Card class="pb-1">
    <CardHeader>
      <CardTitle>Connection Results</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea class="h-96">
        <div
          v-if="
            props.connectionSearchResult &&
            props.connectionSearchResult.length > 0
          "
        >
          <TrainConnectionCard
            v-for="(connection, index) in props.connectionSearchResult"
            :key="index"
            :connection="connection"
          />
        </div>
        <p v-else>No Results</p>
      </ScrollArea>
    </CardContent>
  </Card>
</template>
