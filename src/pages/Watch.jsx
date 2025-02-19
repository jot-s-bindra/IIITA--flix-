// src/pages/Watch.jsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'

const Watch = () => {
  const { userId, videoId } = useParams()

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Now Watching: {videoId}</h1>
      <video controls width="80%" style={{ borderRadius: '10px', marginBottom: '20px' }}>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <br />
      <Link to={`/${userId}/feed`} style={{ textDecoration: 'none', color: '#007bff' }}>
        ← Back to Feed
      </Link>
    </div>
  )
}

export default Watch
