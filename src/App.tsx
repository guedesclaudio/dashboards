import { useState } from 'react';
import Home from './modules/home/home';
import { requests } from './api';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home/>
      </header>
    </div>
  );
}

export default App;
