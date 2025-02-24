import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Feed = () => {
    const [videos, setVideos] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://3.105.163.2:5000/api/videos');
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div style={{
            background: 'linear-gradient(to bottom, #A9B5DF, #2D336B)',
            minHeight: '100vh',
            padding: '40px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px'
            }}>
                <h1 style={{ color: '#FFF2F2', fontSize: '2.5em' }}>IIITA-flix Feed</h1>
                <Link to={`/${userId}/upload`} style={{
                    backgroundColor: '#7886C7',
                    color: '#FFF2F2',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s, transform 0.2s'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#2D336B';
                    e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#7886C7';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
                >Upload Your Video</Link>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                justifyContent: 'center'
            }}>
                {videos.map((video) => (
                    <Link
                        key={`${video.userId}-${video.title}`}
                        to={`/${video.userId}/watch/${encodeURIComponent(video.title)}`}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        <div style={{
                            backgroundColor: '#FFF2F2',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s',
                            cursor: 'pointer'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                            <div>
                                <img
                                    src={`https://via.placeholder.com/400x225.png?text=${encodeURIComponent(video.title)}`}
                                    alt={video.title}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                            <div style={{ padding: '15px' }}>
                                <h3 style={{ color: '#2D336B', fontSize: '1.4em', margin: '0 0 10px 0' }}>{video.title}</h3>
                                <p style={{ color: '#7886C7', fontSize: '1em', margin: '0' }}>Uploaded by: {video.userId}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Feed;
