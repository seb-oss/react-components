import React from "react";
import { SideMenu } from "./SideMenu";
import { Footer } from "./Footer";
import classnames from "classnames";
import "../styles/docs-wrapper.scss";

const Layout: React.FC<JSX.IntrinsicElements["div"]> = React.memo(({ children, ...props }) => {
    return (
        <div {...props} className={classnames("docs-wrapper", props.className)}>
            <SideMenu />
            <div className="content-wrapper">
                {children}
                <Footer />
            </div>
        </div>
    );
});

export default Layout;
