import React from "react";
import Docs from "@common/Docs";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/Dropdown";
import { useDynamicForm } from "@hooks/useDynamicForm";

const importString: string = require("!raw-loader!@sebgroup/react-components/Dropdown/Dropdown");
const code: string = `<Dropdown value={value} onChange={e => setValue(e.target.value)}>
    <DropdownItem value="first">First</DropdownItem>
    <DropdownItem value="Second">Second</DropdownItem>
    <DropdownItem value="third">Third</DropdownItem>
</Dropdown>`;

const countries: string[] = [
    "Malaysia",
    "China",
    "Japan",
    "Singapore",
    "Iraq",
    "Morocco",
    "Iran",
    "Jordan",
    "Slovenia",
    "Germany",
    "France",
    "Spain",
    "Nicaragua",
    "Ecuador",
    "Brazil",
    "Argentina",
    "Guinea",
    "Nigeria",
    "Morocco",
    "Tanzania",
];

const regions: string[] = ["Asia", "Middle east", "Europe", "South America", "Africa"];

const DropdownPage: React.FC = (): React.ReactElement<void> => {
    const [value, setValue] = React.useState<string>();
    const [multiValue, setMultiValue] = React.useState<string[]>([]);
    const [list, setList] = React.useState<React.ReactElement[]>([]);

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "multiple", label: "multiple", controlType: "Checkbox", value: false },
                { key: "searchable", label: "searchable", controlType: "Checkbox", value: false },
                { key: "clearable", label: "clearable", controlType: "Checkbox", value: false },
                { key: "disabled", label: "disabled", controlType: "Checkbox", value: false },
                { key: "useGroups", label: "Render in groups", description: "Wrap dropdown items with optgroup to group them", controlType: "Checkbox", value: false },
                { key: "useDividers", label: "Add dividers", description: "Dividers are added using div with className dropdown-divider", controlType: "Checkbox", value: false },
            ],
        },
    ]);

    React.useEffect(() => {
        const newList: React.ReactElement[] = [];
        if (controls.useGroups) {
            let group: React.ReactElement[] = [];
            countries.forEach((country: string, i: number) => {
                group.push(
                    <DropdownItem key={`item-${i}`} value={country}>
                        {country}
                    </DropdownItem>
                );
                if (Math.round((i + 1) / 4) === (i + 1) / 4) {
                    newList.push(
                        <optgroup key={`group-${i}`} label={regions[Math.floor(i / 4)]}>
                            {[...group]}
                        </optgroup>
                    );
                    controls.useDividers && newList.push(<div key={`divider-${i}`} className="dropdown-divider" />);
                    group = [];
                }
            });
        } else {
            countries.forEach((country: string, i: number) => {
                newList.push(
                    <DropdownItem key={`item-${i}`} value={country}>
                        {country}
                    </DropdownItem>
                );
                if (controls.useDividers && Math.round((i + 1) / 4) === (i + 1) / 4) {
                    newList.push(<div key={`divider-${i}`} className="dropdown-divider" />);
                }
            });
        }
        setList(newList);
    }, [controls.useGroups, controls.useDividers]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100">
                    <Dropdown
                        value={controls.multiple ? multiValue : value}
                        onChange={controls.multiple ? null : (e) => setValue(e.target.value)}
                        onMultipleChange={setMultiValue}
                        placeholder="Select..."
                        multiple={controls.multiple}
                        searchable={controls.searchable}
                        clearable={controls.clearable}
                        disabled={controls.disabled}
                    >
                        {list}
                    </Dropdown>
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default DropdownPage;
