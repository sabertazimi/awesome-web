import type { HosetsuResult, RoundInfo, TableData } from '@/api/data'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { getTeamColorClass } from '@/api/data'
import { HosetsuResultContextMenu, HosetsuResultDisplay, HosetsuResultInput } from '@/components/hosetsu-result-input'
import { getPlayerOptions, PlayerDisplay, PlayerSelect } from '@/components/player-select'
import { RoundInput } from '@/components/round-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface ReviewTableProps {
  tableData: TableData[]
  tableName: 'A' | 'B'
  selectedTeams: string[]
  editingField: string | null
  onEditField: (fieldId: string | null) => void
  onUpdatePlayer: (playerIndex: number, value: string) => void
  onUpdateRound: (roundIndex: number, value: RoundInfo) => void
  onUpdateResult: (roundIndex: number, playerIndex: number, value: HosetsuResult) => void
  onAddRow: () => void
  onRemoveRow: (roundIndex: number) => void
  onBlur: () => void
}

export function ReviewTable({
  tableData,
  tableName,
  selectedTeams,
  editingField,
  onEditField,
  onUpdatePlayer,
  onUpdateRound,
  onUpdateResult,
  onAddRow,
  onRemoveRow,
  onBlur,
}: ReviewTableProps) {
  const data = tableData.length > 0 ? tableData[0] : { players: ['', '', '', ''], rounds: [] }
  const playerOptions = getPlayerOptions()
  const tableRef = useRef<HTMLTableElement>(null)

  const getFocusableCells = useCallback((): HTMLElement[] => {
    if (!tableRef.current)
      return []
    return Array.from(tableRef.current.querySelectorAll<HTMLElement>('[data-cell-id]'))
  }, [])

  const focusCell = useCallback((cellId: string) => {
    const cell = tableRef.current?.querySelector(`[data-cell-id="${cellId}"]`) as HTMLElement
    cell?.focus()
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentCellId: string) => {
      const cells = getFocusableCells()
      const currentIndex = cells.findIndex(cell => cell.getAttribute('data-cell-id') === currentCellId)
      if (currentIndex === -1)
        return

      let targetIndex = currentIndex
      const columnsPerRow = 5

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          targetIndex = currentIndex - columnsPerRow
          break
        case 'ArrowDown':
          e.preventDefault()
          targetIndex = currentIndex + columnsPerRow
          break
        case 'ArrowLeft':
          e.preventDefault()
          targetIndex = currentIndex - 1
          break
        case 'ArrowRight':
          e.preventDefault()
          targetIndex = currentIndex + 1
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          onEditField(currentCellId)
          return
        case 'Escape':
          e.preventDefault()
          onEditField(null)
          focusCell(currentCellId)
          return
      }

      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault()
        targetIndex = currentIndex - 1
      }

      if (targetIndex >= 0 && targetIndex < cells.length) {
        const targetCell = cells[targetIndex]
        if (targetCell)
          targetCell.focus()
      }
    },
    [getFocusableCells, onEditField, focusCell],
  )

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, currentCellId: string) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onBlur()
        const cells = getFocusableCells()
        const currentIndex = cells.findIndex(cell => cell.getAttribute('data-cell-id') === currentCellId)
        const targetIndex = currentIndex + 1

        if (targetIndex >= 0 && targetIndex < cells.length) {
          setTimeout(() => {
            const nextCell = cells[targetIndex]
            if (nextCell)
              nextCell.focus()
          }, 0)
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onEditField(null)
        focusCell(currentCellId)
      }
    },
    [onBlur, onEditField, getFocusableCells, focusCell],
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {tableName}
          桌
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table ref={tableRef}>
          <TableBody>
            {/* 第一行: 选手名称 */}
            <TableRow className="bg-accent">
              <TableCell className="w-24 font-semibold">小局</TableCell>
              {[0, 1, 2, 3].map((playerIndex) => {
                const fieldId = `${tableName}-player-${playerIndex}`
                const isEditing = editingField === fieldId
                const playerName = data.players[playerIndex]
                const playerTeamId = playerName ? playerOptions.find(p => p.value === playerName)?.teamId : undefined
                const teamColors = playerTeamId ? getTeamColorClass(playerTeamId) : ''

                return (
                  <TableCell
                    key={playerIndex}
                    data-cell-id={fieldId}
                    tabIndex={isEditing ? -1 : 0}
                    role="button"
                    aria-label={`选手 ${playerIndex + 1}: ${playerName || '未选择'}`}
                    className={cn(
                      'focus-visible:ring-primary cursor-pointer transition-all focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
                      !isEditing && playerName && 'hover:shadow-md',
                      !isEditing && !playerName && 'hover:bg-muted hover:shadow-md',
                      teamColors,
                    )}
                    onClick={() => !isEditing && onEditField(fieldId)}
                    onKeyDown={e => !isEditing && handleKeyDown(e, fieldId)}
                  >
                    {isEditing ? (
                      <PlayerSelect
                        value={data.players[playerIndex]}
                        onChange={(value) => {
                          onUpdatePlayer(playerIndex, value)
                          onEditField(null)
                          setTimeout(() => focusCell(fieldId), 0)
                        }}
                        open={isEditing}
                        onOpenChange={(open) => {
                          if (!open) {
                            onEditField(null)
                            focusCell(fieldId)
                          }
                        }}
                        placeholder={`プロ ${playerIndex + 1}`}
                        filterByTeams={selectedTeams}
                      />
                    ) : (
                      <PlayerDisplay
                        playerName={data.players[playerIndex]}
                        playerOptions={playerOptions}
                        placeholder={`プロ ${playerIndex + 1}`}
                      />
                    )}
                  </TableCell>
                )
              })}
              <TableCell className="w-12"></TableCell>
            </TableRow>
            {data.rounds.map((round, roundIndex) => (
              <TableRow key={`${round.round.field}-${round.round.round}-${round.round.honba}`}>
                <TableCell
                  data-cell-id={`${tableName}-round-${roundIndex}`}
                  tabIndex={editingField === `${tableName}-round-${roundIndex}` ? -1 : 0}
                  role="button"
                  aria-label={`局数: ${roundIndex + 1}`}
                  className={cn(
                    'focus-visible:ring-primary cursor-pointer transition-all focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
                    editingField !== `${tableName}-round-${roundIndex}` && 'hover:bg-accent hover:shadow-md',
                  )}
                  onClick={() => {
                    // 只在点击单元格本身时打开，不在点击 Popover 时打开
                    if (editingField !== `${tableName}-round-${roundIndex}`) {
                      onEditField(`${tableName}-round-${roundIndex}`)
                    }
                  }}
                  onKeyDown={e =>
                    editingField !== `${tableName}-round-${roundIndex}`
                    && handleKeyDown(e, `${tableName}-round-${roundIndex}`)}
                >
                  <RoundInput
                    value={round.round}
                    onChange={(value) => {
                      onUpdateRound(roundIndex, value)
                      onBlur()
                    }}
                    open={editingField === `${tableName}-round-${roundIndex}`}
                    onOpenChange={(open) => {
                      if (!open) {
                        onEditField(null)
                      }
                    }}
                    existingRounds={data.rounds.map(r => r.round)}
                  />
                </TableCell>
                {[0, 1, 2, 3].map((playerIndex) => {
                  const fieldId = `${tableName}-result-${roundIndex}-${playerIndex}`
                  const isEditing = editingField === fieldId
                  const result = round.results[playerIndex]
                  return (
                    <TableCell
                      key={playerIndex}
                      data-cell-id={fieldId}
                      tabIndex={isEditing ? -1 : 0}
                      role="button"
                      aria-label={`第 ${roundIndex + 1} 局，选手 ${playerIndex + 1} 结果`}
                      className={cn(
                        'focus-visible:ring-primary cursor-text transition-all focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
                        !isEditing && 'hover:bg-accent hover:shadow-md',
                      )}
                      onClick={() => onEditField(fieldId)}
                      onKeyDown={e => !isEditing && handleKeyDown(e, fieldId)}
                    >
                      {isEditing ? (
                        <HosetsuResultInput
                          value={result}
                          onChange={value => onUpdateResult(roundIndex, playerIndex, value)}
                          onClose={() => {
                            onEditField(null)
                            onBlur()
                            setTimeout(() => focusCell(fieldId), 0)
                          }}
                          onKeyDown={e => handleInputKeyDown(e as React.KeyboardEvent<HTMLInputElement>, fieldId)}
                          autoFocus
                        />
                      ) : (
                        <HosetsuResultContextMenu
                          value={result}
                          onChange={value => onUpdateResult(roundIndex, playerIndex, value)}
                        >
                          <HosetsuResultDisplay value={result} />
                        </HosetsuResultContextMenu>
                      )}
                    </TableCell>
                  )
                })}
                <TableCell align="center">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveRow(roundIndex)}
                    aria-label={`删除第 ${roundIndex + 1} 局`}
                  >
                    <Trash2Icon className="text-destructive size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="hover:bg-accent group border-none transition-all">
              <TableCell colSpan={6} className="h-8 border-none p-0">
                <div
                  className="flex size-full cursor-pointer items-center justify-center opacity-0 transition-all duration-200 group-hover:opacity-100"
                  onClick={onAddRow}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onAddRow()
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  title="添加局数"
                  aria-label="添加新局数"
                >
                  <PlusIcon className="text-primary size-4" />
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="pointer-events-none border-none opacity-0" aria-hidden="true">
              <TableCell className="h-12 border-none p-0" />
              <TableCell className="h-12 border-none p-0" />
              <TableCell className="h-12 border-none p-0" />
              <TableCell className="h-12 border-none p-0" />
              <TableCell className="h-12 border-none p-0" />
              <TableCell className="h-12 border-none p-0" />
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
