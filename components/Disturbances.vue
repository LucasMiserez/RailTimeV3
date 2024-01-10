<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const { pending, data: disturbances } = useFetch(
  "/api/disturbances/disturbances",
  {
    lazy: true,
  },
);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Disturbances</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-6">
      <div v-if="pending">Loading...</div>
      <div v-else>
        <ScrollArea class="h-64">
          <div class="p-4">
            <div>
              <Accordion type="single" class="w-full" collapsible>
                <AccordionItem
                  v-for="{ id, title, description } in disturbances"
                  :key="id"
                  :value="id"
                >
                  <AccordionTrigger class="text-left">{{
                    title
                  }}</AccordionTrigger>
                  <AccordionContent>
                    {{ description }}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </ScrollArea>
      </div>
    </CardContent>
  </Card>
</template>
