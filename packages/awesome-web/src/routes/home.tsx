import { SiteHeader } from '@/components/site-header'
import { SiteLayout } from '@/components/site-layout'
import { SiteSection } from '@/components/site-section'

export function meta() {
  return [{ title: 'Awesome Web' }, { name: 'description', content: 'Awesome Web' }]
}

export default function Home() {
  return (
    <SiteLayout number="02" className="flex flex-col">
      <SiteHeader title="Awesome Web" />
      <SiteSection number="01" fileName="projects.tsx" className="flex flex-1">
        <div className="grid h-full grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2"></div>
      </SiteSection>
    </SiteLayout>
  )
}
