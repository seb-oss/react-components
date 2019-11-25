import * as React from "react";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import { DropdownItem, Dropdown } from "../../../src/Dropdown/Dropdown";

interface ComponentSpecification<K> {
    type: string;
    description: string;
    defaultValue?: K;
    content?: K | Array<K>;
}

type ComponentSpecs<T> = { [K in keyof T]-?: ComponentSpecification<T[K]>; };

type DocPageProps<T> = {
    header: string;
    description: string;
    component: React.ComponentType<T>;
    specifications: ComponentSpecs<T>;
};

type ComponentProps = { [k: string]: ComponentSpecification<any>["content"] };

function DocPage<T>(props: DocPageProps<T>): JSX.Element {
    const [componentProps, setComponentProps] = React.useState<{ [k: string]: any }>({});
    const [componentAPIs, setComponentAPIs] = React.useState<Array<JSX.Element>>([]);

    React.useEffect(() => setComponentProps(generateComponentProps()), [props.specifications]);
    React.useEffect(() => setComponentAPIs(generateApisFromSpecs()), [componentProps]);

    /** Generates the component's props */
    const generateComponentProps = React.useCallback((): ComponentProps => {
        const newProps: ComponentProps = {};

        for (const specName in props.specifications) {
            const spec = props.specifications[specName];
            if (spec.defaultValue !== undefined) {
                newProps[specName] = spec.defaultValue;
            } else if (Array.isArray(spec.content)) {
                newProps[specName] = spec.content[0];
            } else {
                newProps[specName] = spec.content;
            }
        }

        return newProps;
    }, [props.specifications]);

    /**
     * Handles form element changes
     * @param e The change event
     * @param name The name of the dropdown element changed
     */
    const onFormChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement> | DropdownItem, name?: string): void => {
        if ((e as React.ChangeEvent<HTMLInputElement>).target) {
            const event: React.ChangeEvent<HTMLInputElement> = e as React.ChangeEvent<HTMLInputElement>;
            if (event.target.type === "checkbox") {
                if (event.target.id.search("feature-toggle") !== -1) {
                    setComponentProps({
                        ...componentProps,
                        [event.target.name]: componentProps[event.target.name]
                            ? null
                            : (props.specifications[event.target.name] as ComponentSpecification<any>).content
                    });
                } else {
                    setComponentProps({ ...componentProps, [event.target.name]: event.target.checked });
                }
            } else {
                setComponentProps({ ...componentProps, [event.target.name]: event.target.value });
            }
        } else if ((e as DropdownItem & object).hasOwnProperty("label") && (e as DropdownItem & object).hasOwnProperty("value")) {
            const dropdownValue: DropdownItem = e as DropdownItem;
            setComponentProps({ ...componentProps, [name]: dropdownValue.value });
        }
    }, [setComponentProps, componentProps]);

    /**
     * Get the control element that will be rendered in the APIs table under `Try it`
     * @param spec The single specification to be inspected
     * @param name The name of the form element
     * @returns The control element as a React node
     */
    const getValueControlType = React.useCallback((spec: ComponentSpecification<T[keyof T]>, name: string): React.ReactNode => {
        let output: React.ReactNode = "";
        if (Array.isArray(spec.content)) {
            if (typeof spec.content[0] === "boolean" && typeof spec.content[1] === "boolean") {
                output = <CheckBox name={name} checked={!!componentProps[name]} onChange={onFormChange} />;
            } else if (spec.content.length) {
                const dropdownList: Array<DropdownItem> = [];
                spec.content.map((value: any) => {
                    dropdownList.push({ label: String(value), value: value });
                });
                output = <Dropdown
                    name={name}
                    selectedValue={{ label: componentProps[name], value: componentProps[name] }}
                    onChange={(val: DropdownItem) => onFormChange(val, name)}
                    list={dropdownList}
                />;
            }
        } else {
            if (React.isValidElement(spec.content)) {
                output = <CheckBox name={name} id={"feature-toggle-" + name} checked={!!componentProps[name]} onChange={onFormChange} />;
            }
        }
        return output;
    }, [setComponentProps, componentProps, props.specifications]);

    /**
     * Generates the APIs table using the specifications
     * @returns The table rows as an array of `JSX elements`
     */
    const generateApisFromSpecs = React.useCallback((): Array<JSX.Element> => {
        const output: Array<JSX.Element> = [];
        for (const specName in props.specifications) {
            const spec: ComponentSpecification<any> = props.specifications[specName];
            output.push(
                <tr key={specName}>
                    <td>{specName}</td>
                    <td><code>{spec.type}</code></td>
                    <td>{spec.description}</td>
                    <td>{getValueControlType(spec, specName)}</td>
                </tr>
            );
        }
        return output;
    }, [props.specifications, getValueControlType]);

    return (
        <section className="doc-page">
            <h1>{props.header}</h1>
            <p>{props.description}</p>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <h4>Playground</h4>
                        <div className="output">
                            <props.component {...componentProps as any} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <h4>APIs</h4>
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Propery</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th>Try it</th>
                                </tr>
                            </thead>
                            <tbody>
                                {componentAPIs}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export { DocPage };
