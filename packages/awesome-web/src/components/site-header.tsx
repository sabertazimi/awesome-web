import { SiteSection } from '@/components/site-section'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SiteHeaderProps {
  title: string
  link?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function SiteHeader({ title, link, className, children }: SiteHeaderProps) {
  return (
    <SiteSection number="00" enableFlickeringGrid>
      <header className={cn('grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr]', className)}>
        <Button asChild variant="outline" className="justify-self-start">
          {link}
        </Button>
        <h1 className="text-foreground flex items-center gap-4 font-mono text-4xl font-bold">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="M.League" className="h-10 w-auto" />
          {title}
        </h1>
        {children ?? <div className="sr-only md:justify-self-end">No content</div>}
      </header>
    </SiteSection>
  )
}
