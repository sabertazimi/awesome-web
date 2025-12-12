import { DatabaseIcon, DownloadIcon, InfoIcon, UploadIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { downloadDataAsJson, importAllData } from '@/api/reviews'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface DataManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDataImported?: () => void
}

export function DataManagementDialog({ open, onOpenChange, onDataImported }: DataManagementDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importConfirmOpen, setImportConfirmOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 处理导出
  const handleExport = () => {
    try {
      downloadDataAsJson()
      setError(null)
    } catch (err: unknown) {
      setError('导出失败,请重试')
      toast.error(`导出错误: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  // 处理文件选择
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setImportConfirmOpen(true)
    }
  }

  // 确认导入
  const handleConfirmImport = async () => {
    if (!selectedFile)
      return

    try {
      const text = await selectedFile.text()
      const result = importAllData(text)

      if (result.success) {
        setError(null)
        setImportConfirmOpen(false)
        setSelectedFile(null)
        onOpenChange(false)
        onDataImported?.()
      } else {
        setError(result.error || '导入失败')
      }
    } catch (err: unknown) {
      setError('读取文件失败,请确保文件格式正确')
      toast.error(`导入错误: ${err instanceof Error ? err.message : String(err)}`)
    }

    // 重置文件输入
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // 取消导入
  const handleCancelImport = () => {
    setImportConfirmOpen(false)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // 触发文件选择
  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2 sm:justify-normal">
              <DatabaseIcon className="size-5" />
              数据管理
            </DialogTitle>
            <DialogDescription>导出或导入您的复盘和笔记</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {error && (
              <div className="bg-destructive/10 text-destructive border-destructive/20 border p-3 text-sm">{error}</div>
            )}
            <div className="space-y-3">
              <Button onClick={handleExport} className="w-full justify-start" variant="outline">
                <DownloadIcon className="mr-2 size-4" />
                导出数据
              </Button>
              <Button onClick={handleImportClick} className="w-full justify-start" variant="outline">
                <UploadIcon className="mr-2 size-4" />
                导入数据
              </Button>
              <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileSelect} className="hidden" />
            </div>
            <Alert>
              <InfoIcon />
              <AlertTitle>注意事项</AlertTitle>
              <AlertDescription>
                <ul className="list-inside list-disc space-y-1">
                  <li>导出会将所有复盘和笔记保存为 JSON 文件</li>
                  <li>导入会覆盖当前所有数据，请谨慎操作</li>
                  <li>建议定期备份数据</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={importConfirmOpen} onOpenChange={setImportConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认导入数据</AlertDialogTitle>
            <AlertDialogDescription>
              导入数据将会
              <span className="text-destructive font-semibold">覆盖</span>
              当前所有的复盘和笔记数据。
              <br />
              此操作无法撤销，请确保已备份当前数据。
              <br />
              <br />
              文件名：
              {' '}
              <span className="text-foreground font-mono">{selectedFile?.name}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelImport}>取消</AlertDialogCancel>
            {/* eslint-disable-next-line ts/no-misused-promises -- 确认导入需要异步处理 */}
            <AlertDialogAction variant="destructive" onClick={handleConfirmImport}>
              确认
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
