import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Hls from 'hls.js';

const Watch = () => {
    const { userId, videoId } = useParams();
    const [videoUrl, setVideoUrl] = useState(null);
    const videoRef = useRef(null);
    const WATCH_SERVICE_URL = 'http://52.63.145.126:7000';

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const response = await axios.get(`${WATCH_SERVICE_URL}/api/watch/${userId}/${videoId}`);
                setVideoUrl(response.data.presignedUrl);
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };
        fetchVideoUrl();
    }, [userId, videoId]);

    useEffect(() => {
        if (videoUrl && videoRef.current) {
            const video = videoRef.current;

            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoUrl);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play();
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = videoUrl;
                video.addEventListener('loadedmetadata', () => {
                    video.play();
                });
            }
        }
    }, [videoUrl]);

    return (
        <div style={{
            background: 'linear-gradient(to bottom, #A9B5DF, #2D336B)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ textAlign: 'center', color: '#FFF2F2', fontSize: '2em', marginBottom: '20px' }}>Now Watching: {videoId}</h1>

            {videoUrl ? (
                <video ref={videoRef} controls width="80%" style={{ borderRadius: '10px', marginBottom: '20px', border: '4px solid #FFF2F2' }} />
            ) : (
                <p style={{ color: '#FFF2F2' }}>Loading video...</p>
            )}

            <Link to={`/${userId}/feed`} style={{
                textDecoration: 'none',
                color: '#FFF2F2',
                fontSize: '1.2em',
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: '#7886C7',
                transition: 'background-color 0.3s',
                cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2D336B'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#7886C7'}>
                ← Back to Feed
            </Link>
        </div>
    );
};

export default Watch;
