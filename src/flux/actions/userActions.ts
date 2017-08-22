import { Dispatch } from "react-redux";
import sdk from "../habooProvider";
import { IUserState } from "../stores";
import { ErrorResponse, IUserProfile } from "@haboo/haboo-sdk";
import userSecurity from "../userSecurity";

export enum UserAction {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR
}

const loginRequest = (user: IUserState) => {
    return {
        type: UserAction.LOGIN_REQUEST,
        data: {
            isFetching: true,
            isAuthenticated: false,
            errors: {},
            email: user.email,
            password: user.password
        }
    };
};

const loginSuccess = (user: IUserProfile) => {
    return {
        type: UserAction.LOGIN_SUCCESS,
        data: {
            isFetching: false,
            isAuthenticated: true,
            errors: {},
            password: "",
            ...user
        }
    };
};

const loginError = (errors: any) => {
    return {
        type: UserAction.LOGIN_ERROR,
        data: {
            isFetching: false,
            isAuthenticated: false,
            errors,
            password: ""
        }
    };
};

const logoutRequest = () => {
    return {
        type: UserAction.LOGOUT_REQUEST,
        data: {
            isFetching: true
        }
    };
};

const logoutSuccess = () => {
    return {
        type: UserAction.LOGOUT_SUCCESS,
        data: {
            isFetching: false,
            isAuthenticated: false
        }
    };
};

const signupRequest = (user: IUserState) => {
    return {
        type: UserAction.SIGNUP_REQUEST,
        data: {
            isAuthenticated: false,
            isFetching: true,
            ...user
        }
    };
};

const signupSuccess = (user: IUserState) => {
    return {
        type: UserAction.SIGNUP_REQUEST,
        data: {
            isFetching: false,
            isAuthenticated: true,
            ...user
        }
    };
};

const signupError = (errors: any) => {
    return {
        type: UserAction.LOGIN_ERROR,
        data: {
            isFetching: false,
            isAuthenticated: false,
            errors
        }
    };
};

export const userDispatcher = (dispatch: Dispatch<any>) => ({
    login: (user: IUserState) => {

        dispatch(loginRequest(user));

        return sdk.signin(user.email, user.password).then((data: any) => {

            userSecurity.set(data.token);
            const userProfile = userSecurity.getProfile();

            return dispatch(loginSuccess(userProfile));
        })
            .catch(async (ex: ErrorResponse) => dispatch(loginError(await ex.response.json())));

    },
    logout: () => {

        dispatch(logoutRequest());

        userSecurity.del();

        dispatch(logoutSuccess());

    },
    signup: (user: IUserState) => {

        dispatch(signupRequest(user));

        return sdk.signup(user).then((newUser: any) => {

            userSecurity.set(newUser.token);

            return dispatch(signupSuccess(newUser));
        }).catch(async (ex: ErrorResponse) => dispatch(signupError(await ex.response.json())));

    }
});
