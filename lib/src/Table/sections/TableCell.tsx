import React from "react";
// import { TextboxGroup, TextboxGroupProps } from "./TextboxGroup";

type CollapseCell = {
    type: "collapse";
    isCollapsed: boolean;
};

export type InputCell = {
    type: "input";
    isEditable?: boolean;
};

type CheckboxCell = JSX.IntrinsicElements["input"] & {
    type: "checkbox";
};

type DefaultCell = {
    type: "default";
    value?: React.ReactNode;
    children?: React.ReactNode;
};

type InputChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => void;
type CellMouseEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
export interface TableCellGenericProps<T extends CellType> {
    onCellActionTrigger: ParameterMap[T];
}
type ParameterMap = {
    input: InputChangeEvent;
    collapse: CellMouseEvent;
    default: CellMouseEvent;
    checkbox: InputChangeEvent;
};

type PropsMap = {
    input: InputCell;
    collapse: CollapseCell;
    default: any;
};

export type CellType = keyof ParameterMap;
// type CellType = "input" | "checkbox" | "action" | "default" | "collapse";

const angleDown: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
        <path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" />
    </svg>
);
const angleRightIcon: JSX.Element = (
    <svg name="angle-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
        <path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" />
    </svg>
);

// export type TableCellProps<T extends CellType = "default"> = (CollapseCell | InputCell | CheckboxCell | DefaultCell) & {
//     type?: T;
//     id?: string;
//     wrapperProps?: JSX.IntrinsicElements["td"];
//     accessor?: string;
//     hidden?: boolean;
//     onCellActionTrigger?: any;
//     isEditable?: boolean;
// };
export type TableCellProps<T = any> = JSX.IntrinsicElements["td"] & {
    accessor?: keyof T;
    value?: T;
    render?: (rowValue: T) => React.ReactNode;
};
// function TableCell<T extends CellType>({ accessor, hidden, onCellActionTrigger, type, wrapperProps, ...props }: TableCellProps<T>) {
//     const getContent = () => {
//         switch (type) {
//             case "input":
//                 return <TextboxGroup {...(props as InputCell)} />;
//             case "collapse":
//                 return (
//                     <div className={"icon-holder" + ((props as CollapseCell).isCollapsed ? " active" : "")} role="link" onClick={onCellActionTrigger as CellMouseEvent}>
//                         {(props as CollapseCell).isCollapsed ? angleDown : angleRightIcon}
//                     </div>
//                 );
//             case "checkbox":
//                 return (
//                     <div className="custom-control custom-checkbox">
//                         <input type="checkbox" className="custom-control-input" onChange={onCellActionTrigger as InputChangeEvent} {...(props as CheckboxCell)} />
//                         <label className="custom-control-label" htmlFor={(props as CheckboxCell).id} />
//                     </div>
//                 );
//             default:
//                 return (props as DefaultCell).value || (props as DefaultCell).children;
//         }
//     };
//     return <td {...wrapperProps}>{hidden ? null : getContent()}</td>;
// }

const TableCell: React.FC<TableCellProps> = ({ accessor, render, value, ...props }: TableCellProps) => {
    return <td {...props}>{!!render ? render(value) : props.children}</td>;
};

TableCell.displayName = "TableCell";

export default TableCell;
