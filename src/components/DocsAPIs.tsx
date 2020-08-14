import React from "react";
import { ParsedAccessorDeclaration } from "utils/api-parser";

export interface DocsAPIProps {
    list: Array<ParsedAccessorDeclaration>;
}

const DocsAPI: React.FC<DocsAPIProps> = (props: DocsAPIProps) => {
    return props.list?.length ? (
        <>
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
                        {props.list.map((input: ParsedAccessorDeclaration, index: number) => (
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
        </>
    ) : null;
};

export default DocsAPI;
