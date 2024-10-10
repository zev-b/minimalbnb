import { csrfFetch } from "./csrf";

const LOGIN_USER = 'session/loginUser';
const LOGOUT_USER = 'session/logoutUser';

/**
 * A User object from the backend DB
 * @typedef { Object } User
 * @property { number } id
 * @property { string } email
 * @property { username } string
 * @property { firstName } string
 * @property { lastName } string
 */

/**
 * 
 * @typedef { Object } UserWithPassProperties 
 * @property { string } password
 * @typedef { User & UserWithPassProperties } UserWithPassword
 */

export const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        user
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
    }
};


/**
 * Send a request to the login endpoint on the backend
 * @param {{ credential: string, password: string }} userLogin The username/email and password for the user
 * @returns { User } The user object returned from the backend
 */
export const login = ({ credential, password }) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        })
    });

    if (res.ok) {
        const user = (await res.json()).user;
        dispatch(loginUser(user));
    
        return user;
    }
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(loginUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(logoutUser());
        return res.json();
    }
};

/**
 * Send a request to the signup endpoint on the backend
 * @param { UserWithPassword } user The username/email/... and password for the user
 * @returns { User } The user object returned from the backend when signup
 */
export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password
      })
    });
    const data = await response.json();
    dispatch(loginUser(data.user));
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            return { ...state, user: action.user };
        }
        case LOGOUT_USER: {
            return { ...state, user: null };
        }
        default: 
        return state;
    }
}

export default sessionReducer;