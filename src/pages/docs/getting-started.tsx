import React from "react";
import { Helmet } from "react-helmet";
import { SideMenu } from "components/SideMenu";
import { Switch, Redirect, Route } from "react-router";
import Layout from "components/Layout";

const GettingStarted: React.FC = React.memo(() => {
    return (
        <Layout>
            <Helmet>
                <title>GettingStarted - SEB React Components</title>
            </Helmet>
            <div>start</div>
        </Layout>
    );
});

export default GettingStarted;
