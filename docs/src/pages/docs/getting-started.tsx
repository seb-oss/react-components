import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@common/Layout";
import { CodeSnippet } from "@common/CodeSnippet";
import { TechStack } from "@common/TechStack";
import "../../styles/getting-started.scss";

const GettingStarted: React.FC = React.memo(() => {
    return (
        <Layout>
            <Helmet>
                <title>Getting Started - SEB React Components</title>
            </Helmet>
            <div className="container">
                <h1 className="pt-5 pb-3">Getting started</h1>
                <h4 className="font-weight-normal">How to get started using SEB React components</h4>

                <h2 className="pt-3 pb-3">Installation</h2>
                <p>First, install the npm package using the following:</p>
                <CodeSnippet showLineNumbers={false} language="properties">
                    npm install @sebgroup/react-components --save
                </CodeSnippet>

                <p>
                    These components uses SEB Bootstrap for styling and relies on its styles, fonts, colors and variables. You will need to install the SEB Bootstrap package as well to get it to work.
                </p>
                <CodeSnippet showLineNumbers={false} language="properties">
                    npm install @sebgroup/bootstrap --save
                </CodeSnippet>

                <p>Then make sure you import SEB Bootstrap in your root styles files:</p>
                <CodeSnippet showLineNumbers={false} language="scss">
                    @import "~@sebgroup/bootstrap/scss/bootstrap";
                </CodeSnippet>

                <hr />

                <section id="technical-stack">
                    <div className="container py-5">
                        <h2 className="mb-5">Technical stack</h2>
                        <TechStack />
                    </div>
                </section>
            </div>
        </Layout>
    );
});

export default GettingStarted;
