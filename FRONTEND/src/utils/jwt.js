import axios from 'axios';
import jwt_decode from 'jwt-decode';

const { REACT_APP_BACKEND_ADDRESS: host } = process.env;

const returnHeaders = () => {
    const accessToken = localStorage.getItem('access');
    return { headers: { Authorization: `Bearer ${accessToken}` } };
};


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
            .then((response) => {
                    if (response.data.response === 'SUCCESS') {
                        resolve('SUCCESS');
                    } else {
                        resolve('FAIL');
                    }
                },
            )
            .catch((error) => reject('BACKEND ERROR'));
    });
};


const checkAccessToken = async () => {
    const { access, refresh } = localStorage;
    const { exp, user_id } = jwt_decode(access);

    if (Math.floor(exp - (Date.now() / 1000)) <= 10) {
        const response = await axios.post(`${host}/api/token/refresh/`, { refresh: refresh });
        localStorage.setItem('access', response.data.access);
    }
    return user_id;
};


const getSurveysList = async () => {
    await checkAccessToken();
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem('access')}` } };
    const response = await axios.get(`${host}/api/survey`, config);
    return response.data;
};


const createNewSurvey = async ({ survey_title, data }) => {
    const userId = await checkAccessToken();
    const postData = { survey_title: survey_title || 'Default title', data: JSON.stringify(data), owner: userId };
    return await axios.post(`${host}/api/survey/`, postData, returnHeaders());
};


const activateSurvey = async (id, isActive) => {
    const userId = await checkAccessToken();
    const patchData = { user_id: userId, isActive: isActive };
    return await axios.patch(`${host}/api/survey/${id}/`, patchData, returnHeaders());
};


const deleteSurvey = async (id) => {
    const userId = await checkAccessToken();
    return await axios.delete(`${host}/api/survey/${id}/`, returnHeaders());
};


const getSurveyData = async (id) => {
    const { data } = await axios.get(`${host}/api/survey/${id}`, returnHeaders());
    return data;
};


const getSurveyResults = async () => {
    const results = await axios.get(`${host}/survey_results`);
};


const getPublishedSurvey = async (id) => {
    const { data } = await axios.get(`${host}/api/published/${id}`);
    return data;
};


const saveSurveyResults = async (id, data) => {
    const postData = { survey_id: id, data: JSON.stringify(data) };
    return await axios.post(`${host}/api/answers/`, postData);
};

export {
    login,
    user_register,
    activateSurvey,
    saveSurveyResults,
    getSurveyData,
    getPublishedSurvey,
    createNewSurvey,
    checkAccessToken,
    getSurveysList,
    deleteSurvey,
};