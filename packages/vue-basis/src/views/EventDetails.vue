<script setup lang="ts">
import type { Event } from '@/services'
import { getEvent } from '@/services'

const props = defineProps<{ id: string }>()
const event: Event = await getEvent(Number.parseInt(props.id))
</script>

<template>
  <h1>{{ event.title }}</h1>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>
