import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import apiUrls from '@/config/apiUrls';
import CoreUtils from '@/utils/CoreUtils';

const initialAuthState = {
    isAuthenticated: false,
    isInitialized: false,
    token: null
};

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('SITE_DATA_AUTH',JSON.stringify({
            token: accessToken
        }));
    } else {
        localStorage.removeItem('SITE_DATA_AUTH');
    }
};

const handlers = {
    INITIALIZE: (state, action) => {
        const { isAuthenticated, token } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            token
        };
    },
    LOGIN: (state, action) => {
        const { token } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            token
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false
    }),
    REGISTER: (state, action) => {
        const { regOk } = action.payload;

        return {
            ...state,
            isAuthenticated: false
        };
    }
};

const reducer = (state, action) => handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
    ...initialAuthState,
    login: (formData) => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: (username, email, password) => Promise.resolve()
});

export const AuthProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialAuthState);

    useEffect(() => {
                
        /**
         * Initialize
         */
        const initialize = async () => {
            try {
                let user = JSON.parse(localStorage.getItem('SITE_DATA_AUTH'));
                const accessToken = user && user.token ? user.token : null;

                if (accessToken && CoreUtils.return('jwtVerify', accessToken,  CoreUtils.return('JWT_SECRET'))) {
                    setSession(accessToken);

                   
                    // get user information
                    // ...

                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: true,
                            token: accessToken
                        }
                    });
                } else {
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: false,
                            token: null
                        }
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        token: null
                    }
                });
            }
        };

        initialize();
    }, []);

                
    /**
     * Login
     */    
    const login = async (formData) => {

		let url = apiUrls.LOGIN_REQUEST;
        let res = null;

        /**
         * ################################################################
         * for development mode (with `php-express` of Node) _ begin  
         * ################################################################
         */
        if (process.env.NODE_ENV !== "production") {
            url += '?';
            for (let pair of formData.entries()) {
                url += `${pair[0]}=${pair[1]}&`;
            }

            url = url.replace(/^\&|\&$/, '');
        }
        /**
         * ################################################################
         * ... end 
         * ################################################################
         */


        try {
            const response = await axios.post(url, formData);
            const { data, code, error } = response.data;

            // Save user from local storage
            if (code === 200) {

                setSession(data.token);
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        token: data.token
                    }
                });

                // Expiration time for sync with BACKEND
                // ( --> It could be used for different domain request)
                const rememberme = true;
                if (rememberme == true) {
                    CoreUtils.call('setCookie', 'SITE_DATA_LOGIN_COOKIE', data.token, '/', 14);
                } else {
                    CoreUtils.call('setCookie', 'SITE_DATA_LOGIN_COOKIE', data.token, '/', 'Session');
                }


            }

            res = {
                code,
                error
            };


        } catch (err) {

            res = {
                code: -1,
                error: err.toString()
            };
        }

        return res;



    };


	
    /**
     * Register (!!! This feature has not been implemented for demo. )
     */
    const register = async (username, email, password) => {
        let res = null;

        try {
            const response = await axios.post(apiUrls.SIGNUP_REQUEST, {
                username,
                email,
                password
            });
    
            const { data, code, error } = response.data;
            
            dispatch({
                type: 'REGISTER'
            });

            res = {
                code,
                error
            };

        } catch (err) {

            res = {
                code: -1,
                error: err.toString()
            };
        }

        return res;

    };

    /**
     * Remove user from local storage
     */
    const logout = async () => {
        setSession(null);
        dispatch({ type: 'LOGOUT' });
        CoreUtils.call('delCookie', 'SITE_DATA_LOGIN_COOKIE');
    };



    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContext;