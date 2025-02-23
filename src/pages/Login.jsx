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
        if (success) navigate(`/${uid}/feed`);
        else alert('Invalid ERP credentials');
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Roll No" value={uid} onChange={(e) => setUid(e.target.value)} />
                <input type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
