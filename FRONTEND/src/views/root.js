import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import GlobalStyle from '../GlobalStyles/GlobalStyle';
import MainTemplate from '../components/MainTemplate/MainTemplate';
import store from '../reducer/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const Root = () => {
    // TODO: ADD AUTO LOGOUT?
    const handleClickAndCheckToken = (params) => {

    };

    useEffect(() => {
        document.title = 'quickSurvey';
        document.addEventListener('click', handleClickAndCheckToken);
    });

    return (
        <Provider store={store}>
            <GlobalStyle/>
            <MainTemplate/>
        </Provider>
    );
};

export default Root;
