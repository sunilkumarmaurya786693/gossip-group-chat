import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Header.modules.css';
import { isLoggedIn, removeUserToken, getToken } from '../../utils/tokenUtils';

const Header = () => {
    const history = useHistory();
    const [authenticatorTitle, setAuthenticatorTitle] = React.useState('Register');

    React.useEffect(() => {
        if (isLoggedIn()) {
            setAuthenticatorTitle('Logout');
        } else {
            setAuthenticatorTitle('Register');
        }
    }, [getToken()]);

    const handleAuthenticationEvents = () => {
        if (!isLoggedIn()) {
            history.push('/register');
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
