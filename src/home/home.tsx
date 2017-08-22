import * as React from "react";
import { Layout, EmptyState } from "@shopify/polaris";

export default class Home extends React.Component<{}, {}> {

    public render() {
        return (
            <Layout>
                <EmptyState
                    heading="Work with Haboo"
                    image="http://i.imgur.com/tIeh3wW.png"
                    action={{ content: "Enter", url: "/account/sign-in" }}
                    secondaryAction={{
                        content: "Learn more",
                        url: "http://haboo.org",
                    }}
                >
                    <p>A simple and connected hub for the international education industry.</p>
                </EmptyState>
            </Layout>
        );
    }
}
