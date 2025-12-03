import { ArrowLeftIcon } from 'lucide-react'
import { Link } from 'react-router'
import { pros, teams } from '@/api/data'
import { DefaultLayout } from '@/components/default-layout'
import { PlayerCard } from '@/components/player-card'
import { Button } from '@/components/ui/button'
import { VoidSection } from '@/components/void-section'

export default function PlayersView() {
  // 按队伍分组队员
  const teamGroups = teams.map(team => ({
    team,
    members: pros.filter(pro => pro.team_id === team.id),
  }))

  return (
    <DefaultLayout number="11">
      <VoidSection number="00" enableFlickeringGrid>
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <Button variant="outline" asChild className="justify-self-start">
            <Link to={`${import.meta.env.BASE_URL}`}>
              <ArrowLeftIcon className="text-primary size-4" />
              返回日历
            </Link>
          </Button>
          <h1 className="text-foreground flex items-center gap-4 font-mono text-4xl font-bold">
            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="M.League" className="h-10 w-auto" />
            选手图鉴
          </h1>
          <div className="sr-only"></div>
        </div>
      </VoidSection>
      {teamGroups.map(({ team, members }, index) => (
        <VoidSection
          key={team.id}
          number={(index + 1).toString().padStart(2, '0')}
          fileName={`${team.team_name}.json`}
          title={team.team_name}
          titleImage={`${import.meta.env.BASE_URL}teams/${team.id}.png`}
          titleImageAlt={team.team_name}
        >
          <div className="-mx-8 grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4">
            {members.map(pro => (
              <PlayerCard key={pro.id} player={pro} teamColor={team.team_color} />
            ))}
          </div>
        </VoidSection>
      ))}
    </DefaultLayout>
  )
}
