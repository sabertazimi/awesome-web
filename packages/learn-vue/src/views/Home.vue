<template>
  <div class="events">
    <h1>Events List</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script setup lang="ts">
import EventCard, { Event } from '@/components/EventCard.vue'; // @ is an alias to /src

const events: Event[] = [
  {
    id: 5928101,
    title: 'Cat Adoption Day',
    date: 'January 28, 2022',
    time: '12:00',
    location: 'Meow Town',
    category: 'animal welfare',
    description: 'Find your new feline friend at this event.',
    organizer: 'Kat Laydee',
    petsAllowed: true,
  },
  {
    id: 4582797,
    title: 'Community Gardening',
    date: 'March 14, 2022',
    time: '10:00',
    location: 'Flora City',
    category: 'food',
    description: 'Join us as we tend to the community edible plants.',
    organizer: 'Fern Pollin',
    petsAllowed: true,
  },
  {
    id: 8419988,
    title: 'Beach Cleanup',
    date: 'July 22, 2022',
    time: '11:00',
    location: 'Playa Del Carmen',
    category: 'sustainability',
    description: 'Help pick up trash along the shore.',
    organizer: 'Carey Wales',
    petsAllowed: false,
  },
];
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
