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
    <DefaultLayout>
      <VoidSection number="01" fileName="players-view.tsx">
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link to={`${import.meta.env.BASE_URL}`}>
              <ArrowLeftIcon className="mr-2 size-4" />
              返回日历
            </Link>
          </Button>
          <h1 className="text-foreground font-mono text-4xl font-bold">M.League 选手图鉴</h1>
          <div className="w-[100px]"></div>
        </div>
      </VoidSection>
      {teamGroups.map(({ team, members }, index) => (
        <VoidSection
          key={team.id}
          number={String(index + 2).padStart(2, '0')}
          fileName={`team-${team.id}.tsx`}
          title={team.team_name}
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
