import axios from 'axios';
import store from '../reducer/store';

const login = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/api/token/', { username: username, password: password },
        ).then(response => {
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                localStorage.setItem('username', username);
                localStorage.setItem('loggedIn', true);
                window.location.href = '/main';
            },
        ).catch(error => {
            if (error) {
                console.log('Login Failed!');
                store.dispatch({ type: 'LOGIN', payload: 'FAILED' });
                reject('Login error');
            }
        });
    });
};

const sendQueryUsingTokens = (query) => {
    return new Promise((resolve, reject) => {
        let refreshToken = localStorage.getItem('refresh');
        axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken },
        ).then(response => {
                localStorage.setItem('access', response.data.access);
                let config = { headers: { Authorization: `Bearer ${response.data.access}` } };
                console.log(config);
                axios.post('http://127.0.0.1:8000/ajax_get', query, config).then(data => resolve(data)).catch(error => {
                    reject(error);
                });
            },
        ).catch(error => {
            if (error) {
                console.log('Refresh token error!');
            }
        });
    });
};


export { login, sendQueryUsingTokens };