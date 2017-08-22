import { createStore, Action } from "redux";
import { OrganizationAction } from "../actions";
import userSecurity from "../userSecurity";
import { IAction } from "./IAction";

export const organizationStore = createStore((state: any = {}, action: any) => {

    switch (action.type) {
        case OrganizationAction.CREATE_REQUEST:
        case OrganizationAction.CREATE_ERROR:
        case OrganizationAction.CREATE_SUCCESS:
            return { ...state, ...action.data };
        default:
            return state;
    }
});
