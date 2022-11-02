import React from 'react'

function MovieCard({ movie, selectMovie }) {
    const noImage = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";

    return (
        <div className='movie-card' onClick={() => selectMovie(movie)}>
            <div className='movie-container'>
                <div className='movie'>
                    {
                        movie.poster_path ?
                            <img key={movie.id} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="movieimg" />
                            :
                            <img className='empty-image' key={movie.id} src={noImage} alt='imagenotfound' />
                    }
                    <div className='movie-info'>
                        <h3 className='movie-title'>{movie.title}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;