import React, { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';
import axios from 'axios';
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  const API_URL = `https://api.themoviedb.org/3/`;
  const API_KEY = process.env.REACT_APP_API_KEY

  async function fetchMovies(searchText) {
    const type = searchText ? `search/movie?query=${searchText}&api_key=${API_KEY}` : `discover/movie?api_key=${API_KEY}`;
    const response = await axios.get(`${API_URL}${type}`);
    setMovies(response.data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    fetchMovies(searchText);

  };

  return (
    <div className='app'>
      <header className='header'>
        <h1>Movie App</h1>
        
      </header>
      <div className="container">
        {
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
