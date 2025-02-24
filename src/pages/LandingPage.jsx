import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            background: 'linear-gradient(to bottom, #FFF2F2, #A9B5DF)', 
            color: '#2D336B',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                borderRadius: '12px', 
                backgroundColor: '#FFF2F2',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '600px'
            }}>
                <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#2D336B' }}>Welcome to IIITA-flix</h1>
                <p style={{ fontSize: '1.2em', color: '#7886C7' }}>
                    IIITA-flix is an exclusive platform developed for the Acoustics and Media Society (AMS) of IIIT Allahabad.
                    It serves as a centralized repository for accessing college videos, ensuring that IIITA students have
                    seamless and secure access to their media content.
                </p>
                <Link to="/login" style={{
                    display: 'inline-block',
                    marginTop: '20px',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#2D336B',
                    color: '#FFF2F2',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '1.1em'
                }}>
                    Login to Continue
                </Link>
            </div>
        </div>
    );
};

export default Home;
