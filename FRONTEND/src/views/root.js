import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import CustomNavbar from '../components/Navbar/Navbar';
import LoginPage from '../views/LoginPage';
import Registration from '../views/Registration';
import Main from '../views/Main';
import CreateSurvey from '../components/CreateSurvey/CreateSurvey';
import SurveysList from '../components/SurveysList/SurveysList';

import Container from 'react-bootstrap/Container';
import store from '../reducer/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const Root = () => {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));

    useEffect(() => {
        document.title = 'quickSurvey';
        setLoggedIn(localStorage.getItem('loggedIn'));
    });

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Container>
                    <CustomNavbar/>
                    <Switch>
                        <Route path="/login">
                            <LoginPage/>
                        </Route>
                        <Route path="/registration">
                            <Registration/>
                        </Route>
                        {loggedIn ?
                            <>
                                <Route path="/main">
                                    <Main/>
                                </Route>
                                <Route path="/list">
                                    <SurveysList/>
                                </Route>
                                <Route path="/create_survey">
                                    <CreateSurvey/>
                                </Route>
                            </>
                            :
                            <Route>
                                <LoginPage/>
                            </Route>
                        }
                    </Switch>
                </Container>
            </BrowserRouter>
        </Provider>
    );
};

export default Root;
