<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  info: {
    doraMarkers: string[]
    uraMarkers: string[]
    scores: number[]
    deltasQueue: number[][]
    endOfKyoku: boolean
  }
}>()

const visible = ref(props.info.endOfKyoku)
watchEffect(() => {
  visible.value = props.info.endOfKyoku
})

const { t } = useI18n()
</script>

<template>
  <ElDialog v-model="visible" :title="t('score.title')">
    <div v-for="(score, index) in props.info.scores" :key="`score-${index}`">
      {{ score }}
    </div>
    <div v-for="(deltas, i) in props.info.deltasQueue" :key="`delta-${i}`">
      <div v-for="(delta, j) in deltas" :key="`delta-${i}-${j}`">
        {{ delta }}
      </div>
    </div>
  </ElDialog>
</template>

<style scoped></style>
