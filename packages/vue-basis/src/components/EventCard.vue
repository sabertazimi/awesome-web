<script setup lang="ts">
import type { Event } from '@/services'
import Card from './Card.vue'

defineProps<{ event: Event }>()
</script>

<template>
  <router-link
    class="event-link"
    :to="{ name: 'EventDetails', params: { id: event.id } }"
  >
    <Card :event="event" />
  </router-link>
</template>

<style scoped>
.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
