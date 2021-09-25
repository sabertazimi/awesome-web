<template>
  <div class="event-card">
    <span>@ {{ event.time }} on {{ event.date }}</span>
    <h4>{{ event.title }}</h4>
  </div>
</template>

<script setup lang="ts">
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location?: string;
  category?: string;
  description?: string;
  organizer?: string;
  petsAllowed?: boolean;
}

defineProps<{ event: Event }>();

export type { Event };
</script>

<style scoped>
.event-card {
  width: 250px;
  padding: 20px;
  margin-bottom: 18px;
  cursor: pointer;
  border: 1px solid #39495c;
}

.event-card:focus,
.event-card:hover {
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  transform: scale(1.01);
}
</style>
