import React from 'react';
import { useHistory, Route } from 'react-router-dom';
import { isLoggedIn } from './utils/tokenUtils';

const AuthenticatedRoute = (props) => {
    const history = useHistory();

    React.useEffect(() => {
        if (!isLoggedIn()) {
            history.push('/login');
        }
    }, []);

    return <Route {...props} />;
};

export default AuthenticatedRoute;
