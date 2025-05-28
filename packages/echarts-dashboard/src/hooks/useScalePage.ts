import { useThrottleFn } from '@vueuse/core';
import { onMounted, onUnmounted } from 'vue';
 
/**
 * 大屏适配
 * @param option 大屏适配的配置
 * @param option.targetX 设计稿的宽度
 * @param option.targetY 设计稿的高度
 * @param option.targetRatio 设计稿的宽高比
 */
export default function useScalePage(option: {
  targetX?: number;
  targetY?: number;
  targetRatio?: number;
}) {
  const resizeFunc = useThrottleFn(function () {
    triggerScale();
  }, 100);
 
  onMounted(() => {
    triggerScale();
    window.addEventListener('resize', resizeFunc);
  });
 
  onUnmounted(() => {
    window.removeEventListener('resize', resizeFunc);
  });
 
  // 大屏适配
  function triggerScale() {
    const targetX = option.targetX || 1920;
    const targetY = option.targetY || 1080;
    const targetRatio = option.targetRatio || 16 / 9;
 
    const currentX = document.documentElement.clientWidth || document.body.clientWidth;
    const currentY = document.documentElement.clientHeight || document.body.clientHeight;

    const currentRatio = currentX / currentY;
    const scaleRatio = currentRatio < targetRatio ? currentX / targetX : currentY / targetY;
    const dashboard: HTMLElement | null = document.querySelector('#dashboard');

    if (dashboard) {
      dashboard.style.transform = `scale(${scaleRatio}) translate(-50%, -50%)`;
    }
  }
}
