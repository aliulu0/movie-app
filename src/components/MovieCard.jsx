import React from 'react'

function MovieCard({ movie }) {
    console.log(movie.title);



    return (
        <div className='movie-card'>
            <div className='movies'>
            <div className='movie'>
                <img key={movie.id} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="movieimg" />
            </div>
            <div className='movie-info'>
                <h3 className='movie-title'>{movie.title}</h3>
            </div>
            </div>
        </div>
    )
}

export default MovieCard;