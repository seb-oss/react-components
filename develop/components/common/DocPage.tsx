import * as React from "react";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import { DropdownItem, Dropdown } from "../../../src/Dropdown/Dropdown";
import { ClassStorage } from "../../utils/ClassStorage";

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

type DocPageState<T> = {
    componentProps: T;
    componentAPIs: Array<JSX.Element>;
};

export class DocPage<T> extends React.Component<DocPageProps<T>, DocPageState<T>> {
    private storage: ClassStorage = new ClassStorage();
    constructor(props: DocPageProps<T>) {
        super(props);

        const componentProps: T = {} as unknown as any;

        for (const prop in this.props.specifications) {
            if (Array.isArray(this.props.specifications[prop].content)) {
                componentProps[prop] = this.props.specifications[prop].content[0];
            } else {
                if (React.isValidElement(this.props.specifications[prop].content)) {
                    this.storage.setItem(prop, this.props.specifications[prop].content);
                }
                componentProps[prop] = this.props.specifications[prop].content as any;
            }
            if (this.props.specifications[prop].defaultValue !== undefined) {
                componentProps[prop] = this.props.specifications[prop].defaultValue;
            }
        }

        this.state = {
            componentProps,
            componentAPIs: []
        };
    }

    generateDocumentation = (): Array<JSX.Element> => {
        const output: Array<JSX.Element> = [];
        const { specifications } = this.props;
        let i: number = 0;
        for (const prop in specifications) {
            output.push(
                <tr key={i}>
                    <td>{prop}</td>
                    <td><code>{specifications[prop].type}</code></td>
                    <td>{specifications[prop].description}</td>
                    <td>{this.getValueControlType(specifications[prop], prop)}</td>
                </tr>
            );
            i++;
        }
        return output;
    }

    getValueControlType = (spec: ComponentSpecification<T[any]>, name: string): React.ReactNode => {
        let output: React.ReactNode = "";
        if (Array.isArray(spec.content)) {
            if (typeof spec.content[0] === "boolean" && typeof spec.content[1] === "boolean") {
                output = <CheckBox
                    name={name}
                    checked={this.state.componentProps[name]}
                    onChange={this.onFormChange}
                />;
            } else if (spec.content.length) {
                const dropdownList: Array<DropdownItem> = [];
                spec.content.map((value: any) => {
                    dropdownList.push({ label: String(value), value: value });
                });
                output = <Dropdown
                    name={name}
                    selectedValue={{ label: this.state.componentProps[name], value: this.state.componentProps[name] }}
                    onChange={(value: DropdownItem) => this.onFormChange(value, name)}
                    list={dropdownList}
                />;
            }
        } else {
            if (React.isValidElement(spec.content)) {
                output = <CheckBox
                    name={name}
                    id={"feature-toggle-" + name}
                    checked={!!this.state.componentProps[name]}
                    onChange={this.onFormChange}
                />;
            }
        }
        return output;
    }

    onFormChange = (e: React.ChangeEvent<HTMLInputElement> | DropdownItem, name?: string): void => {
        if ((e as React.ChangeEvent<HTMLInputElement>).target) {
            const event: React.ChangeEvent<HTMLInputElement> = e as React.ChangeEvent<HTMLInputElement>;
            if (event.target.type === "checkbox") {
                if (event.target.id.search("feature-toggle") !== -1) {
                    this.setState({
                        componentProps: {
                            ...this.state.componentProps,
                            [event.target.name]: this.state.componentProps[event.target.name]
                                ? null
                                : this.storage.getItem(event.target.name)
                        }
                    });
                } else {
                    this.setState({ componentProps: { ...this.state.componentProps, [event.target.name]: event.target.checked } });
                }
            } else {
                this.setState({ componentProps: { ...this.state.componentProps, [event.target.name]: event.target.value } });
            }
        } else if ((e as DropdownItem & object).hasOwnProperty("label") && (e as DropdownItem & object).hasOwnProperty("value")) {
            const dropdownValue: DropdownItem = e as DropdownItem;
            this.setState({ componentProps: { ...this.state.componentProps, [name]: dropdownValue.value } });
        }
    }

    componentDidMount() {
        this.setState({ componentAPIs: this.generateDocumentation() });
    }

    componentDidUpdate(prevProps: DocPageProps<T>, prevState: DocPageState<T>) {
        if (prevState.componentProps && prevState.componentProps !== this.state.componentProps) {
            this.setState({ componentAPIs: this.generateDocumentation() });
        }
    }

    render() {
        return (
            <section className="doc-page">
                <h1>{this.props.header}</h1>
                <p>{this.props.description}</p>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <h4>Playground</h4>
                            <div className="output">
                                <this.props.component {...this.state.componentProps} />
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
                                    {this.state.componentAPIs}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
