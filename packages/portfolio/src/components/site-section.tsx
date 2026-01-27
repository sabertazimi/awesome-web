import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { cn } from '@/lib/utils'

interface SiteSectionProps {
  number?: string
  fileName?: string
  title?: string
  titleImage?: string
  titleImageAlt?: string
  enableThemeSwitcher?: boolean
  enableFlickeringGrid?: boolean
  reverseFlickeringGridDirection?: boolean
  className?: string
  contentClassName?: string
  children: React.ReactNode
}

export function SiteSection({
  number,
  fileName,
  title,
  titleImage,
  titleImageAlt,
  enableThemeSwitcher = false,
  enableFlickeringGrid = false,
  reverseFlickeringGridDirection = false,
  className,
  contentClassName,
  children,
}: SiteSectionProps) {
  return (
    <section className={cn('border-border relative w-full border-b last:border-b-0', className)}>
      {enableFlickeringGrid && (
        <div
          className={cn(
            'absolute top-0 left-0 z-0 size-full',
            reverseFlickeringGridDirection ? 'mask-[linear-gradient(to_bottom,transparent_25%,black_95%)]' : 'mask-[linear-gradient(to_top,transparent_25%,black_95%)]',
          )}
        >
          <FlickeringGrid
            className="absolute top-0 left-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
        </div>
      )}
      <div
        className={cn(
          'border-border relative mx-auto w-screen max-w-7xl border-0 p-8 pt-20 sm:w-[calc(100vw-6rem)] sm:border-x sm:pt-8 xl:w-5xl 2xl:w-6xl',
          contentClassName,
        )}
      >
        {number !== undefined && (
          <div className="border-border absolute top-0 left-0 flex size-[50px] items-center justify-center border-r border-b border-l sm:-translate-x-full sm:border-r-0 xl:rounded-bl-md">
            <span className="text-primary font-mono text-lg font-semibold">{number}</span>
          </div>
        )}
        {title !== undefined && (
          <div className={cn('mb-6 flex items-center gap-4', titleImage !== undefined && 'justify-center')}>
            {titleImage !== undefined && (
              <img src={titleImage} alt={titleImageAlt ?? title} className="h-16 w-16 object-contain" />
            )}
            <h2 className="text-foreground font-mono text-2xl font-bold">{title}</h2>
          </div>
        )}
        {children}
        {fileName !== undefined && (
          <code className="text-muted-foreground absolute top-4 right-4 font-mono text-xs">{fileName}</code>
        )}
        {enableThemeSwitcher && <ThemeSwitcher className="absolute top-0 right-4 sm:right-0 sm:translate-x-full" />}
      </div>
    </section>
  )
}
