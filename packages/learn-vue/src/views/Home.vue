<template>
  <div class="events">
    <h1>Events List</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'; // @ is an alias to /src
import { getEvents } from '@/services';
import type { Event } from '@/services';

const events: Event[] = await getEvents();
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
