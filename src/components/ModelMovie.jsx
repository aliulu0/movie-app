import React from 'react'
import { Box, Fade, Modal } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

function ModelMovie({ trailerPlayer, open, handleClose, selectedMovie, player, movieTrailer }) {
    return (
        <div className='modal-container'>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
                disableScrollLock={true}
                disableEscapeKeyDown={false}
                disableAutoFocus={true}
            >
                <Box className='modal'>
                    <span className='close-button' onClick={handleClose}>X</span>
                    <Fade className='modal-movie' in={open}>
                        <div className='modal-content' style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)),url('https://image.tmdb.org/t/p/w1280${selectedMovie.backdrop_path}')` }}>
                            <div className='hero-content'>
                                {
                                    player ?
                                        (selectedMovie.videos && player ? movieTrailer() : null) : (
                                            <div className='content'>
                                                {selectedMovie.videos && <button className='hero-button' onClick={trailerPlayer}><PlayCircleOutlineIcon sx={{ fontSize: 65, color: 'white' }} /></button>}
                                                <h1 className='hero-title'>{selectedMovie.title}</h1>
                                                {selectedMovie.overview ? <p className='hero-overview'>{selectedMovie.overview}</p> : null}
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </Fade>
                </Box>
            </Modal>
        </div>
    )
}

export default ModelMovie;