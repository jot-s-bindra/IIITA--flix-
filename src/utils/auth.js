import axios from 'axios';

export const login = async (uid, pwd, batch) => {
    try {
        const response = await axios.post('http://localhost:5112/api/student/details', {
            uid,
            pwd,
            batch
        }, {
            withCredentials: true 
        });
        return response.data.status === 'success';
    } catch (error) {
        console.error("Login failed:", error);
        return false;
    }
};

export const isAuthenticated = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/auth/verify', {
            withCredentials: true 
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
};



export const logout = async () => {
    try {
        await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
    } catch (error) {
        console.error('Logout failed:', error);
    }
};
