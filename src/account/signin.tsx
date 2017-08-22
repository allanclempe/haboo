import * as React from "react";
import * as PropTypes from "prop-types";
import { Store, Unsubscribe } from "redux";
import { connect, Dispatch } from "react-redux";
import HabooSdk, { IUserProfile } from "@haboo/haboo-sdk";

import { config } from "../config";
import Menu from "../app/Menu";
import { userDispatcher } from "../flux/actions";
import { IUserState, mapProfileToUserState, userInitialState } from "../flux/stores";

import {
    Button,
    Card,
    Layout,
    FormLayout,
    TextField,
} from "@shopify/polaris";

interface IUserSigninProp {
    login(user: IUserState): void;
}

class Signin extends React.Component<IUserSigninProp, IUserState> {

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
        this.valueUpdater = this.valueUpdater.bind(this);
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
            this.props.login(this.state);
        }
    }

    public valueUpdater(field: any) {
        return (value: any) => this.setState({ [field]: value });
    }

    public render() {

        const { errors, email, password, isFetching } = this.state;

        return (
            <Layout>
                <Layout.AnnotatedSection
                    title="Login"
                    description="User login."
                >
                    <Card sectioned>
                        <FormLayout>
                            <TextField
                                value={email}
                                label="Email"
                                placeholder="example@email.com"
                                onChange={this.valueUpdater("email")}
                            />
                            <TextField
                                value={password}
                                label="Password"
                                placeholder="Password"
                                type="password"
                                onChange={this.valueUpdater("password")}
                            />

                            <div>
                                {Object.keys(errors).map((item, index) => (<div key={index}>{errors[item]}</div>))}
                            </div>

                            <Button primary disabled={isFetching} onClick={this.onsubmit}>Submit</Button>
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection>
            </Layout>);
    }
}

export default connect(null, userDispatcher)(Signin);
