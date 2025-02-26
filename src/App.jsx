import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './App.css';
import './pages/Feed.css';
import Feed from './pages/Feed';
import Watch from './pages/Watch';
import Upload from './pages/Upload';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import React from 'react';
import { isAuthenticated } from './utils/auth';

const ProtectedRoute = ({ element }) => {
    const [auth, setAuth] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const { userId } = useParams(); 

    React.useEffect(() => {
        const checkAuth = async () => {
            const storedUserId = localStorage.getItem('userId'); 
            
            if (!storedUserId || storedUserId !== userId) { 
                setAuth(false);
                setLoading(false);
                return;
            }

            const result = await isAuthenticated(userId); 
            setAuth(result);
            setLoading(false);
        };

        checkAuth();
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    return auth ? element : <Navigate to="/login" />;
};



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/:userId/feed" element={<ProtectedRoute element={<Feed />} />} />
                <Route path="/:userId/watch/:videoUserId/:videoTitle" element={<ProtectedRoute element={<Watch />} />} /> {/* ✅ Updated */}
                <Route path="/:userId/upload" element={<ProtectedRoute element={<Upload />} />} />
            </Routes>
        </Router>
    );
};

export default App;

