import React, { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';
import axios from 'axios';
import "./App.css";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
function App() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({})

  const API_URL = `https://api.themoviedb.org/3/`;
  const API_KEY = process.env.REACT_APP_API_KEY

  async function fetchMovies(searchText) {
    const type = searchText ? `search/movie?query=${searchText}&api_key=${API_KEY}` : `movie/popular?api_key=${API_KEY}`;
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
      <form className='search' onSubmit={handleSearch}>
        <input type='text' onChange={e => setSearchText(e.target.value)} placeholder="Search movies..." />
        <button className='search-button' type='submit'>
          <SearchIcon fontSize="large" />
        </button>
      </form>


      <div className='hero' style={{backgroundImage:  `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)),url('https://image.tmdb.org/t/p/w1280${selectedMovie.backdrop_path}')`}}>
        <div className='hero-content'>
          <button className='hero-button'><PlayCircleOutlineIcon sx={{fontSize: 55, color: 'white'}} /></button>
        <h1 className='hero-title'>{selectedMovie.title}</h1>
        {selectedMovie.overview ? <p className='hero-overview'>{selectedMovie.overview}</p> : null}
        </div>
      </div>


      {
        movies.length > 0 ? (
          <div className="container">
            
            {
              movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} selectMovie={setSelectedMovie} />
              ))
            }
          </div>
        ) : (
          <div className='empty'>
            <h2> Movie is not Found</h2>
          </div>
        )
      }

    </div>
  );
}

export default App;
