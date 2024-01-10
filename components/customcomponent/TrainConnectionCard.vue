<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import moment from "moment";
import type { Connection } from "~/interfaces";
import ConnectionSheet from "./ConnetionSheet.vue";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
defineProps({
  connection: { type: Object as () => Connection },
});
</script>

<template>
  <Sheet v-if="connection">
    <SheetTrigger as-child>
      <Card class="bg-black text-white hover:cursor-pointer hover:bg-gray-950">
        <CardHeader>
          <CardTitle>
            <div class="flex justify-between flex-col space-y-4">
              <div class="flex flex-col">
                <div>{{ connection.departure.stationinfo.standardname }}</div>
                <div
                  v-if="
                    connection.arrival.canceled != '1' &&
                    connection.departure.canceled != '1'
                  "
                >
                  <p>
                    {{
                      moment
                        .unix(
                          parseInt(connection.departure.time as string) +
                            parseInt(connection.departure.delay as string),
                        )
                        .format("HH:mm A")
                    }}
                  </p>
                  <p
                    v-if="connection.departure.delay != '0'"
                    class="text-red-600"
                  >
                    ({{
                      moment
                        .unix(parseInt(connection.departure.time as string))
                        .format("HH:mm A")
                    }}
                    +
                    {{
                      moment()
                        .startOf("day")
                        .seconds(parseInt(connection.departure.delay as string))
                        .format("HH:mm")
                    }})
                  </p>
                </div>
                <div v-else class="text-red-600 text-bold">CANCELED</div>
              </div>
              <div>&darr;</div>
              <div class="flex flex-col">
                <div>{{ connection.arrival.stationinfo.standardname }}</div>
                <div
                  v-if="
                    connection.arrival.canceled != '1' &&
                    connection.departure.canceled != '1'
                  "
                >
                  <p>
                    {{
                      moment
                        .unix(
                          parseInt(connection.arrival.time as string) +
                            parseInt(connection.arrival.delay as string),
                        )
                        .format("HH:mm A")
                    }}
                  </p>
                  <p
                    v-if="connection.arrival.delay != '0'"
                    class="text-red-600"
                  >
                    ({{
                      moment
                        .unix(parseInt(connection.arrival.time as string))
                        .format("HH:mm A")
                    }}
                    +
                    {{
                      moment()
                        .startOf("day")
                        .seconds(parseInt(connection.departure.delay as string))
                        .format("HH:mm")
                    }})
                  </p>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            class="flex justify-between"
            v-if="
              connection.arrival.canceled != '1' &&
              connection.departure.canceled != '1'
            "
          >
            <p>Track {{ connection.departure.platform }}</p>
            <p v-if="connection.vias && connection.vias.via.length > 0">
              {{ connection.vias.number }} changes
            </p>
            <p v-if="connection.vias && connection.vias.via.length == 0">
              {{ connection.vias.number }} change
            </p>
            <p>{{ parseInt(connection.duration as string) / 60 }} minutes</p>
          </div>
        </CardContent>
      </Card>
    </SheetTrigger>
    <SheetContent>
      <ScrollArea class="h-full pr-8">
        <ConnectionSheet :connection="connection"></ConnectionSheet>
      </ScrollArea>
    </SheetContent>
  </Sheet>
</template>
