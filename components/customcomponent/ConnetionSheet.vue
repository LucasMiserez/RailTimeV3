<script setup lang="ts">
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import moment from "moment";
import type { Connection } from "~/interfaces";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
defineProps({
  connection: { type: Object as () => Connection },
});
</script>

<template>
  <div v-if="connection">
    <SheetHeader class="mb-6">
      <SheetTitle>{{
        moment.unix(parseInt(connection.departure.time)).format("DD/MM/YYYY")
      }}</SheetTitle>
    </SheetHeader>
    <div class="space-y-4">
      <div class="flex flex-col">
        <div class="flex justify-between">
          <p>{{ connection.departure.stationinfo.standardname }}</p>
          <p class="w-16 text-right">
            Track {{ connection.departure.platform }}
          </p>
        </div>
        <div class="flex justify-between">
          <div
            v-if="
              connection.arrival.canceled != '1' &&
              connection.departure.canceled != '1'
            "
            class="flex space-x-2"
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
            <p v-if="connection.departure.delay != '0'" class="text-red-600">
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
          <div>
            <a
              :href="`https://www.beluxtrains.net/indexnl.php?page=belgium-files/2023_2/2023-${connection.departure.vehicleinfo.number}`"
              target="_blank"
              class="underline"
              >{{ connection.departure.vehicleinfo.shortname }}</a
            >
          </div>
        </div>
      </div>
      <p><span>&#10072;</span></p>
      <Accordion
        v-if="
          connection.departure.stops &&
          connection.departure.stops.stop.length > 0
        "
        type="single"
        class="w-full"
        collapsible
      >
        <AccordionItem :value="connection.departure.stops.number">
          <AccordionTrigger
            >{{ connection.departure.stops.number }}
            <span v-if="parseInt(connection.departure.stops.number) > 1"
              >stops</span
            ><span v-else>stop</span></AccordionTrigger
          >
          <AccordionContent>
            <ul>
              <li
                v-for="{
                  id,
                  stationinfo,
                  scheduledArrivalTime,
                  arrivalDelay,
                  arrivalCanceled,
                } in connection.departure.stops.stop"
                :key="id"
              >
                <div v-if="arrivalCanceled != '1'" class="flex space-x-2">
                  <p>{{ stationinfo.standardname }}</p>
                  <p>
                    {{
                      moment
                        .unix(
                          parseInt(scheduledArrivalTime as string) +
                            parseInt(arrivalDelay as string),
                        )
                        .format("HH:mm A")
                    }}
                  </p>
                  <p v-if="arrivalDelay != '0'" class="text-red-600">
                    ({{
                      moment
                        .unix(parseInt(scheduledArrivalTime as string))
                        .format("HH:mm A")
                    }}
                    +
                    {{
                      moment()
                        .startOf("day")
                        .seconds(parseInt(arrivalDelay as string))
                        .format("HH:mm")
                    }})
                  </p>
                </div>
                <div v-else class="text-red-600 text-bold">CANCELED</div>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p
        v-if="
          connection.departure.stops &&
          connection.departure.stops.stop.length > 0
        "
      >
        <span>&#10072;</span>
      </p>
      <div
        v-for="{ id, stationinfo, departure, arrival } in connection.vias?.via"
        :key="id"
        class="space-y-4"
      >
        <div class="flex flex-col">
          <div class="flex justify-between">
            <p>{{ stationinfo.standardname }}</p>
            <p class="w-16 text-right">Track {{ arrival.platform }}</p>
          </div>
          <div
            v-if="arrival.canceled != '1' && departure.canceled != '1'"
            class="flex space-x-2"
          >
            <p>
              {{
                moment
                  .unix(
                    parseInt(arrival.time as string) +
                      parseInt(arrival.delay as string),
                  )
                  .format("HH:mm A")
              }}
            </p>
            <p v-if="arrival.delay != '0'" class="text-red-600">
              ({{
                moment.unix(parseInt(arrival.time as string)).format("HH:mm A")
              }}
              +
              {{
                moment()
                  .startOf("day")
                  .seconds(parseInt(arrival.delay as string))
                  .format("HH:mm")
              }})
            </p>
          </div>
          <div v-else class="text-red-600 text-bold">CANCELED</div>
        </div>
        <div>&darr;</div>
        <div class="flex flex-col">
          <div class="flex justify-between">
            <p>{{ stationinfo.standardname }}</p>
            <p class="w-16 text-right">Track {{ departure.platform }}</p>
          </div>
          <div class="flex justify-between">
            <div
              v-if="arrival.canceled != '1' && departure.canceled != '1'"
              class="flex space-x-2"
            >
              <p>
                {{
                  moment
                    .unix(
                      parseInt(departure.time as string) +
                        parseInt(departure.delay as string),
                    )
                    .format("HH:mm A")
                }}
              </p>
              <p v-if="departure.delay != '0'" class="text-red-600">
                ({{
                  moment
                    .unix(parseInt(departure.time as string))
                    .format("HH:mm A")
                }}
                +
                {{
                  moment()
                    .startOf("day")
                    .seconds(parseInt(departure.delay as string))
                    .format("HH:mm")
                }})
              </p>
            </div>
            <div v-else class="text-red-600 text-bold">CANCELED</div>
            <div>
              <a
                :href="`https://www.beluxtrains.net/indexnl.php?page=belgium-files/2023_2/2023-${departure.vehicleinfo.number}`"
                target="_blank"
                class="underline"
                >{{ departure.vehicleinfo.shortname }}</a
              >
            </div>
          </div>
        </div>
        <p><span>&#10072;</span></p>
        <Accordion
          v-if="departure.stops && departure.stops.stop.length > 0"
          type="single"
          class="w-full"
          collapsible
        >
          <AccordionItem :value="departure.stops.number">
            <AccordionTrigger
              >{{ departure.stops.number }}
              <span v-if="parseInt(departure.stops.number) > 1">stops</span
              ><span v-else>stop</span></AccordionTrigger
            >
            <AccordionContent>
              <ul>
                <li
                  v-for="{
                    id,
                    stationinfo,
                    arrivalCanceled,
                    arrivalDelay,
                    scheduledArrivalTime,
                  } in departure.stops.stop"
                  :key="id"
                >
                  <div v-if="arrivalCanceled != '1'" class="flex space-x-2">
                    <p>{{ stationinfo.standardname }}</p>
                    <p>
                      {{
                        moment
                          .unix(
                            parseInt(scheduledArrivalTime as string) +
                              parseInt(arrivalDelay as string),
                          )
                          .format("HH:mm A")
                      }}
                    </p>
                    <p v-if="arrivalDelay != '0'" class="text-red-600">
                      ({{
                        moment
                          .unix(parseInt(scheduledArrivalTime as string))
                          .format("HH:mm A")
                      }}
                      +
                      {{
                        moment()
                          .startOf("day")
                          .seconds(parseInt(arrivalDelay as string))
                          .format("HH:mm")
                      }})
                    </p>
                  </div>
                  <div v-else class="text-red-600 text-bold">CANCELED</div>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p v-if="parseInt(departure.stops.number) > 0"><span>&#10072;</span></p>
      </div>
      <div class="flex flex-col">
        <div class="flex justify-between">
          <p>{{ connection.arrival.stationinfo.standardname }}</p>
          <p class="w-16 text-right">Track {{ connection.arrival.platform }}</p>
        </div>
        <div
          v-if="
            connection.arrival.canceled != '1' &&
            connection.departure.canceled != '1'
          "
          class="flex space-x-2"
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
          <p v-if="connection.arrival.delay != '0'" class="text-red-600">
            ({{
              moment
                .unix(parseInt(connection.arrival.time as string))
                .format("HH:mm A")
            }}
            +
            {{
              moment()
                .startOf("day")
                .seconds(parseInt(connection.arrival.delay as string))
                .format("HH:mm")
            }})
          </p>
        </div>
        <div v-else class="text-red-600 text-bold">CANCELED</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
