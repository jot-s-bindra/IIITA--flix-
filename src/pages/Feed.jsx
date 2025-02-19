// src/pages/Feed.jsx
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Feed = () => {
  const { userId } = useParams()

  // Mock video data
  const videos = [
    { id: 'video1', title: 'Introduction to React' },
    { id: 'video2', title: 'Building with Vite' },
    { id: 'video3', title: 'Mastering Kafka' },
  ]

  return (
    <div style={{ padding: '20px' }}>
      <h1>Video Feed</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {videos.map((video) => (
          <li key={video.id} style={{ marginBottom: '10px' }}>
            <Link to={`/${userId}/watch/${video.id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
              {video.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Feed
