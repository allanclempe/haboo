import * as React from "react";
import * as PropTypes from "prop-types";
import { Store, Unsubscribe } from "redux";
import { connect, Dispatch } from "react-redux";
import { IUserProfile } from "@haboo/haboo-sdk";

import { userDispatcher } from "../flux/actions";
import { IUserState, mapProfileToUserState, userInitialState } from "../flux/stores";

import {
    Button,
    Card,
    Layout,
    FormLayout,
    TextField,
    ButtonGroup
} from "@shopify/polaris";

interface IUserSignupProp {
    signup(user: any): void;
}

class Signup extends React.Component<IUserSignupProp, IUserState> {
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
        this.state = userInitialState;

        this.onsubmit = this.onsubmit.bind(this);
    }

    public componentWillMount() {
        this.unsubscribe = this.store.subscribe(() => {
            this.setState(this.store.getState());
        });
    }

    public componentDidUpdate() {
        if (this.state.isAuthenticated) {
            this.router.history.push("/account/profile");
        }
    }

    public componentWillUnmount() {
        this.unsubscribe();
    }

    public isValid() {
        // todo: validator
        return true;
    }

    public onsubmit() {
        if (this.isValid()) {
            this.props.signup(this.state);
        }
    }

    public valueUpdater(field: any) {
        return (value: any) => this.setState({ [field]: value });
    }

    public render() {
        const { firstName, lastName, password, isFetching } = this.state;
        return (
            <Layout>

                <Layout.AnnotatedSection
                    title="Form"
                    description="A sample form using Polaris components."
                >
                    <Card sectioned>
                        <FormLayout>
                            <FormLayout.Group>
                                <TextField
                                    value={this.state.firstName}
                                    label="First Name"
                                    placeholder="Tom"
                                    onChange={this.valueUpdater("firstName")}
                                />
                                <TextField
                                    value={this.state.lastName}
                                    label="Last Name"
                                    placeholder="Ford"
                                    onChange={this.valueUpdater("lastName")}
                                />
                            </FormLayout.Group>

                            <TextField
                                value={this.state.email}
                                label="Email"
                                placeholder="example@email.com"
                                onChange={this.valueUpdater("email")}
                            />

                            <TextField
                                value={this.state.password}
                                label="Password"
                                type="password"
                                placeholder="Password"
                                onChange={this.valueUpdater("password")}
                            />

                            <Button primary onClick={this.onsubmit}>Create my account</Button>
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection>
            </Layout>
        );
    }

}

export default connect(null, userDispatcher)(Signup);
