<template>
  <PanelCard title="虚拟实验室" action="管理">
    <div class="w-full h-full grid grid-cols-6 grid-rows-3 gap-4">
      <StatsCard class="col-span-2 row-span-2" size="small" />
      <IconCard class="col-span-1 row-span-3" label="遥感"><Icon1 /></IconCard>
      <IconCard class="col-span-1 row-span-3" label="可见光"><Icon2 /></IconCard>
      <IconCard class="col-span-1 row-span-3" label="超声波"><Icon3 class="translate-y-1"/></IconCard>
      <IconCard class="col-span-1 row-span-3" label="智能识别"><Icon4 /></IconCard>
    </div>
  </PanelCard>
</template>

<script setup lang="ts">
import Icon1 from '@/components/icons/Icon1.vue'
import Icon2 from '@/components/icons/Icon2.vue'
import Icon3 from '@/components/icons/Icon3.vue'
import Icon4 from '@/components/icons/Icon4.vue'
import IconCard from '@/components/widgets/IconCard.vue'
import PanelCard from '@/components/widgets/PanelCard.vue'
import StatsCard from '@/components/widgets/StatsCard.vue'
</script>
