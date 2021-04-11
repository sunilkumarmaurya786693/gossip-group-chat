import cookie from 'js-cookie';

export const setToken = (token) => {
    cookie.set('user-token', token, {
        expires: 7,
    });
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
};
