import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Hls from 'hls.js';

const Watch = () => {
    const { userId, videoId } = useParams();
    const [videoUrl, setVideoUrl] = useState(null);
    const videoRef = useRef(null);
    const WATCH_SERVICE_URL = 'http://52.63.145.126:7000';
    // ✅ Fetch Pre-Signed URL
    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const response = await axios.get(`${WATCH_SERVICE_URL}/api/watch/${userId}/${videoId}`);                setVideoUrl(response.data.presignedUrl); // ✅ Store the URL in state
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };
        fetchVideoUrl();
    }, [userId, videoId]);

    // ✅ Initialize HLS.js if videoUrl is available
    useEffect(() => {
        if (videoUrl && videoRef.current) {
            const video = videoRef.current;

            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoUrl); // ✅ Use the Pre-Signed URL
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play(); // Auto-play video when ready
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
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Now Watching: {videoId}</h1>

            {videoUrl ? (
                <video ref={videoRef} controls width="80%" style={{ borderRadius: '10px', marginBottom: '20px' }} />
            ) : (
                <p>Loading video...</p>
            )}

            <br />
            <Link to={`/${userId}/feed`} style={{ textDecoration: 'none', color: '#007bff' }}>
                ← Back to Feed
            </Link>
        </div>
    );
};

export default Watch;
