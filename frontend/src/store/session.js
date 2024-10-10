import { csrfFetch } from "./csrf";

const LOGIN_USER = 'session/LOGIN_USER';
const LOGOUT_USER = 'session/LOGOUT_USER';


export const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        user
    };
};

// * do we pass in user?  (user)
export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
    }
}

// *======== first draft login thunk action ==========
// export const login = (user) => async (dispatch) => {
//     const response = await csrfFetch('/api/session', {
//         method: 'POST',
//         body: JSON.stringify({
//             credential: user.credential,
//             password: user.password
//         })
//     }); 
//     const session = await response.json();
//     dispatch(loginUser(session.user));
//     return session;
// }
// *==================================================

export const login = (credential, password) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        })
    });
    dispatch(loginUser((await res.json()).user));
    return res;
}


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            return { ...state, user: action.user };
        }
        default: 
        return state;
    }
}

export default sessionReducer;