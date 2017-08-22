import * as React from "react";
import * as PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Layout, EmptyState, FooterHelp, AccountConnection, Link as PrettyLink } from "@shopify/polaris";
import { userStore, IUserState } from "../flux/stores";
import SignIn from "./signin";
import SignUp from "./signup";
import Profile from "./Profile";
import userSecurity from "../flux/userSecurity";

export default class Account extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        const { } = this.state;

        return (
            <Provider store={userStore}>
                <div>
                    <Route path="/account/sign-in" component={SignIn} />
                    <Route path="/account/sign-up" component={SignUp} />
                    <Route path="/account/profile" render={() => {
                        return (<Profile  {...userSecurity.getProfile() } />);
                    }} />
                </div>
            </Provider>
        );
    }
}
