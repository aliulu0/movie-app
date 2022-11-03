import React from 'react'

function MovieCard({ movie, selectMovie }) {

    const noImage = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";

    function numberInfo() {
        return (
            <div className='movie-info-number'>
                <h3 className='year'>
                    {movie.release_date.slice(0, 4)}
                </h3>
                <h3 className='avarage'>
                    {parseFloat(movie.vote_average).toFixed(1)}
                </h3>
            </div>
        )
    }

    return (
        <div className='movie-card' onClick={() => selectMovie(movie)}>
            <div className='movie-container'>
                <div className='movie' >                    
                    {
                        movie.poster_path ?
                            (

                                <img key={movie.id} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="movieimg" />
                            )

                            :
                            <img className='empty-image' key={movie.id} src={noImage} alt='imagenotfound' />
                    }
                </div>
                <div className='movie-info'>
                    <h3 className='movie-title'>{movie.title}</h3>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;