import type { HosetsuResult, RoundInfo, TableData } from '../api/reviews'
import type { MultiSelectOption } from '@/components/ui/multi-select'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale/zh-CN'
import { CalendarIcon, LinkIcon, LoaderIcon, UsersIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { teams } from '@/api/data'
import {
  createDefaultRoundInfo,
  createEmptyHosetsuResult,
  deleteReview,
  getReviewById,
  updateReview,
} from '@/api/reviews'
import { EditableField } from '@/components/editable-field'
import { ReviewTable } from '@/components/review-table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface ReviewDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reviewId: string | null
  date: string | null
  onDeleted?: () => void
  onUpdated?: () => void
}

export function ReviewDrawer({ open, onOpenChange, reviewId, date, onDeleted, onUpdated }: ReviewDrawerProps) {
  const [title, setTitle] = useState('')
  const [linkA, setLinkA] = useState('')
  const [linkB, setLinkB] = useState('')
  const [selectedTeams, setSelectedTeams] = useState<string[]>([])
  const [reviewDate, setReviewDate] = useState<Date>()
  const [status, setStatus] = useState<'not_started' | 'in_progress' | 'completed'>('not_started')
  const [socialUrl, setSocialUrl] = useState('')
  const [tableA, setTableA] = useState<TableData[]>([])
  const [tableB, setTableB] = useState<TableData[]>([])
  const [content, setContent] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)

  // 自动保存函数
  const autoSave = () => {
    if (!reviewId || !title.trim())
      return

    updateReview(reviewId, {
      title: title.trim(),
      linkA,
      linkB,
      teams: selectedTeams,
      date: reviewDate ? format(reviewDate, 'yyyy-MM-dd') : date || '',
      status,
      socialUrl,
      tableA,
      tableB,
      content: content.trim(),
    })

    // 通知父组件数据已更新
    onUpdated?.()
  }

  // 防抖自动保存
  useDebounce(
    () => {
      if (!reviewId || !title.trim())
        return
      autoSave()
    },
    300,
    [title, linkA, linkB, selectedTeams, reviewDate, status, socialUrl, tableA, tableB, content],
  )

  // 队伍选项 - 带颜色和样式
  const teamOptions: MultiSelectOption[] = teams.map(team => ({
    label: team.team_name,
    value: team.team_name,
    style: {
      backgroundColor: team.team_color,
      color: '#fff',
      gradient: `linear-gradient(135deg, ${team.team_color} 0%, ${team.team_color} 100%)`,
    },
  }))

  useEffect(() => {
    if (open && reviewId) {
      const review = getReviewById(reviewId)
      if (review) {
        setTitle(review.title)
        setLinkA(review.linkA || '')
        setLinkB(review.linkB || '')
        setSelectedTeams(review.teams || [])
        setReviewDate(review.date ? new Date(review.date) : undefined)
        setStatus(review.status || 'not_started')
        setSocialUrl(review.socialUrl || '')
        setTableA(review.tableA || [])
        setTableB(review.tableB || [])
        setContent(review.content || '')
        setEditingField(null)
      }
    }
  }, [open, reviewId])

  // 当编辑队伍字段时,自动触发 MultiSelect 打开
  useEffect(() => {
    if (editingField === 'teams') {
      const timeout = setTimeout(() => {
        const button = document.querySelector('[data-team-multi-select] button')
        if (button instanceof HTMLElement) {
          button.click()
        }
      }, 10)
      return () => clearTimeout(timeout)
    }
  }, [editingField])

  const confirmDelete = () => {
    if (!reviewId)
      return
    deleteReview(reviewId)
    setDeleteDialogOpen(false)
    onOpenChange(false)
    onDeleted?.()
  }

  // 处理字段失焦时自动保存
  const handleBlur = () => {
    setEditingField(null)
    autoSave()
  }

  // 表格操作函数
  const addTableRow = (table: 'A' | 'B') => {
    const currentTable = table === 'A' ? tableA : tableB
    const setTable = table === 'A' ? setTableA : setTableB

    if (currentTable.length === 0) {
      setTable([{ players: ['', '', '', ''], rounds: [] }])
    } else {
      const newTable = [...currentTable]
      // 获取已存在的小局列表，用于生成不重复的默认小局
      const existingRounds = newTable[0].rounds.map(r => r.round)
      newTable[0].rounds.push({
        round: createDefaultRoundInfo(existingRounds),
        results: [
          createEmptyHosetsuResult(),
          createEmptyHosetsuResult(),
          createEmptyHosetsuResult(),
          createEmptyHosetsuResult(),
        ],
      })
      setTable(newTable)
    }
  }

  const removeTableRow = (table: 'A' | 'B', roundIndex: number) => {
    const currentTable = table === 'A' ? tableA : tableB
    const setTable = table === 'A' ? setTableA : setTableB

    if (currentTable.length > 0) {
      const newTable = [...currentTable]
      newTable[0].rounds = newTable[0].rounds.filter((_, i) => i !== roundIndex)
      setTable(newTable)
    }
  }

  const updatePlayer = (table: 'A' | 'B', playerIndex: number, value: string) => {
    const currentTable = table === 'A' ? tableA : tableB
    const setTable = table === 'A' ? setTableA : setTableB

    if (currentTable.length === 0) {
      const newTable = { players: ['', '', '', ''], rounds: [] }
      newTable.players[playerIndex] = value
      setTable([newTable])
    } else {
      const newTable = [...currentTable]
      newTable[0].players[playerIndex] = value
      setTable(newTable)
    }
  }

  const updateRound = (table: 'A' | 'B', roundIndex: number, value: RoundInfo) => {
    const currentTable = table === 'A' ? tableA : tableB
    const setTable = table === 'A' ? setTableA : setTableB

    if (currentTable.length > 0) {
      const newTable = [...currentTable]
      newTable[0].rounds[roundIndex].round = value
      setTable(newTable)
    }
  }

  const updateResult = (table: 'A' | 'B', roundIndex: number, playerIndex: number, value: HosetsuResult) => {
    const currentTable = table === 'A' ? tableA : tableB
    const setTable = table === 'A' ? setTableA : setTableB

    if (currentTable.length > 0) {
      const newTable = [...currentTable]
      newTable[0].rounds[roundIndex].results[playerIndex] = value
      setTable(newTable)
    }
  }

  const statusConfig = {
    not_started: { label: '未开始', variant: 'secondary' as const },
    in_progress: { label: '进行中', variant: 'default' as const },
    completed: { label: '已完成', variant: 'outline' as const },
  }

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange} direction="right">
        <DrawerContent className="top-0 right-0 left-auto mt-0 h-screen rounded-none data-[vaul-drawer-direction=left]:sm:max-w-full data-[vaul-drawer-direction=right]:sm:max-w-full">
          <div className="flex h-full flex-col">
            <DrawerHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <DrawerDescription className="text-muted-foreground text-sm">比赛复盘</DrawerDescription>
                  <DrawerTitle className="text-primary mt-1 text-2xl font-bold">{title || '复盘详情'}</DrawerTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                    删除
                  </Button>
                  <DrawerClose asChild>
                    <Button size="sm" variant="ghost">
                      关闭
                    </Button>
                  </DrawerClose>
                </div>
              </div>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* 基本信息 */}
                <Card>
                  <CardHeader>
                    <EditableField
                      isEditing={editingField === 'title'}
                      onEdit={() => setEditingField('title')}
                      onBlur={handleBlur}
                      className="-mx-3 -my-2"
                      editComponent={(
                        <Input
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          onBlur={handleBlur}
                          autoFocus
                          placeholder="输入标题..."
                          className="text-lg font-semibold"
                        />
                      )}
                      displayComponent={
                        <CardTitle>{title || <span className="text-muted-foreground">输入标题...</span>}</CardTitle>
                      }
                    />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* 牌谱链接 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium">
                          <LinkIcon className="text-primary size-4" />
                          牌谱A
                        </label>
                        <EditableField
                          isEditing={editingField === 'linkA'}
                          onEdit={() => setEditingField('linkA')}
                          onBlur={handleBlur}
                          className="mt-1"
                          editComponent={(
                            <Input
                              value={linkA}
                              onChange={e => setLinkA(e.target.value)}
                              onBlur={handleBlur}
                              autoFocus
                              className="-mx-3 -my-2 h-8"
                            />
                          )}
                          displayComponent={(
                            <p className="min-h-[32px] truncate leading-8">
                              {linkA ? (
                                <a
                                  href={linkA}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                  onClick={e => e.stopPropagation()}
                                >
                                  {linkA}
                                </a>
                              ) : (
                                <span className="text-muted-foreground"></span>
                              )}
                            </p>
                          )}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium">
                          <LinkIcon className="text-primary size-4" />
                          牌谱B
                        </label>
                        <EditableField
                          isEditing={editingField === 'linkB'}
                          onEdit={() => setEditingField('linkB')}
                          onBlur={handleBlur}
                          className="mt-1"
                          editComponent={(
                            <Input
                              value={linkB}
                              onChange={e => setLinkB(e.target.value)}
                              onBlur={handleBlur}
                              autoFocus
                              className="-mx-3 -my-2 h-8"
                            />
                          )}
                          displayComponent={(
                            <p className="min-h-[32px] truncate leading-8">
                              {linkB ? (
                                <a
                                  href={linkB}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                  onClick={e => e.stopPropagation()}
                                >
                                  {linkB}
                                </a>
                              ) : (
                                <span className="text-muted-foreground"></span>
                              )}
                            </p>
                          )}
                        />
                      </div>
                    </div>

                    {/* 日期和状态 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium">
                          <CalendarIcon className="text-primary size-4" />
                          日期
                        </label>
                        <Popover
                          open={editingField === 'date'}
                          onOpenChange={(open) => {
                            if (open) {
                              setEditingField('date')
                            } else {
                              setEditingField(null)
                              autoSave()
                            }
                          }}
                        >
                          <PopoverTrigger asChild>
                            <div
                              className={cn(
                                'mt-1 cursor-pointer rounded px-3 py-2 transition-all',
                                editingField !== 'date' && 'hover:bg-accent hover:shadow-md',
                              )}
                            >
                              <div className="flex min-h-[32px] items-center">
                                <span>
                                  {reviewDate ? format(reviewDate, 'yyyy-MM-dd') : date || <span className="text-muted-foreground">选择日期</span>}
                                </span>
                              </div>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={reviewDate}
                              locale={zhCN}
                              onSelect={(date) => {
                                setReviewDate(date)
                                setEditingField(null)
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium">
                          <LoaderIcon className="text-primary size-4" />
                          状态
                        </label>
                        <EditableField
                          isEditing={editingField === 'status'}
                          onEdit={() => setEditingField('status')}
                          className="mt-1"
                          cursorType="pointer"
                          editComponent={(
                            <Select
                              value={status}
                              onValueChange={(v) => {
                                setStatus(v as 'not_started' | 'in_progress' | 'completed')
                                setEditingField(null)
                                setTimeout(autoSave, 100)
                              }}
                              open={true}
                              onOpenChange={(open) => {
                                if (!open) {
                                  setEditingField(null)
                                }
                              }}
                            >
                              <SelectTrigger className="-mx-3 -my-2 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(statusConfig).map(([key, config]) => (
                                  <SelectItem key={key} value={key}>
                                    {config.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          displayComponent={(
                            <Badge
                              variant={statusConfig[status].variant}
                              className={cn(
                                statusConfig[status].variant === 'default' && 'bg-destructive text-primary-foreground',
                                statusConfig[status].variant === 'secondary' && 'bg-muted text-muted-foreground',
                                statusConfig[status].variant === 'outline' && 'bg-primary text-primary-foreground',
                              )}
                            >
                              {statusConfig[status].label}
                            </Badge>
                          )}
                        />
                      </div>
                    </div>

                    {/* 队伍 */}
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium">
                        <UsersIcon className="text-primary size-4" />
                        队伍
                      </label>
                      <EditableField
                        isEditing={editingField === 'teams'}
                        onEdit={() => setEditingField('teams')}
                        className="mt-1"
                        cursorType="pointer"
                        editComponent={(
                          <div className="-mx-3 -my-2" data-team-multi-select>
                            <MultiSelect
                              options={teamOptions}
                              onValueChange={(teams) => {
                                setSelectedTeams(teams)
                              }}
                              defaultValue={selectedTeams}
                              maxCount={10}
                              closeOnSelect={false}
                              onClose={() => {
                                setEditingField(null)
                                autoSave()
                              }}
                              onBlur={handleBlur}
                            />
                          </div>
                        )}
                        displayComponent={(
                          <div className="flex min-h-[32px] flex-wrap items-center gap-2">
                            {selectedTeams.length > 0 ? (
                              selectedTeams.map((teamName) => {
                                const team = teams.find(t => t.team_name === teamName)
                                return (
                                  <Badge
                                    key={teamName}
                                    variant="outline"
                                    style={{
                                      backgroundColor: team?.team_color || '#999',
                                      color: '#fff',
                                      borderColor: team?.team_color || '#999',
                                    }}
                                  >
                                    {teamName}
                                  </Badge>
                                )
                              })
                            ) : (
                              <span className="text-muted-foreground"></span>
                            )}
                          </div>
                        )}
                      />
                    </div>

                    {/* 社交网址 */}
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium">
                        <LinkIcon className="text-primary size-4" />
                        网址
                      </label>
                      <EditableField
                        isEditing={editingField === 'socialUrl'}
                        onEdit={() => setEditingField('socialUrl')}
                        onBlur={handleBlur}
                        className="mt-1"
                        editComponent={(
                          <Input
                            value={socialUrl}
                            onChange={e => setSocialUrl(e.target.value)}
                            onBlur={handleBlur}
                            autoFocus
                            className="-mx-3 -my-2 h-8"
                          />
                        )}
                        displayComponent={(
                          <p className="min-h-[32px] leading-8">
                            {socialUrl ? (
                              <a
                                href={socialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                                onClick={e => e.stopPropagation()}
                              >
                                {socialUrl}
                              </a>
                            ) : (
                              <span className="text-muted-foreground"></span>
                            )}
                          </p>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* A桌 */}
                <ReviewTable
                  tableData={tableA}
                  tableName="A"
                  selectedTeams={selectedTeams}
                  editingField={editingField}
                  onEditField={setEditingField}
                  onUpdatePlayer={(playerIndex, value) => {
                    updatePlayer('A', playerIndex, value)
                  }}
                  onUpdateRound={(roundIndex, value) => {
                    updateRound('A', roundIndex, value)
                  }}
                  onUpdateResult={(roundIndex, playerIndex, value) => {
                    updateResult('A', roundIndex, playerIndex, value)
                  }}
                  onAddRow={() => addTableRow('A')}
                  onRemoveRow={roundIndex => removeTableRow('A', roundIndex)}
                  onBlur={handleBlur}
                />

                {/* B桌 */}
                <ReviewTable
                  tableData={tableB}
                  tableName="B"
                  selectedTeams={selectedTeams}
                  editingField={editingField}
                  onEditField={setEditingField}
                  onUpdatePlayer={(playerIndex, value) => {
                    updatePlayer('B', playerIndex, value)
                  }}
                  onUpdateRound={(roundIndex, value) => {
                    updateRound('B', roundIndex, value)
                  }}
                  onUpdateResult={(roundIndex, playerIndex, value) => {
                    updateResult('B', roundIndex, playerIndex, value)
                  }}
                  onAddRow={() => addTableRow('B')}
                  onRemoveRow={roundIndex => removeTableRow('B', roundIndex)}
                  onBlur={handleBlur}
                />

                {/* 备注 */}
                <Card>
                  <CardHeader>
                    <CardTitle>备注</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EditableField
                      isEditing={editingField === 'content'}
                      onEdit={() => setEditingField('content')}
                      onBlur={handleBlur}
                      editComponent={(
                        <Textarea
                          value={content}
                          onChange={e => setContent(e.target.value)}
                          onBlur={handleBlur}
                          autoFocus
                          className="-mx-3 -my-2 min-h-[200px] resize-y"
                        />
                      )}
                      displayComponent={(
                        <div className="prose min-h-[200px] max-w-none">
                          {content ? (
                            <pre className="text-foreground font-sans whitespace-pre-wrap">{content}</pre>
                          ) : (
                            <p className="text-muted-foreground italic"></p>
                          )}
                        </div>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* 删除确认对话框 */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>确定要删除这个复盘吗？此操作无法撤销。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
