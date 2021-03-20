import React from "react";
import { Dropdown } from "@sebgroup/react-components/Dropdown";
import { withPrefix } from "gatsby-link";
const versions = require("../assets/jsons/versions.json").include;

interface VersionItem {
    name: string;
}
interface FormattedVersionItem {
    value: string;
    label: string;
}

export interface VersionsDropdownProps {
    className?: string;
}

const VersionsDropdown: React.FC<React.PropsWithChildren<VersionsDropdownProps>> = (props: VersionsDropdownProps) => {
    const [currentVersion, setCurrentVersion] = React.useState<string>("");
    const [formattedList, setFormattedList] = React.useState<Array<FormattedVersionItem>>([]);

    const formatList = () => {
        setFormattedList(
            versions?.length > 0
                ? versions.map((item: VersionItem) => ({
                      value: item.name,
                      label: item.name.replace(/[^.]+$/, "x"),
                  }))
                : []
        );
    };

    React.useEffect(() => {
        const currentpath: string = window.location.href;
        const regex: RegExp = new RegExp("v(\\d+\\.)(\\d+\\.)(\\d)(-(beta|alpha)(\\.\\d))?", "g");
        const matchedVersions: Array<string> = currentpath.match(regex);
        setCurrentVersion(matchedVersions?.length > 0 ? matchedVersions[0] : versions[0].name);
        formatList();
    }, []);

    return (
        <Dropdown
            className={props.className}
            value={currentVersion}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => (window.location.href = `${window.location.origin}${withPrefix(e.target.value)}/`)}
        >
            {formattedList.map((item: FormattedVersionItem, index: number) => (
                <option key={index} value={item.value}>
                    {item.label}
                </option>
            ))}
        </Dropdown>
    );
};

export default VersionsDropdown;
