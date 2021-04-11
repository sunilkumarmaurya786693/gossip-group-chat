import React, { lazy, Suspense } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Header from './components/shared/Header';
import AuthenticatedRoute from './AuthenticatedRoute';

const Login = lazy(() => import('./containers/Login'));
const Chat = lazy(() => import('./containers/Chat'));
const Register = lazy(() => import('./containers/Register'));

const Routes = () => {
    const location = useLocation();
    console.log('loca', location);
    return (
        <>
            <Header />
            <Suspense fallback={<div> Lazy Loading components </div>}>
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <AuthenticatedRoute path="/" component={Chat} />
                </Switch>
            </Suspense>
        </>
    );
};

export default Routes;
