import React from "react";
import { NavLink } from "react-router-dom";

const NotFound: React.FunctionComponent = (): React.ReactElement<void> => {
    return (
        <div className="notfound-container">
            <div className="content">
                <div className="header">404</div>
                <div className="desc">Page not found!</div>
                <div className="link">
                    <NavLink to="/">Return Home</NavLink>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
