import { SiGithub } from '@icons-pack/react-simple-icons'
import { SiteSection } from '@/components/site-section'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { cn } from '@/lib/utils'

interface SiteFooterProps {
  number?: string
  fileName?: string
  className?: string
}

export function SiteFooter({ number, fileName, className }: SiteFooterProps) {
  return (
    <SiteSection number={number} fileName={fileName} enableFlickeringGrid reverseFlickeringGridDirection>
      <footer className={cn('flex items-center justify-between', className)}>
        <div>
          <span className="text-muted-foreground text-sm">Copyright © </span>
          <a
            href="https://github.com/sabertazimi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary text-sm font-medium underline underline-offset-4 transition-colors"
            aria-label="View author on GitHub"
          >
            Sabertaz
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/sabertazimi/lab/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="View source on GitHub"
          >
            <SiGithub className="size-5" />
          </a>
          <ThemeSwitcher />
        </div>
      </footer>
    </SiteSection>
  )
}
