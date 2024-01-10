<script setup lang="ts">
import Container from "./components/Container.vue";
import TrainPlanner from "./components/TrainPlanner.vue";
import Planned from "./components/Planned.vue";
import ConnectionResults from "./components/ConnectionResults.vue";
import Disturbances from "./components/Disturbances.vue";
import StationResults from "./components/StationResults.vue";
import StationSearch from "./components/StationSearch.vue";
import EindLogo from "././assets/img/EindLogo.png";

import { ref } from "vue";

const searchResult = ref([]);
const connectionSearchResult = ref([]);

const handleSearchResult = (result: any) => {
  searchResult.value = result;
};
const handleConnectionSearchResult = (result: any) => {
  connectionSearchResult.value = result;
};
</script>

<template>
  <h1 class="flex w-full items-center justify-center pt-2 text-3xl">
    <span>RailTime</span> <img :src="EindLogo" alt="logo" class="w-12 ml-4" />
  </h1>
  <div
    class="items-start justify-center gap-6 rounded-lg px-8 pb-8 pt-2 grid lg:grid-cols-2 xl:grid-cols-3"
  >
    <div class="col-span-2 grid items-start gap-6 lg:col-span-1">
      <Container>
        <TrainPlanner @connectionSearchResult="handleConnectionSearchResult" />
      </Container>
      <Container class="lg:hidden block">
        <ConnectionResults :connectionSearchResult="connectionSearchResult" />
      </Container>
      <Container class="hidden lg:block">
        <StationSearch @searchResult="handleSearchResult" />
      </Container>
    </div>
    <div class="col-span-2 grid items-start gap-6 lg:col-span-1">
      <Container class="hidden lg:block">
        <ConnectionResults :connectionSearchResult="connectionSearchResult" />
      </Container>
      <Container class="lg:hidden block">
        <StationSearch @searchResult="handleSearchResult" />
      </Container>
      <Container>
        <StationResults :searchResult="searchResult" />
      </Container>
    </div>
    <div
      class="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1"
    >
      <Container>
        <Disturbances />
      </Container>
      <Container>
        <Planned />
      </Container>
    </div>
  </div>
</template>

<style>
h1 {
  font-family: "Syncopate", sans-serif;
}
</style>
