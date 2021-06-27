import axios from 'axios';
import jwt_decode from 'jwt-decode';

const { REACT_APP_BACKEND_ADDRESS: host } = process.env;

const login = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post(`${host}/api/token/`, { username: username, password: password },
        ).then(response => {
                resolve({ login: 'SUCCESS', tokens: response.data });
            },
        ).catch(error => {
            console.log(error);
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

const getAccessTokenLeftTime = (accessToken) => {
    const expiry = jwt_decode(accessToken).exp;
    return Math.floor(expiry - (Date.now() / 1000));
};

const getNewAccessToken = (refreshToken) => {
    return new Promise(resolve => {
        axios.post(`${host}/api/token/refresh/`, { refresh: refreshToken },
        ).then(response => {
            const { access } = response.data;
            localStorage.setItem('access', access);
            resolve(access);
        });
    });
};

const sendQuery = (accessToken, view, query, config = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(`${host}/${view}`, query, config)
            .then(response => {
                    if (Object(response.data).hasOwnProperty('BACKEND_ERROR')) {
                        reject({ ERROR: 'Query error...' });
                    } else {
                        resolve(response.data);
                    }
                },
            ).catch(() => reject({ ERROR: 'Query error...' }));
    });
};

const sendQueryUsingTokens = (view, query) => {
    return new Promise(resolve => {
        const { access, refresh } = localStorage;
        if (getAccessTokenLeftTime(access) > 0) {
            let config = { headers: { Authorization: `Bearer ${access}` } };
            sendQuery(`${host}/${view}`, view, query, config).then(data => resolve(data));
        } else {
            getNewAccessToken(refresh).then(accessToken => {
                const config = { headers: { Authorization: `Bearer ${accessToken}` } };
                sendQuery(accessToken, view, query, config).then(data =>
                    resolve(data),
                );
            });
        }
    });
};


const getPublishedSurvey = (id) => {
    const query = { survey_id: id };
    return new Promise((resolve, reject) => {
        axios.post(`${host}/get_published_survey`, query)
            .then(data => resolve(data))
            .catch(error => {
                reject(error);
            });
    });
};

// TODO: Create separate view using jwt
const getPreviewSurveyData = (id) => {
    const query = { request: 'GET_PREVIEW_SURVEY', survey_id: id };

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


export {
    login,
    user_register,
    sendQueryUsingTokens,
    savePublishedSurveyData,
    getPreviewSurveyData,
    getPublishedSurvey,
};