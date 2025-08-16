<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components'
import { useMortalStore } from '@/stores'

const props = defineProps<{
  rounds: number
  turns: number[]
}>()

const { t, locale } = useI18n({ useScope: 'global' })
const optionsVisible = ref(false)
const localeOptions = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'zh-CN',
    label: '简体中文',
  },
]

function onChangeLocale(value: string) {
  localStorage.setItem('locale', value)
}

const store = useMortalStore()

function onPrevRound() {
  if (store.round === 0)
    store.round = props.rounds - 1
  else store.round -= 1

  store.turn = (props.turns[store.round] ?? 0) - 1
}

function onNextRound() {
  if (store.round === props.rounds - 1)
    store.round = 0
  else store.round += 1

  store.turn = 0
}

function onPrevMismatch() {
  // TODO
}

function onNextMismatch() {
  // TODO
}

function onPrevChoice() {
  // TODO
}

function onNextChoice() {
  // TODO
}

function onPrev() {
  if (store.turn === 0)
    onPrevRound()
  else
    store.turn -= 1
}

function onNext() {
  if (store.turn === (props.turns[store.round] ?? 0) - 1)
    onNextRound()
  else
    store.turn += 1
}
</script>

<template>
  <div class="controls">
    <Button type="left" @click="onPrevRound">
      {{ t('controls.prev-round') }}
    </Button>
    <Button type="right" @click="onNextRound">
      {{ t('controls.next-round') }}
    </Button>
    <Button type="left" @click="onPrevMismatch">
      {{ t('controls.prev-mismatch') }}
    </Button>
    <Button type="right" @click="onNextMismatch">
      {{ t('controls.next-mismatch') }}
    </Button>
    <Button type="left" @click="onPrevChoice">
      {{ t('controls.prev-choice') }}
    </Button>
    <Button type="right" @click="onNextChoice">
      {{ t('controls.next-choice') }}
    </Button>
    <Button type="left" @click="onPrev">
      {{ t('controls.prev') }}
    </Button>
    <Button type="right" @click="onNext">
      {{ t('controls.next') }}
    </Button>
    <Button @click="optionsVisible = true">
      {{ t('controls.options') }}
    </Button>
    <Button>{{ t('controls.about') }}</Button>

    <ElDialog v-model="optionsVisible" :title="t('controls.options')">
      <div class="options">
        <Button block>
          {{ t('controls.toggle-hands') }}
        </Button>
        <Button block>
          {{ t('controls.toggle-mortal-advice') }}
        </Button>
        <div>
          {{ t('controls.language') }}
          <ElSelect
            v-model="locale"
            placeholder="Select"
            size="large"
            style="width: 240px"
            @change="onChangeLocale"
          >
            <ElOption
              v-for="item in localeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>
      </div>
    </ElDialog>
  </div>
</template>

<style scoped>
.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  align-items: center;
}

.options {
  display: grid;
  gap: 1rem;
  place-items: center;
}
</style>
