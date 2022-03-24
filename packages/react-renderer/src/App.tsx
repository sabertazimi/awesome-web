import { useCallback, useState } from 'react';
import Logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState<number>(0);
  const inc = useCallback(() => {
    setCount(count => count + 1);
  }, []);
  const dec = useCallback(() => {
    setCount(count => count - 1);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <Logo className="app-logo" title="logo" />
        <div className="flex flex-row justify-center items-center">
          <button className="p-4 text-white text-6xl" onClick={dec}>
            -
          </button>
          <div className="p-4 text-white text-6xl">{count}</div>
          <button className="p-4 text-white text-6xl" onClick={inc}>
            +
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
