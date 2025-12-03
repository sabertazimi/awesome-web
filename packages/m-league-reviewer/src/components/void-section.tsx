import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { cn } from '@/lib/utils'

interface VoidSectionProps {
  number?: string
  fileName?: string
  title?: string
  showThemeSwitcher?: boolean
  className?: string
  contentClassName?: string
  children: React.ReactNode
}

/**
 * VoidSection 组件
 * 模仿 voidzero.dev 的设计风格
 * 布局结构：左侧区域（编号） | 中间区域（内容 container） | 右侧区域（文件名）
 */
export function VoidSection({
  number,
  fileName,
  title,
  showThemeSwitcher = false,
  className,
  contentClassName,
  children,
}: VoidSectionProps) {
  return (
    <section className={cn('border-border relative w-full border-b last:border-b-0', className)}>
      <div
        className={cn(
          'border-border relative mx-auto w-screen max-w-7xl border-0 p-8 pt-20 sm:w-[calc(100vw-6rem)] sm:border-x sm:pt-8 xl:w-5xl 2xl:w-6xl',
          contentClassName,
        )}
      >
        {number && (
          <div className="border-border absolute top-0 left-0 flex size-[50px] items-center justify-center border-r border-b border-l sm:-translate-x-full sm:border-r-0">
            <span className="text-primary font-mono text-lg font-semibold">{number}</span>
          </div>
        )}
        {title && <h2 className="text-foreground mb-6 font-mono text-2xl font-bold">{title}</h2>}
        {children}
        {fileName && <code className="text-muted-foreground absolute top-4 right-4 font-mono text-xs">{fileName}</code>}
        {showThemeSwitcher && (
          <ThemeSwitcher className="absolute top-0 right-4 sm:top-1/2 sm:right-0 sm:translate-x-full sm:-translate-y-1/2" />
        )}
      </div>
    </section>
  )
}
