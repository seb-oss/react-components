import React from "react";
import { Collapse } from "@sebgroup/react-components/Collapse";
import { Link } from "gatsby";
import { urls } from "@configs";
import { useIsMobile } from "@hooks/useIsMobile";
import ExternalLinkIcon from "../../static/icons/external-link.svg";
import VersionsDropdown from "./VersionsDropdown";
import "../styles/navbar.scss";

export const Navbar: React.FC = React.memo(() => {
    const [toggle, setToggle] = React.useState<boolean>(false);
    const isMobile = useIsMobile();

    return (
        <header>
            <nav className="navbar navbar-dark navbar-expand-md">
                <div className="navbar-brand">SEB React Components</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={() => setToggle(!toggle)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-content">
                    <div className="navbar-collapse">
                        {isMobile ? (
                            <Collapse toggle={toggle}>
                                <Navs />
                            </Collapse>
                        ) : (
                            <Navs />
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
});

const Navs: React.FC = React.memo(() => (
    <ul className="nav nav-dark">
        <li className="nav-item">
            <div className="nav-link">
                <VersionsDropdown />
            </div>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/docs">
                Docs
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" target="_blank" rel="noreferrer noopener nofollow" to={urls.releases}>
                Release notes
                <ExternalLinkIcon className="align-icon-with-text" />
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" target="_blank" rel="noreferrer noopener nofollow" to={urls.github}>
                Github
                <ExternalLinkIcon className="align-icon-with-text" />
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" target="_blank" rel="noreferrer noopener nofollow" to={urls.contribute}>
                Contribute
                <ExternalLinkIcon className="align-icon-with-text" />
            </Link>
        </li>
    </ul>
));
