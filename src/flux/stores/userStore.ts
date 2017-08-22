import { createStore, Action } from "redux";
import { IUserProfile } from "@haboo/haboo-sdk";
import { UserAction } from "../actions";
import userSecurity from "../userSecurity";
import { IAction } from "./IAction";

export interface IUserState extends IAction<IUserState> {
    id?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password?: string;
    isAuthenticated: boolean;
}

export const mapProfileToUserState = (state: IUserState, props: IUserProfile) => {
    // tslint:disable-next-line:prefer-object-spread
    return Object.assign(state, {
        firstName: props.firstName,
        lastName: props.lastName,
        email: props.email,
        id: props.id
    });
};

export const userInitialState = {
    email: "demo@node-crm.com",
    password: "demo_password",
    errors: {},
    isFetching: false,
    isAuthenticated: !userSecurity.isExpired(),
};

export const userStore = createStore((state: IUserState = userInitialState, action: any) => {

    switch (action.type) {
        case UserAction.LOGIN_REQUEST:
        case UserAction.LOGIN_SUCCESS:
        case UserAction.LOGIN_ERROR:
        case UserAction.LOGOUT_SUCCESS:
        case UserAction.SIGNUP_REQUEST:
        case UserAction.SIGNUP_ERROR:
        case UserAction.SIGNUP_SUCCESS:
            return { ...state, ...action.data };
        case UserAction.LOGOUT_REQUEST:
            // reseting state
            return { ...userInitialState, ...action.data };
        default:
            return state;
    }
});
