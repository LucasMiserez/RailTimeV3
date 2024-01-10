<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const { pending, data: planned } = useFetch("/api/disturbances/planned", {
  lazy: true,
});
</script>

<template>
  <Card class="pb-3">
    <CardHeader>
      <CardTitle>Planned</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-6">
      <div v-if="pending">Loading ...</div>
      <div v-else>
        <ScrollArea class="h-80">
          <div class="p-4">
            <div>
              <Accordion type="single" class="w-full" collapsible>
                <AccordionItem
                  v-for="{ id, title, description } in planned"
                  :key="id"
                  :value="id"
                >
                  <AccordionTrigger class="text-left">{{
                    title
                  }}</AccordionTrigger>
                  <AccordionContent>
                    {{ (description as string).replace(/'+$/, "") }}
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
