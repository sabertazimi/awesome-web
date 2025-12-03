import { SiteFooter } from '@/components/site-footer'
import { cn } from '@/lib/utils'

interface DefaultLayoutProps {
  number?: string
  children: React.ReactNode
  className?: string
}

export function DefaultLayout({ number, children, className }: DefaultLayoutProps) {
  return (
    <div className={cn('bg-background relative min-h-screen w-full overflow-hidden', className)}>
      {children}
      <SiteFooter number={number} />
    </div>
  )
}
