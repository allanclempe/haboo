import * as React from "react";
import * as PropTypes from "prop-types";
import { Store, Unsubscribe } from "redux";
import { connect, Dispatch } from "react-redux";
import { IUserProfile } from "@haboo/haboo-sdk";

import { userDispatcher } from "../flux/actions";
import { IUserState, mapProfileToUserState } from "../flux/stores";

import {
    Button,
    Card,
    Layout,
    FormLayout,
    TextField,
    ButtonGroup
} from "@shopify/polaris";

interface IUserProfileProp extends IUserProfile {
    logout(): void;
}

class Profile extends React.Component<IUserProfileProp, IUserState> {
    public static contextTypes = {
        router: PropTypes.object,
        store: PropTypes.object,
    };

    private router: any;
    private store: Store<IUserState>;
    private unsubscribe: Unsubscribe;

    constructor(props: any, context: any) {
        super(props, context);

        this.store = context.store;
        this.router = context.router;
        this.state = this.store.getState();

        this.onlogout = this.onlogout.bind(this);
    }

    public componentWillMount() {
        this.unsubscribe = this.store.subscribe(() => {
            this.setState(this.store.getState());
        });
    }

    public componentDidUpdate() {
        if (!this.state.isAuthenticated) {
            this.router.history.push("/");
        }
    }

    public componentWillUnmount() {
        this.unsubscribe();
    }

    public onlogout() {
        this.props.logout();
    }

    public render() {
        const { firstName, lastName, isFetching } = this.state;
        return (
            <Layout>
                <Layout.AnnotatedSection
                    title="Profile"
                    description="User profile."
                >
                    <Card title="Your account details" sectioned>
                        <p>First Name: {firstName}</p>
                        <p>Last Name: {lastName}</p>
                        <br />
                        <ButtonGroup>
                            <Button destructive disabled={isFetching} onClick={this.onlogout}>Logout</Button>
                        </ButtonGroup>
                    </Card>

                </Layout.AnnotatedSection>
            </Layout>
        );
    }

}

export default connect(mapProfileToUserState, userDispatcher)(Profile);
