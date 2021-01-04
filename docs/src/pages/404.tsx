import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import "../styles/notfound.scss";

const NotFound: React.FC = React.memo(() => {
    return (
        <div className="notfound container text-center">
            <Helmet>
                <title>Not found - SEB React Components</title>
            </Helmet>
            <img width="80%" src="/404.svg" alt="Page not found" />
            <h1 className="display-4">Page not found</h1>
            <Link className="btn btn-primary" to="/">
                Return Home
            </Link>
        </div>
    );
});

export default NotFound;
