import React from "react";
import Docs from "@common/Docs";
import { Dropdown } from "@sebgroup/react-components/Dropdown";
import { useDynamicForm } from "@hooks/useDynamicForm";
import { CodeSnippet } from "@common/CodeSnippet";

const importString: string = require("!raw-loader!@sebgroup/react-components/Dropdown/Dropdown");
const code: string = `<Dropdown value={value} onChange={e => setValue(e.target.value)}>
    <option value="first">First</option>
    <option value="Second">Second</option>
    <option value="third">Third</option>
</Dropdown>`;

const countries: string[] = [
    "Malaysia",
    "China",
    "Japan",
    "Singapore",
    "Iraq",
    "Kuwait",
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
                    <option key={`item-${i}`} value={country}>
                        {country}
                    </option>
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
                    <option key={`item-${i}`} value={country}>
                        {country}
                    </option>
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
            note={
                <>
                    <h4>Select multiple</h4>
                    <p>
                        The native select element exposes APIs similar to an HTML input element. Passing a value and retrieving a value from the element using the change event is all the same.
                        However, if you are using the dropdown with <code>multiple</code> enabled, the native APIs will change. To get a list of the selected options in a multi-select element, you
                        need to do the following:
                    </p>
                    <CodeSnippet language="typescript">
                        {`function changeHandler(event: React.ChangeEvent<HTMLSelectElement>): void {
    const selectedOptions: string[] = Array.from(event.target.options)
        .filter((option) => option.selected)
        .map((option) => option.value);
    
    setValue(selectedOptions);
}`}
                    </CodeSnippet>

                    <p>This might not be as convenient to work with as the rest of the elements, therefore, we have provided 2 ways of simplifying this interaction</p>
                    <ol>
                        <li>
                            Using <code>onMultipleChange</code>:
                        </li>
                        <p>
                            Dropdown component allows you to pass your setter function to <code>onMultipleChange</code> directly which returns an array of selected options like this:
                        </p>
                        <CodeSnippet language="jsx">{`<Dropdown value={value} onMultipleChange={setValue} multiple>
    <option value="1">First</option>
    <option value="2">Second</option>
    <option value="3">Third</option>
    <option value="4">Fourth</option>
</Dropdown>`}</CodeSnippet>

                        <br />

                        <li>
                            Using <code>getValueOfMultipleSelect</code>
                        </li>
                        <p>
                            We also exported a method <code>getValueOfMultipleSelect</code> for you to use that will just do the extraction of the values for you. This is especially useful if you have
                            a generic <code>changeHandler</code> method. For example:
                        </p>
                        <CodeSnippet language="typescript">{`function genericChangeHandler(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    if (event.target.multiple) { // Dropdowns
        setValue(getValueOfMultipleSelect(event.target));
    } else if (event.target.type === "checkbox") { // Checkboxes
        setValue(event.target.checked);
    } else { // Everything else
        setValue(event.target.value);
    }
}`}</CodeSnippet>
                    </ol>
                </>
            }
        />
    );
};

export default DropdownPage;
