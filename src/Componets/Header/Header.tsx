import React from 'react'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

export const Header = () => {
    return (
        <div>
            <div className='title'>
                <h1><PlaylistAddCheckIcon style={{ fontSize: "2rem" }} /> TODO LIST APP</h1>
            </div>
        </div>
    )
}
