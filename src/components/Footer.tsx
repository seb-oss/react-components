import React from "react";
import "../styles/footer.scss";

export const Footer: React.FC = React.memo(() => {
    return (
        <footer className="container">
            <nav className="navbar">
                <div className="navbar-brand">
                    Developed with ❤️ by <a href="https://seb.se" target="_blank" rel="noreferrer noopener nofollow"></a>
                </div>
                <div className="navbar-text">
                    <a href="https://www.npmjs.com/package/@sebgroup/ng-components/" target="_blank" rel="noreferrer noopener nofollow" title="View in npm">
                        <img src="https://img.shields.io/npm/v/@sebgroup/react-components" alt="npm version" />
                    </a>
                </div>
            </nav>
        </footer>
    );
});
