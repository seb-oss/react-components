import React from "react";

export type TableCellProps<T = any> = JSX.IntrinsicElements["td"];

const TableCell: React.FC<TableCellProps> = ({ ...props }: TableCellProps) => {
    return <td {...props} />;
};

TableCell.displayName = "TableCell";

export default TableCell;
