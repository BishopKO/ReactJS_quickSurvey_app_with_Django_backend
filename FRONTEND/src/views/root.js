import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import GlobalStyle from '../GlobalStyles/GlobalStyle';
import MainTemplate from './MainRoutingView';
import store from '../reducer/store';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO: {userbame: "test_user"} in localStorage

const Root = () => {
    // TODO: ADD AUTO LOGOUT?
    // const handleClickAndCheckToken = () => {
    //
    // };

    useEffect(() => {
        document.title = 'quickSurvey';
        // document.addEventListener('click', handleClickAndCheckToken);
    });


    return (
        <Provider store={store}>
            <GlobalStyle/>
            <MainTemplate/>
        </Provider>
    );
};

export default Root;
