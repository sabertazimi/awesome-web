import { ProjectsPortfolio } from '@/components/projects-portfolio'
import { SiteHeader } from '@/components/site-header'
import { SiteLayout } from '@/components/site-layout'
import { SiteSection } from '@/components/site-section'

export function meta() {
  return [{ title: 'Lab' }, { name: 'description', content: 'Experimental prototypes' }]
}

export default function Home() {
  return (
    <SiteLayout number="02" className="flex flex-col">
      <SiteHeader title="Lab" />
      <SiteSection number="01" fileName="projects.tsx" className="flex flex-1">
        <ProjectsPortfolio />
      </SiteSection>
    </SiteLayout>
  )
}
