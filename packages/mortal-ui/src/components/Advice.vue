<script setup lang="ts">
import type { MortalReview } from '@/mortal'
import { TileUtils } from '@/mortal'
import { useI18n } from 'vue-i18n'
import TileGroup from './TileGroup.vue'

const props = defineProps<{
  review: MortalReview
}>()

const { t } = useI18n()
</script>

<template>
  <div class="advice">
    <template v-if="props.review.show">
      <ElAlert
        v-if="props.review.isEqual"
        :title="t('mortal.match')"
        type="success"
        effect="dark"
        :closable="false"
      />
      <ElAlert
        v-else
        :title="t('mortal.error')"
        type="error"
        effect="dark"
        :closable="false"
      />
      <div class="claim-advice-container">
        <template
          v-for="(claim, i) in props.review.claimAdvice"
          :key="`claim-advice-${i}`"
        >
          <TileGroup v-if="claim.action.type === 'none'" class="claim-advice">
            <span class="claim-advice-text">{{ t('mortal.pass') }}</span>
            <Tile
              :prob="claim.prob"
              class="claim-advice-none"
              transparent
              :actual="i === props.review.claimActual"
              :expected="i === props.review.claimExpected"
            />
          </TileGroup>
          <TileGroup
            v-else-if="
              claim.action.type === 'chi'
                || claim.action.type === 'pon'
                || claim.action.type === 'daiminkan'
                || claim.action.type === 'kakan'
                || claim.action.type === 'ankan'
            "
            class="claim-advice"
          >
            <span class="claim-advice-text">{{
              t(`mortal.${claim.action.type}`)
            }}</span>
            <Tile
              v-for="(tile, j) in claim.action.consumed"
              :key="`claim-advice-i-${j}`"
              :tile="TileUtils.get(tile)"
              :prob="claim.prob"
              :actual="i === props.review.claimActual"
              :expected="i === props.review.claimExpected"
            />
          </TileGroup>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped>
.advice {
  width: 80%;
  height: 50%;
  margin-top: 2rem;
}

.claim-advice-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-top: 5rem;
}

.claim-advice + .claim-advice {
  margin-left: 1rem;
}

.claim-advice-none {
  transform: translateX(-2.4rem);
}

.claim-advice-text {
  margin-right: 0.5rem;
}
</style>
