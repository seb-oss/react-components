import React from "react";
import { ParsedPropertyDeclartion, ExtendedPropertyDeclaration } from "@utils/api-parser";

export interface DocsAPIProps {
    list: Array<ParsedPropertyDeclartion>;
}

const DocsAPI: React.FC<DocsAPIProps> = (props: DocsAPIProps) => {
    const [defaultProp, setDefaultProp] = React.useState<ParsedPropertyDeclartion>(null);

    React.useEffect(() => {
        if (props.list) {
            setDefaultProp(props.list.find((item: ParsedPropertyDeclartion) => item.isDefault));
        }
    }, [props.list]);

    return (
        !!props.list?.length && (
            <div className="apis">
                <h3>Inputs</h3>
                <div className="card">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Inputs</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {defaultProp?.properties
                                ?.filter(({ isExtended }: ExtendedPropertyDeclaration) => !isExtended)
                                .map((input: ExtendedPropertyDeclaration, index: number) => (
                                    <tr key={index}>
                                        <td>{input.name}</td>
                                        <td>
                                            <code>{input.type}</code>
                                        </td>
                                        <td dangerouslySetInnerHTML={{ __html: input.description }} />
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    );
};

export default DocsAPI;
