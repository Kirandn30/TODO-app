import React from 'react'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

export const Header = () => {
    return (
<div>
  <div className='title'>
    <h1 style={{ display: "flex", alignItems: "center", fontSize: "2rem", color: "#333" }}>
      <PlaylistAddCheckIcon style={{ fontSize: "2rem", marginRight: "0.5rem" }} />
      Kiran Lists
    </h1>
  </div>
</div>
    )
}
