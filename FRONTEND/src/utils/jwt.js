import axios from 'axios';
import store from '../reducer/store';
import jwt_decode from 'jwt-decode';


const login = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/api/token/', { username: username, password: password },
        ).then(response => {
                resolve({ login: 'SUCCESS', tokens: response.data });
            },
        ).catch(error => {
            if (error) {
                store.dispatch({ type: 'LOGIN', payload: 'FAILED' });
                reject({ login: 'FAILED' });
            }
        });
    });
};

const sendQueryUsingTokens = (view, query) => {
    return new Promise((resolve, reject) => {
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');
        const accessExp = jwt_decode(accessToken).exp;

        const leftAccessTime = Math.floor(accessExp - (Date.now() / 1000));
        if (leftAccessTime > 0) {
            let config = { headers: { Authorization: `Bearer ${accessToken}` } };
            axios.post(`http://127.0.0.1:8000/${view}`, query, config).then(data => resolve(data)).catch(error => {
                reject(error);
            });
        } else {
            axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken },
            ).then(response => {
                    const accessToken = response.data.access;
                    localStorage.setItem('access', accessToken);
                    const config = { headers: { Authorization: `Bearer ${accessToken}` } };
                    axios.post(`http://127.0.0.1:8000/${view}`, query, config).then(data => resolve(data)).catch(error => {
                        reject(error);
                    });
                },
            ).catch(error => {
                if (error) {
                    console.log('Refresh token error!');
                    store.dispatch({ type: 'TOKEN_ERROR' });
                }
            });
        }
    });
};

const getPublishedSurveyData = (id) => {
    const query = { request: 'GET_PUBLISHED_SURVEY', survey_id: id };

    return new Promise((resolve, reject) => {
        axios.post(`http://127.0.0.1:8000/get_published_survey`, query)
            .then(data => resolve(data))
            .catch(error => {
                reject(error);
            });
    });
};


export { login, sendQueryUsingTokens, getPublishedSurveyData };