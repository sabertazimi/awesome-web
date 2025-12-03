import { cn } from '@/lib/utils'

interface DefaultLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DefaultLayout({ children, className }: DefaultLayoutProps) {
  return (
    <div className={cn('bg-background relative min-h-screen w-full overflow-hidden', className)}>
      {children}
    </div>
  )
}
