import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
export default function useAuth() {
    let history = useHistory();
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    const setUserContext = async () => {
        return await axios.get('https://hoodwink.medkomtek.net/api/auth/login').then(res => {
            setUser(res.data.token);
            history.push('/home');
        }).catch((err) => {
            setError(err.response.data);
        })
    }
    //register user
    const registerUser = async (data) => {
        const { username, email, password, passwordConfirm } = data;
        return axios.post(`auth/register`, {
            username, email, password, passwordConfirm
        }).then(async () => {
            await setUserContext();
        }).catch((err) => {
            setError(err.response.data);
        })
    };
    return {
        registerUser,
        error
    }
}