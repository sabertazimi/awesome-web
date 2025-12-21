import { ArrowLeftIcon } from 'lucide-react'
import { Link } from 'react-router'
import { pros, teams } from '@/api/data'
import { DefaultLayout } from '@/components/default-layout'
import { PlayerCard } from '@/components/player-card'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { VoidSection } from '@/components/void-section'

export default function PlayersView() {
  // 按队伍分组队员
  const teamGroups = teams.map(team => ({
    team,
    members: pros.filter(pro => pro.teamId === team.id),
  }))

  return (
    <DefaultLayout number="11">
      <SiteHeader
        title="选手图鉴"
        link={(
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeftIcon className="text-primary size-4" />
              返回日历
            </Link>
          </Button>
        )}
      />
      {teamGroups.map(({ team, members }, index) => (
        <VoidSection
          key={team.id}
          number={(index + 1).toString().padStart(2, '0')}
          fileName={`${team.teamName}.json`}
          title={team.teamName}
          titleImage={`${import.meta.env.BASE_URL}teams/${team.id}.png`}
          titleImageAlt={team.teamName}
        >
          <div className="-mx-8 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
            {members.map((pro, idx) => (
              <PlayerCard key={pro.id} player={pro} teamId={team.id} index={idx} />
            ))}
          </div>
        </VoidSection>
      ))}
    </DefaultLayout>
  )
}
