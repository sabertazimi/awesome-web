import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="app-link"
          href="https://github.com/sabertazimi/bod"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Bod CLI
        </a>
      </header>
    </div>
  );
}

export default App;
