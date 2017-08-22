import { Dispatch } from "react-redux";
import sdk from "../habooProvider";
import { } from "../stores";
import { ErrorResponse } from "@haboo/haboo-sdk";
import userSecurity from "../userSecurity";

export enum OrganizationAction {
    CREATE_REQUEST,
    CREATE_ERROR,
    CREATE_SUCCESS,
    FETCH_REQUEST,
    FETCH_ERROR,
    FETCH_SUCCESS
}

const createRequest = () => {
    return {
        type: OrganizationAction.CREATE_REQUEST,
        data: {
            isFetching: true
        }
    };
};

const createSuccess = (organization: any) => {
    return {
        type: OrganizationAction.CREATE_SUCCESS,
        data: {
            isFetching: false,
            ...organization
        }
    };
};

const createError = (errors: any) => {
    return {
        type: OrganizationAction.CREATE_ERROR,
        data: {
            isFetching: false,
            errors
        }
    };
};

export const organizationDispatcher = (dispatch: Dispatch<any>) => ({
    create: (state: any) => {

        dispatch(createRequest());

        return sdk.createOrganization(state.organization).then((data: any) => {
            return dispatch(createSuccess(data));
        })
        .catch(async (ex: ErrorResponse) => dispatch(createError(await ex.response.json())));

    }
});
