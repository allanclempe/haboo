import HabooSdk from "@haboo/haboo-sdk";
import * as PropTypes from "prop-types";
import * as React from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import * as css from "./Menu.scss";

export default class Menu extends React.Component<{}, {}> {

    public static contextTypes = {
        router: PropTypes.object,
    };

    private router: any;
    constructor(props: any, context: any) {
        super(props, context);
        this.router = this.context.router;
    }

    public componentWillMount() {
    }

    public componentWillUnmount() {
    }

    public navigate(path: any) {
        this.router.history.push(path);
    }

    public render() {
        const menuItems = [
            { label: "Sales", link: "/sales", icon: "credit_card" },
            { label: "Students", link: "/students", icon: "school" },
            { label: "Account", link: "/account", icon: "school" },
            { label: "SignIn", link: "/account/sign-in", icon: "school" },
            { label: "SignUp", link: "/account/sign-up", icon: "school" },
            { label: "Profile", link: "/account/profile", icon: "school" },
            { label: "Settings", link: "/settings", icon: "settings" },
        ].map((item) => {
            return (
                <li key={item.link}>
                    <Link to={item.link}>
                        <i className="material-icons">{item.icon}</i> {item.label}
                    </Link>
                </li>
            );
        });

        return (
            <aside className={css["ui-app-frame__aside"]}>
                <ul>
                    {menuItems}
                </ul>
            </aside>

        );
    }
}
