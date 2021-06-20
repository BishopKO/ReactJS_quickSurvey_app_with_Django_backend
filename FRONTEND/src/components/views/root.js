import React, { useEffect, useState } from 'react';
import SubmitSuccessPage from './SubmitSuccessPage';
import SurveysList from './SurveysList';
import CreateSurvey from './CreateSurvey';
import EditSurvey from './EditSurvey';
import Survey from './Survey';
import ResultsMainView from './Results/ResultsMainView';
import LoginPage from './LoginPage';
import Registration from './Registration';
import MainTemplate from '../../templates/MainTemplate';
import PublishedTemplate from '../../templates/PublishedTemplate';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../reducer/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const Root = () => {
    const MainTemplateRoutesWrapper = ({ component: Component, ...params }) => {
        return (
            <MainTemplate>
                <Route {...params} render={(props) => <Component {...props}/>}/>
            </MainTemplate>
        );
    };

    const PublishedSurveyRoutesTemplateWrapper = ({ component: Component, ...params }) => {
        return (
            <PublishedTemplate>
                <Route {...params} render={(props) => <Component {...props}/>}/>
            </PublishedTemplate>
        );
    };

    const ProtectedRoute = ({ component: Component, ...params }) => {
        const authenticated = localStorage.getItem('loggedIn');
        if (authenticated) {
            return (
                <MainTemplate>
                    <Route {...params} render={(props) =>
                        <Component {...props} preview={params.preview}/>}/>
                </MainTemplate>
            );
        } else {
            return (<Redirect to={{ pathname: '/login' }}/>);
        }
    };


    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <ProtectedRoute exact path="/" component={SurveysList}/>
                    <ProtectedRoute exact path="/preview/:id" preview component={Survey}/>
                    <ProtectedRoute exact path="/create_survey" component={CreateSurvey}/>
                    <ProtectedRoute exact path="/edit/:id" component={EditSurvey}/>
                    <ProtectedRoute exact path="/results/:id" component={ResultsMainView}/>

                    <MainTemplateRoutesWrapper exact path="/login" component={LoginPage}/>
                    <MainTemplateRoutesWrapper exact path="/registration" component={Registration}/>


                    <PublishedSurveyRoutesTemplateWrapper exact path="/survey/:id" component={Survey}/>
                    <PublishedSurveyRoutesTemplateWrapper path="/survey_success" component={SubmitSuccessPage}/>
                </Switch>

            </BrowserRouter>


        </Provider>
    );
};

export default Root;
