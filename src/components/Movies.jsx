import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import YouTube from "react-youtube";

import MovieCard from "./MovieCard";
import ModalMovie from "./ModelMovie";
import "../App.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [trailer, setTrailer] = useState(null);
  const [player, setPlayer] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [page, setPage] = useState(2);
  const [isNoMore, setIsNoMore] = useState(true);
  const [visible, setVisible] = useState(16);


  const API_URL = `https://api.themoviedb.org/3/`;
  const API_KEY = "e887f3f56590f840cc3ee946bca85230";

  async function fetchMovies(searchText) {
    const type = searchText
      ? `search/movie?query=${searchText}&api_key=${API_KEY}&page=1`
      : `movie/popular?api_key=${API_KEY}&page=1`;
    const response = await axios.get(`${API_URL}${type}`);
    setMovies(response.data.results);
  }
  async function getMovies(searchText) {
    const type = searchText
      ? `search/movie?query=${searchText}&api_key=${API_KEY}&page=${page}`
      : `movie/popular?api_key=${API_KEY}&page=${page}`;
    const response = await axios.get(`${API_URL}${type}`);
    return response.data.results;
  }

  async function fetchMovieforYoutube(id) {
    const response = await axios.get(
      `${API_URL}movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    );
    const data = response.data;
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (video) => video.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    return data;
  }

  async function selectMovieId(movie) {
    const data = await fetchMovieforYoutube(movie.id);
    setSelectedMovie(data);
    setHidden(false);
    setOpen(true);
  }

  useEffect(() => {
    fetchMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    fetchMovies(searchText);
  }

  function movieTrailer() {
    return (
      <YouTube
        videoId={trailer.key}
        className={"youtube-container"}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 0
          }
        }}
      />
    );
  }
  function trailerPlayer() {
    setPlayer(true);
  }
  function handleClose() {
    setPlayer(false);
    setOpen(false);
  }

  async function infitineScroll() {
    const data = await getMovies();
    console.log(data);

    setMovies([...movies, ...data]);
    if (data.length < 1 || data.length < 16) {
      setIsNoMore(false);
    }
    setPage(page + 1);
    setVisible((prevValue) => prevValue + 16);
  }

  return (
    <div className="app">
      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search movies..."
        />
        <button className="search-button" type="submit">
          <SearchIcon fontSize="large" />
        </button>
      </form>
      {open && (
        <ModalMovie
          hidden={hidden}
          open={open}
          selectMovieId={selectMovieId}
          handleClose={handleClose}
          selectedMovie={selectedMovie}
          player={player}
          movieTrailer={movieTrailer}
          trailerPlayer={trailerPlayer}
        />
      )}
      <InfiniteScroll
        dataLength={movies.length}
        next={infitineScroll}
        hasMore={isNoMore}
        style={{overflowY: 'hidden'}}
        loader={<CircularProgress className="circular-loader" />}
        endMessage={
          <p style={{ textAlign: 'center', flexDirection: 'column'}}>
            <b>Wow! You have seen it all</b>
          </p>
        }
      >
        {movies.length > 0 ? (
          <div className="container">
            {movies.slice(0, visible).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                selectMovie={selectMovieId}
              />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2> Movie is not Found</h2>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}

export default Movies;
