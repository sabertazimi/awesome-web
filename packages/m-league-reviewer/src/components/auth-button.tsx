import type { User } from '@supabase/supabase-js'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { LoaderIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getCurrentUser, onAuthStateChange, signInWithGitHub, signOut } from '@/api/auth'
import { migrateLocalDataToSupabase } from '@/api/reviews'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSigningIn, setIsSigningIn] = useState(false)

  useEffect(() => {
    const initAuth = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setLoading(false)

      if (currentUser) {
        try {
          await migrateLocalDataToSupabase()
        } catch (error) {
          console.error('数据迁移失败:', error)
        }
      }
    }

    void initAuth()

    const unsubscribe = onAuthStateChange((currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        void migrateLocalDataToSupabase().catch((error) => {
          console.error('数据迁移失败:', error)
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true)
      await signInWithGitHub()
    } catch (error) {
      console.error('登录失败:', error)
      toast.error('登录失败,请重试')
      setIsSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setUser(null)
      toast.success('已退出登录')
      window.location.reload()
    } catch (error) {
      console.error('登出失败:', error)
      toast.error('登出失败,请重试')
    }
  }

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <LoaderIcon className="size-4 animate-spin" />
      </Button>
    )
  }

  if (!user) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => void handleSignIn()}
        disabled={isSigningIn}
      >
        {isSigningIn ? (
          <>
            <LoaderIcon className="mr-2 size-4 animate-spin" />
            登录中...
          </>
        ) : (
          <>
            <SiGithub className="mr-2 size-4" />
            GitHub 登录
          </>
        )}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Avatar className="size-6">
            <AvatarImage src={user.user_metadata?.avatar_url as string} alt={(user.user_metadata?.name as string) || user.email || 'User'} />
            <AvatarFallback>
              <UserIcon className="size-4" />
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">{(user.user_metadata?.name as string) || user.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{(user.user_metadata?.name as string) || '用户'}</p>
            <p className="text-muted-foreground text-xs leading-none">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => void handleSignOut()}>
          <LogOutIcon className="mr-2 size-4" />
          退出登录
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
