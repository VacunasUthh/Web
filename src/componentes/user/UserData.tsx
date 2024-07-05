import { useState, useEffect } from 'react';
import { useAuth } from './../AuthContext';
import { API_URL } from '../../utils/constants';

const useUserData = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API_URL}/users/${localStorage.getItem('email')}`);
                const data = await response.json();
                setUserData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchUserData();
        }
    }, [user]);

    return { userData, loading };
};

export default useUserData;
