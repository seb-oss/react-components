import * as React from "react";
import { SideMenu } from "./common/SideMenu";
import { ContentWrapper } from "./common/ContentWrapper";

const DARK_MODE_STORAGE_KEY: string = "darkmode";

export const Docs: React.FC = () => {
    const [darkMode, setDarkMode] = React.useState<boolean>(JSON.parse(localStorage.getItem(DARK_MODE_STORAGE_KEY)));

    return (
        <div className={"app-container" + (darkMode ? " dark-mode" : "")}>
            <SideMenu
                darkMode={darkMode}
                onDarkModeChanged={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDarkMode(e.target.checked);
                    localStorage.setItem(DARK_MODE_STORAGE_KEY, String(e.target.checked));
                }}
            />
            <ContentWrapper />
        </div>
    );
};
