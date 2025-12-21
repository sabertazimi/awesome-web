import type { Route } from './+types/root'
import { ArrowLeftIcon } from 'lucide-react'
import { MotionConfig } from 'motion/react'
import { isRouteErrorResponse, Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { DefaultLayout } from '@/components/default-layout'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { VoidSection } from '@/components/void-section'
import { useGlobalKeyboard } from '@/hooks/use-global-keyboard'
import '@/assets/base.css'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href={`${import.meta.env.BASE_URL}logo.svg`} />
        <Meta />
        <Links />
      </head>
      <body>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  useGlobalKeyboard()

  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <DefaultLayout number="02" className="flex flex-col">
      <SiteHeader
        title={message}
        link={(
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeftIcon className="text-primary size-4" />
              返回日历
            </Link>
          </Button>
        )}
      />
      <VoidSection number="01" fileName="error.tsx" className="flex flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col gap-4">
            <p>{details}</p>
            {stack && (
              <pre className="w-full overflow-x-auto p-4">
                <code>{stack}</code>
              </pre>
            )}
          </div>
        </div>
      </VoidSection>
    </DefaultLayout>
  )
}
