import { ArrowLeftIcon } from 'lucide-react'
import { Link } from 'react-router'
import { pros, teams } from '@/api/data'
import { DefaultLayout } from '@/components/default-layout'
import { PlayerCard } from '@/components/player-card'
import { TeamCard } from '@/components/team-card'
import { Button } from '@/components/ui/button'

export default function PlayersView() {
  // 按队伍分组队员
  const teamGroups = teams.map(team => ({
    team,
    members: pros.filter(pro => pro.team_id === team.id),
  }))

  return (
    <DefaultLayout>
      <div className="mb-12 flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link to={`${import.meta.env.BASE_URL}`}>
            <ArrowLeftIcon className="text-primary mr-2 size-4" />
            返回日历
          </Link>
        </Button>
        <h1 className="text-primary text-4xl font-bold">M.League 选手图鉴</h1>
        <div className="w-[100px]"></div>
      </div>
      <div className="space-y-12">
        {teamGroups.map(({ team, members }) => (
          <TeamCard key={team.id} team={team}>
            {members.map(pro => (
              <PlayerCard key={pro.id} player={pro} teamColor={team.team_color} />
            ))}
          </TeamCard>
        ))}
      </div>
    </DefaultLayout>
  )
}
