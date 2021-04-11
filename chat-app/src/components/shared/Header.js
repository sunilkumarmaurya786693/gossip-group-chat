import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './Header.modules.css';
import { isLoggedIn, removeUserToken, getToken } from '../../utils/tokenUtils';

const Header = () => {
    const history = useHistory();
    const location = useLocation();
    const [authenticatorTitle, setAuthenticatorTitle] = React.useState('Register');

    React.useEffect(() => {
        const path = location.pathname !== '/login' ? 'Login' : 'Register';
        if (isLoggedIn()) {
            setAuthenticatorTitle('Logout');
        } else {
            setAuthenticatorTitle(path);
        }
    }, [getToken(), authenticatorTitle]);

    const handleAuthenticationEvents = () => {
        if (!isLoggedIn()) {
            authenticatorTitle === 'Register' ? history.push('/register') : history.push('/login');
        } else {
            removeUserToken();
            history.push('/login');
        }
    };
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerTitle}>Chat Away</div>
            <div className={styles.authRedirect} onClick={() => handleAuthenticationEvents()}>
                {' '}
                {authenticatorTitle}{' '}
            </div>
        </div>
    );
};

export default Header;
