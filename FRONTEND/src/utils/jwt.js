import axios from 'axios';
import jwt_decode from 'jwt-decode';

const host = 'http://127.0.0.1:8000';


const login = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post(`${host}/api/token/`, { username: username, password: password },
        ).then(response => {
                resolve({ login: 'SUCCESS', tokens: response.data });
            },
        ).catch(error => {
            if (error) {
                reject({ login: 'FAILED' });
            }
        });
    });
};

const user_register = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post(`${host}/user_register`, {
            username: username,
            password: password,
        })
            .then((response) => resolve(response.data))
            .catch((error) => reject({ ERROR: error.message }));
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
            axios.post(`${host}/${view}`, query, config).then(data => resolve(data)).catch(error => {
                reject(error);
            });
        } else {
            axios.post(`${host}/api/token/refresh/`, { refresh: refreshToken },
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
                    reject({ token: 'error' });
                    localStorage.clear();
                    window.location.href = '/';
                }
            });
        }
    });
};

const getPublishedSurveyData = (id) => {
    const query = { request: 'GET_PUBLISHED_SURVEY', survey_id: id };

    return new Promise((resolve, reject) => {
        axios.post(`${host}/get_published_survey`, query)
            .then(data => resolve(data))
            .catch(error => {
                reject(error);
            });
    });
};

const savePublishedSurveyData = (id, data) => {
    const query = { request: 'SAVE_PUBLISHED_SURVEY', survey_id: id, survey_data: data };

    return new Promise((resolve, reject) => {
        axios.post(`${host}/save_published_survey`, query)
            .then(data => resolve(data))
            .catch(error => {
                reject(error);
            });
    });
};


export { login, user_register, sendQueryUsingTokens, getPublishedSurveyData, savePublishedSurveyData };