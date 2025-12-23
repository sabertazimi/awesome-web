import { SiApacheecharts, SiReact, SiTrello, SiVuedotjs } from '@icons-pack/react-simple-icons'
import { BrainCircuitIcon, CalendarClockIcon } from 'lucide-react'
import EchartsDashboardBackground from '@/assets/projects/echarts-dashboard.png'
import MLeagueReviewerBackground from '@/assets/projects/m-league-reviewer.png'
import MortalUIBackground from '@/assets/projects/mortal-ui.png'
import ReactRendererBackground from '@/assets/projects/react-renderer.png'
import VueDesignBackground from '@/assets/projects/vue-design.png'
import VueTrelloBackground from '@/assets/projects/vue-trello.png'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { cn } from '@/lib/utils'

interface Project {
  name: string
  description: string
  icon: React.ElementType
  background: React.ReactNode
  href: string
  cta?: string
  className?: string
}

function getProjectGridSpan(index: number) {
  const row = Math.floor(index / 2)
  const isOddRow = row % 2 === 0
  const isFirstInRow = index % 2 === 0

  if (isOddRow) {
    return isFirstInRow ? 'lg:col-span-2' : 'lg:col-span-1'
  } else {
    return isFirstInRow ? 'lg:col-span-1' : 'lg:col-span-2'
  }
}

const projectBackgroundClassName
  = 'h-48 w-full mask-[linear-gradient(to_top,transparent_10%,#000_100%)] object-cover transition-all duration-300 group-hover:scale-105'

export function ProjectsPortfolio() {
  const projects: Project[] = [
    {
      name: 'M.League Reviewer',
      description: 'Reviewer for M.League daily games.',
      icon: CalendarClockIcon,
      background: (
        <img
          src={MLeagueReviewerBackground}
          alt="M.League Reviewer"
          className={cn(projectBackgroundClassName, 'object-top')}
        />
      ),
      href: `${import.meta.env.BASE_URL}m-league-reviewer`,
    },
    {
      name: 'React Renderer',
      description: 'Custom renderer for React components.',
      icon: SiReact,
      background: (
        <img
          src={ReactRendererBackground}
          alt="React Renderer"
          className={cn(projectBackgroundClassName, 'object-center')}
        />
      ),
      href: `${import.meta.env.BASE_URL}react-renderer`,
    },
    {
      name: 'Mortal UI',
      description: 'GUI for Mortal Mahjong AI reviewer.',
      icon: BrainCircuitIcon,
      background: (
        <img
          src={MortalUIBackground}
          alt="Mortal UI"
          className={cn(projectBackgroundClassName, 'object-center')}
        />
      ),
      href: `${import.meta.env.BASE_URL}mortal-ui`,
    },
    {
      name: 'Echarts Dashboard',
      description: 'Dashboard with Echarts.',
      icon: SiApacheecharts,
      background: (
        <img
          src={EchartsDashboardBackground}
          alt="Echarts Dashboard"
          className={cn(projectBackgroundClassName, 'object-top')}
        />
      ),
      href: `${import.meta.env.BASE_URL}echarts-dashboard`,
    },
    {
      name: 'Vue Trello',
      description: 'Trello clone with Vue.',
      icon: SiTrello,
      background: (
        <img
          src={VueTrelloBackground}
          alt="Vue Trello"
          className={cn(projectBackgroundClassName, 'object-top')}
        />
      ),
      href: `${import.meta.env.BASE_URL}vue-trello`,
    },
    {
      name: 'Vue Design',
      description: 'Vue built-in reactive system.',
      icon: SiVuedotjs,
      background: (
        <img
          src={VueDesignBackground}
          alt="Vue Design"
          className={cn(projectBackgroundClassName, 'object-center')}
        />
      ),
      href: `${import.meta.env.BASE_URL}vue-design`,
    },
  ]

  return (
    <BentoGrid className="sm:pt-4">
      {projects.map((project, index) => (
        <BentoCard
          key={project.name}
          name={project.name}
          description={project.description}
          Icon={project.icon}
          background={project.background}
          href={project.href}
          cta="View Project"
          className={cn('col-span-3', getProjectGridSpan(index))}
        />
      ))}
    </BentoGrid>
  )
}
