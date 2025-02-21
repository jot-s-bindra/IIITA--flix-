// src/pages/Feed.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Feed = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/videos'); // Adjust URL if needed
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="feed-container">
            <h1 className="feed-title">IIITA-flix-Feed</h1>
            <div className="video-grid">
                {videos.map((video) => (
                    <Link 
                        key={`${video.userId}-${video.title}`} 
                        to={`/${video.userId}/watch/${encodeURIComponent(video.title)}`} 
                        className="video-card"
                    >
                        <div className="thumbnail">
                            <img 
                                src={`https://via.placeholder.com/320x180.png?text=${encodeURIComponent(video.title)}`} 
                                alt={video.title} 
                            />
                        </div>
                        <div className="video-info">
                            <h3 className="video-title">{video.title}</h3>
                            <p className="video-user">User: {video.userId}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Feed;
