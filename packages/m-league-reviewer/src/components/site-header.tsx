import { VoidSection } from '@/components/void-section'
import { cn } from '@/lib/utils'

interface SiteHeaderProps {
  title: string
  link?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function SiteHeader({ title, link, className, children }: SiteHeaderProps) {
  return (
    <VoidSection number="00" enableFlickeringGrid>
      <header className={cn('grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto_1fr]', className)}>
        <div className="justify-self-center sm:justify-self-start">{link}</div>
        <h1 className="text-foreground flex items-center gap-4 justify-self-center font-mono text-4xl font-bold">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="M.League" className="h-10 w-auto" />
          {title}
        </h1>
        {children ? (
          <div className="justify-self-center sm:justify-self-end">{children}</div>
        ) : (
          <div className="sr-only">No content</div>
        )}
      </header>
    </VoidSection>
  )
}
