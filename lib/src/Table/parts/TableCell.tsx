import React from "react";

export type TableCellProps<T = any> = JSX.IntrinsicElements["td"];

const TableCell: React.FC<TableCellProps> = React.forwardRef(({ ...props }: TableCellProps, ref: React.ForwardedRef<HTMLTableCellElement>) => {
    return <td {...props} ref={ref} />;
});

TableCell.displayName = "TableCell";

export { TableCell };
