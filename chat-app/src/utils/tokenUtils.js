import cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
export const setToken = (token) => {
    const userDetails = jwtDecode(token);
    const { _id, user_name, email } = userDetails;
    cookie.set('user-token', token, { expires: 7 });
    cookie.set('user-id', _id, { expires: 7 });
    cookie.set('user-name', user_name, { expires: 7 });
    cookie.set('user-email', email, { expires: 7 });

    console.log('this is token', cookie.get('user-name'));
};

export const getToken = () => {
    return cookie.get('user-token');
};

export const isLoggedIn = () => {
    const token = getToken();
    return !!token;
};

export const removeUserToken = () => {
    cookie.remove('user-token');
    cookie.remove('user-id');
    cookie.remove('user-name');
    cookie.remove('user-email');
};
