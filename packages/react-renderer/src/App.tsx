import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import Logo from '@/logo.svg'

function App() {
  const [count, setCount] = useState<number>(0)
  const inc = useCallback(() => {
    setCount(num => num + 1)
  }, [])
  const dec = useCallback(() => {
    setCount(num => num - 1)
  }, [])

  return (
    <div>
      <header className="flex flex-col items-center justify-center min-h-screen bg-background text-[calc(10px+2vmin)]">
        <img
          src={Logo}
          alt="logo"
          className="h-[40vmin] pointer-events-none animate-spin animation-duration-20000"
          title="logo"
        />
        <div className="flex flex-row items-center justify-center">
          <Button size="xl" onClick={dec}>
            -
          </Button>
          <div className="px-8 text-6xl text-foreground">{count}</div>
          <Button size="xl" onClick={inc}>
            +
          </Button>
        </div>
      </header>
    </div>
  )
}

export default App
