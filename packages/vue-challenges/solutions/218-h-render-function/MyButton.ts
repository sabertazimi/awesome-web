import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'MyButton',
  props: {
    disabled: Boolean,
  },
  emits: ['custom-click'],
  render() {
    return h(
      'button',
      {
        disabled: this.disabled,
        onClick: () => {
          if (!this.disabled) this.$emit('custom-click')
        },
      },
      this.$slots.default?.()
    )
  },
})
