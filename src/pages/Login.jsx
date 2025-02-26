import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';

const Login = () => {
    const [uid, setUid] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(uid, pwd, '2025');
        if (success) {
            localStorage.setItem('userId', uid);  // ✅ Store uid in localStorage
            navigate(`/${uid}/feed`);
        } else {
            alert('Invalid ERP credentials');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #A9B5DF, #2D336B)',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                textAlign: 'center',
                padding: '40px',
                borderRadius: '12px',
                backgroundColor: '#FFF2F2',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '400px',
                width: '100%'
            }}>
                <h1 style={{ fontSize: '2em', marginBottom: '20px', color: '#2D336B' }}>Login to IIITA-flix</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Roll No" 
                        value={uid} 
                        onChange={(e) => setUid(e.target.value)} 
                        style={{
                            width: '100%',
                            padding: '10px',
                            margin: '10px 0',
                            border: '1px solid #7886C7',
                            borderRadius: '8px',
                            fontSize: '1em'
                        }}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={pwd} 
                        onChange={(e) => setPwd(e.target.value)} 
                        style={{
                            width: '100%',
                            padding: '10px',
                            margin: '10px 0',
                            border: '1px solid #7886C7',
                            borderRadius: '8px',
                            fontSize: '1em'
                        }}
                    />
                    <button 
                        type="submit" 
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#2D336B',
                            color: '#FFF2F2',
                            fontSize: '1.1em',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
