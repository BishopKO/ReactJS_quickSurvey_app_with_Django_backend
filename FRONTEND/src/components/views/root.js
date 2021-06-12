import React, { useEffect, useState } from 'react';
import PublishedSurvey from './PublishedSurvey/PublishedSurvey';
import SubmitSuccessPage from './PublishedSurvey/SubmitSuccessPage';
import SurveysList from './SurveysList';
import CreateSurvey from './CreateSurvey';
import EditSurvey from './EditSurvey';
import Survey from './Survey';
import ResultsMainView from './Results/ResultsMainView';
import LoginPage from './LoginPage';
import Registration from './Registration';
import MainTemplate from '../../templates/MainTemplate';
import store from '../../reducer/store';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const Root = () => {
    const ProtectedRoute = ({ component: Component, ...params }) => {
        const authenticated = localStorage.getItem('loggedIn');
        if (authenticated) {
            return (<Route {...params} component={(props) => <Component {...props}/>}/>);
        } else {
            return (<Redirect to={{ pathname: '/login' }}/>);
        }
    };

    return (
        <Provider store={store}>
            <BrowserRouter>
                <MainTemplate>
                    <Switch>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/registration" component={Registration}/>
                        <ProtectedRoute exact path="/list" component={SurveysList}/>
                        <ProtectedRoute exact path="/preview/:id" component={Survey}/>
                        <ProtectedRoute exact path="/create_survey" component={CreateSurvey}/>
                        <ProtectedRoute exact path="/edit/:id" component={EditSurvey}/>
                        <ProtectedRoute exact path="/results/:id" component={ResultsMainView}/>

                        <Route exact path="/survey/:id" component={PublishedSurvey}/>
                        <Route exact path="/survey_success" component={SubmitSuccessPage}/>
                    </Switch>
                </MainTemplate>
            </BrowserRouter>


        </Provider>
    );
};

export default Root;
