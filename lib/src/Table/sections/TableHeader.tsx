import React from "react";
import { TableContext } from "../TableContextProvider";
import TableHeaderCell from "./TableHeaderCell";
import { TableRowProps } from "./TableRow";

export type TableHeaderProps = JSX.IntrinsicElements["thead"] & {
    columns?: Array<TableHeaderProps>;
};

const TableHeader: React.FC<TableHeaderProps> = ({ columns, ...props }: TableHeaderProps) => {
    const context = React.useContext(TableContext);
    return (
        <thead {...props}>
            {React.Children.count(props.children) === 1 && React.isValidElement<TableRowProps>(props.children)
                ? React.cloneElement<any>(props.children, { isHeaderRow: true, index: -1 })
                : React.Children.map(props.children, (Child: React.ReactElement<any>, i: number) => {
                      return React.isValidElement<TableRowProps>(Child)
                          ? React.cloneElement<any>(Child, {
                                index: i,
                                isHeaderRow: true,
                                hideSelect: !Child.props.isHeaderRow,
                            })
                          : Child;
                  })}
        </thead>
    );
};

TableHeader.displayName = "TableHeader";

export default TableHeader;
