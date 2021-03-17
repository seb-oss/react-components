import React from "react";
import { Dropdown } from "@sebgroup/react-components/Dropdown";
import { withPrefix } from "gatsby-link";
const versions = require("../assets/jsons/versions.json").include;

export interface VersionsDropdownProps {
    className?: string;
}

const VersionsDropdown: React.FC<React.PropsWithChildren<VersionsDropdownProps>> = (props: VersionsDropdownProps) => {
    const [currentVersion, setCurrentVersion] = React.useState<string>("");

    React.useEffect(() => {
        const currentpath: string = window.location.href;
        const regex: RegExp = new RegExp("v(\\d+\\.)(\\d+\\.)(\\d)(-(beta|alpha)(\\.\\d))?", "g");
        const matchedVersions: Array<string> = currentpath.match(regex);
        setCurrentVersion(matchedVersions?.length > 0 ? matchedVersions[0] : versions[0].name);
    }, []);

    return (
        <Dropdown
            className={props.className}
            value={currentVersion}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => (window.location.href = `${window.location.origin}${withPrefix(e.target.value)}/`)}
        >
            {versions.map((item, index: number) => (
                <option key={index} value={item.name}>
                    {item.name}
                </option>
            ))}
        </Dropdown>
    );
};

export default VersionsDropdown;
