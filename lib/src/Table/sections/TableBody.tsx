import React from "react";
import { TableRowProps } from "./TableRow";

export type TableBodyProps = JSX.IntrinsicElements["tbody"] & {
    columns?: Array<TableBodyProps>;
    onSort?: (accessor: string, sortDirection: string) => void;
};

const TableBody: React.FC<TableBodyProps> = ({ columns, onSort, ...props }: TableBodyProps) => {
    return (
        <tbody {...props}>
            {React.Children.map(props.children, (Child: React.ReactElement<any>, i: number) => {
                return React.isValidElement<React.FC<TableRowProps>>(Child)
                    ? React.cloneElement<any>(Child, {
                          index: i,
                      })
                    : Child;
            })}
        </tbody>
    );
};

TableBody.displayName = "TableBody";

export default TableBody;
