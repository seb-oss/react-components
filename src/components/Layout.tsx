import React from "react";
import { SideMenu } from "./SideMenu";
import { Footer } from "./Footer";
import "../styles/docs-wrapper.scss";

const Layout: React.FC = React.memo((props) => {
    return (
        <div className="docs-wrapper">
            <SideMenu />
            <div className="content-wrapper">
                {props.children}
                <Footer />
            </div>
        </div>
    );
});

export default Layout;
