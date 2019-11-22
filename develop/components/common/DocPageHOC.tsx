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

type ActiveProps = { [k: string]: ComponentSpecification<any>["content"] };

export function DocPageHOC<T>({ specifications, component, header, description }: DocPageProps<T>) {
    const [activeProps, setActiveProps] = React.useState<{ [k: string]: any }>({});
    const [componentAPIs, setComponentAPIs] = React.useState<Array<JSX.Element>>([]);

    React.useEffect(() => {
        setActiveProps(generateActiveProps());
    }, [specifications]);

    const generateActiveProps = (): ActiveProps => {
        const newActiveProps: ActiveProps = {};

        for (const specName in specifications) {
            const spec = specifications[specName];
            if (Array.isArray(spec.content)) {
                newActiveProps[specName] = spec.content[0];
            } else {
                newActiveProps[specName] = spec.content;
            }
            if (spec.defaultValue !== undefined) {
                newActiveProps[specName] = spec.defaultValue;
            }
        }

        return newActiveProps;
    };

    React.useEffect(() => {
        setComponentAPIs(generateApisFromSpecs());
    }, [activeProps]);

    const generateApisFromSpecs = (): Array<JSX.Element> => {
        const output: Array<JSX.Element> = [];
        let i: number = 0;
        for (const specName in specifications) {
            const spec = specifications[specName];
            output.push(
                <tr key={i}>
                    <td>{specName}</td>
                    <td><code>{spec.type}</code></td>
                    <td>{spec.description}</td>
                    <td>{getValueControlType(spec, specName)}</td>
                </tr>
            );
            i++;
        }
        return output;
    };

    const getValueControlType = (spec: ComponentSpecification<T[keyof T]>, name: string): React.ReactNode => {
        let output: React.ReactNode = "";
        if (Array.isArray(spec.content)) {
            if (typeof spec.content[0] === "boolean" && typeof spec.content[1] === "boolean") {
                output = <CheckBox
                    name={name}
                    checked={!!activeProps[name]}
                    onChange={() => setActiveProps((ap) => {
                        return { ...ap, [name]: !ap[name]};
                    })}
                />;
            } else if (spec.content.length) {
                const dropdownList: Array<DropdownItem> = [];
                spec.content.map((value: any) => {
                    dropdownList.push({ label: String(value), value: value });
                });
                output = <Dropdown
                    name={name}
                    selectedValue={{ label: activeProps[name], value: activeProps[name]}}
                    onChange={(value: DropdownItem) => setActiveProps((ap) => {
                        return { ...ap, [name]: value.value};
                    })}
                    list={dropdownList}
                />;
            }
        } else {
            if (React.isValidElement(spec.content)) {
                output = <CheckBox
                    name={name}
                    id={"feature-toggle-" + name}
                    checked={!!activeProps[name]}
                    onChange={() => setActiveProps((ap) => {
                        return { ...ap, [name]: !activeProps[name] ? specifications[name].content : null };
                    })}
                />;
            }
        }
        return output;
    };

    const renderComponent = (Comp: React.ComponentType, props: ActiveProps) => {
        return (
            <Comp {...props} />
        );
    };

    return (
        <section className="doc-page">
            <h1>{header}</h1>
            <p>{description}</p>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <h4>Playground</h4>
                        <div className="output">
                            {renderComponent(component, activeProps)}
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
