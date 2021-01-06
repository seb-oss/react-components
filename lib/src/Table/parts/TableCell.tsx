import React from "react";

export type TableCellProps<T = any> = JSX.IntrinsicElements["td"] & {
    accessor?: keyof T;
    value?: T;
};

const TableCell: React.FC<TableCellProps> = ({ accessor, value, ...props }: TableCellProps) => {
    return <td {...props} />;
};

TableCell.displayName = "TableCell";

export default TableCell;
