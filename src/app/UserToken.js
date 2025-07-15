import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginLk } from '../actions';

const UserToken = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const url = 'https://api.quizforbiz.ru';

    const handleGetToken = async (userID) => {
        try {
            const response = await fetch(`${url}/api/token/${userID}`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}) 
            });
            if (!response.ok) {
                console.error('Fetch failed with status:', response.status); 
                return;
            }
            const data = await response.json();
            dispatch(loginLk(data));
            navigate('/user');
        } catch (error) {       
            console.error("Error occurred:", error); 
        }
    };

    useEffect(() => {
        const currentUrl = window.location.href; 
        const userIdMatch = currentUrl.match(/\/user\/([a-f0-9]+)/);

        if (userIdMatch) {
            const userId = userIdMatch[1]; 
            console.log(userId);
            handleGetToken(userId); 
        } 
    }, []); 

    return (
        <div>UserToken</div>
    );
}

export default UserToken;
