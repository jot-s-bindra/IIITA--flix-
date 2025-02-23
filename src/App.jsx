import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './pages/Feed.css';
import Feed from './pages/Feed';
import Watch from './pages/Watch';
import Upload from './pages/Upload';
import Login from './pages/Login';
import React from 'react';
import { isAuthenticated } from './utils/auth';

const ProtectedRoute = ({ element }) => {
    const [auth, setAuth] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const checkAuth = async () => {
            const result = await isAuthenticated();
            setAuth(result);
            setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) return <div>Loading...</div>;
    return auth ? element : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1 className="welcome-message">Welcome to IIITA-flix</h1>} />
                <Route path="/login" element={<Login />} />
                <Route path="/:userId/feed" element={<ProtectedRoute element={<Feed />} />} />
                <Route path="/:userId/watch/:videoId" element={<ProtectedRoute element={<Watch />} />} />
                <Route path="/:userId/upload" element={<ProtectedRoute element={<Upload />} />} />
            </Routes>
        </Router>
    );
};

export default App;
