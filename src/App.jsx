import React from 'react';
import "./App.css";
import Movies from './components/Movies';

function App() {

  return (
    <div className='app'>
      <header className='header'>
        <h1>Movie App</h1>
      </header>
      <Movies />
    </div>
  );
}

export default App;
