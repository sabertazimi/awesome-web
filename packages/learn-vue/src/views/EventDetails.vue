<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { getEvent } from '@/services';
import type { Event } from '@/services';

const props = defineProps<{ id: string }>();
const event: Event = await getEvent(Number.parseInt(props.id));
</script>
