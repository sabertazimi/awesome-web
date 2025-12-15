import { useEffect } from 'react'

/**
 * 全局键盘事件 hook
 * 用于处理全局快捷键，阻止浏览器默认行为
 */
export function useGlobalKeyboard() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        const target = event.target as HTMLElement
        const isEditable
          = target.isContentEditable
            || target.tagName === 'INPUT'
            || target.tagName === 'TEXTAREA'
            || target.closest('[contenteditable="true"]')

        if (!isEditable) {
          event.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [])
}
