import { csrfFetch } from "./csrf";

const LOGIN_USER = 'session/LOGIN_USER';
const LOGOUT_USER = 'session/LOGOUT_USER';

/**
 * A User object from the backend DB
 * @typedef { Object } User
 * @property { number } id
 * @property { string } email
 * @property { username } string
 * @property { firstName } string
 * @property { lastName } string
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

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(logoutUser());
        return res.json();
    }
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