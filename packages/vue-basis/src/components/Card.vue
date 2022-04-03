<script setup lang="ts">
import type { Event } from '@/services';
defineProps<{ event: Event }>();
</script>

<template>
  <div class="event-card">
    <span>@ {{ event.time }} on {{ event.date }}</span>
    <h4>{{ event.title }}</h4>
  </div>
</template>

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
