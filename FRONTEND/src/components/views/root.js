import React, { useEffect, useState } from 'react'
import PublishedSurvey from './PublishedSurvey/PublishedSurvey'
import SubmitSuccessPage from './PublishedSurvey/SubmitSuccessPage'
import SurveysList from '../Organisms/SurveysList'
import CreateSurvey from './CreateSurvey'
import EditSurvey from './EditSurvey'
import PreviewSurvey from './PreviewSurvey'
import ResultsMainView from './Results/ResultsMainView'
import LoginPage from './LoginPage'
import Registration from './Registration'
import MainTemplate from '../../templates/MainTemplate'
import store from '../../reducer/store'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

const Root = () => {
    const location_pathname = window.location.pathname
    const [loggedIn] = useState(localStorage.getItem('loggedIn'))

    useEffect(() => {
        document.title = 'quickSurvey'
    })


    if (location_pathname.includes('/survey')) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/survey/:id" component={PublishedSurvey}/>
                </Switch>
                <Switch>
                    <Route exact path="/survey_success" component={SubmitSuccessPage}/>
                </Switch>
            </BrowserRouter>
        )
    } else {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <MainTemplate>
                        <Switch>
                            {loggedIn ?
                                <>
                                    <Route exact path="/list">
                                        <SurveysList/>
                                    </Route>
                                    <Route exact path="/create_survey">
                                        <CreateSurvey/>
                                    </Route>
                                    <Route exact path="/edit/:id">
                                        <EditSurvey/>
                                    </Route>
                                    <Route exact path="/preview/:id">
                                        <PreviewSurvey/>
                                    </Route>
                                    <Route exact path="/results/:id">
                                        <ResultsMainView/>
                                    </Route>
                                </>
                                :
                                <>
                                    <Route exact path="/login">
                                        <LoginPage/>
                                    </Route>
                                    <Route exact path="/registration">
                                        <Registration/>
                                    </Route>
                                </>
                            }
                        </Switch>
                        {!loggedIn && <Redirect to="/login"/>}
                    </MainTemplate>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default Root
