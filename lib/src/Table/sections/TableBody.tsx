import React from "react";
import { TableContext } from "../TableContextProvider";
import { TableRowProps } from "./TableRow";

export type TableBodyProps = JSX.IntrinsicElements["tbody"] & {
    columns?: Array<TableBodyProps>;
    onSort?: (accessor: string, sortDirection: string) => void;
};

const TableBody: React.FC<TableBodyProps> = ({ columns, onSort, ...props }: TableBodyProps) => {
    let parentKey: string;

    const cloneTableRow = React.useCallback((Child: React.ReactElement<any>, index: number) => {
        const isTableRow: boolean = React.isValidElement<React.FC<TableRowProps>>(Child);
        if (isTableRow && !Child.props.isSubRow) {
            parentKey = Child.props.uniqueKey;
        }
        return isTableRow ? React.cloneElement<any>(Child, { index, parentKey }) : Child;
    }, []);

    return (
        <tbody {...props}>
            {React.Children.map(props.children, (Child: React.ReactElement<any>, i: number) => {
                if (Child.type === React.Fragment) {
                    return React.cloneElement<any>(Child, {
                        children: React.Children.map(Child.props.children, (FragmentChild: React.ReactElement<any>, fragmentIndex: number) => cloneTableRow(FragmentChild, fragmentIndex)),
                    });
                } else {
                    return cloneTableRow(Child, i);
                }
            })}
        </tbody>
    );
};

TableBody.displayName = "TableBody";

export default TableBody;
