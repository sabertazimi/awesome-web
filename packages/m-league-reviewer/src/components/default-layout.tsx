import { cn } from '@/lib/utils'

interface DefaultLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DefaultLayout({ children, className }: DefaultLayoutProps) {
  return (
    <div className="bg-primary-foreground relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className={cn('container mx-auto min-h-screen p-8', className)}>{children}</div>
    </div>
  )
}
