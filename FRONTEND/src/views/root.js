import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import CustomNavbar from '../components/Navbar/Navbar';
import LoginPage from '../views/LoginPage';
import Registration from '../views/Registration';
import Main from '../views/Main';
import CreateSurvey from '../components/CreateSurvey/CreateSurvey';
import Container from 'react-bootstrap/Container';
import store from '../reducer/store';
import 'bootstrap/dist/css/bootstrap.min.css';

// Functions:
// - Send username and password to receive tokens/save in localStorage,
// - send refresh token and send request,
// - if unable to refresh token then logout and clear localStorage

const Root = () => {
    useEffect(() => {
        document.title = 'quickSurvey';
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
                        <Route path="/main">
                            <Main/>
                        </Route>
                        <Route path="/">
                            <CreateSurvey/>
                        </Route>
                    </Switch>
                </Container>
            </BrowserRouter>
        </Provider>
    );
};

export default Root;
