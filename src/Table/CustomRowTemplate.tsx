import * as React from "react";
import { RowUIProps } from "./Table";

type CustomRowTemplateProps<T> = RowUIProps &
    {
        [k in keyof T]?: React.ReactNode;
    };

export class CustomRowTemplate<T> extends React.Component<CustomRowTemplateProps<T>> {
    constructor(props: CustomRowTemplateProps<T>) {
        super(props);
    }
    render() {
        return (
            <tr
                className={(this.props.type === "row" ? "parent-row" : "sub-row") + (this.props.row.expanded ? " expanded" : "")}
                style={{ display: this.props.type === "subRow" ? (this.props.parentRowIsExpanded ? "table-row" : "none") : "table-row" }}
            >
                {this.props.useRowSelection ? (
                    <td className="row-selections-column">
                        {/* <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id={checkRowRandomIds}
                                checked={this.props.row.selected}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (this.props.type === "row") {
                                        this.props.onItemSelected && this.props.onItemSelected(e, this.props.row, this.props.type);
                                    } else {
                                        this.props.onItemSelected(e, this.props.row, "subRow", this.props.parentRowIndex);
                                    }
                                }}
                                name={`chk` + (this.props.type === "subRow" ? `${this.props.parentRowIndex}-${this.props.row.rowIndex}` : this.props.row.rowIndex)}
                            />
                            <label className="custom-control-label" htmlFor={checkRowRandomIds} />
                        </div> */}
                        {(this.props.row.subRows.length > 0 || this.props.row.rowContentDetail) && this.props.rowsAreCollapsable && (
                            <div
                                className={"icon-holder" + (this.props.row.expanded ? " active" : "")}
                                role="link"
                                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                    if (this.props.type === "row") {
                                        this.props.onRowExpanded(e, this.props.row);
                                    } else {
                                        this.props.onSubRowExpanded(e, this.props.row, this.props.parentRowIndex);
                                    }
                                }}
                            >
                                {/* {this.props.row.expanded ? angleDown : angleRightIcon} */}
                            </div>
                        )}
                    </td>
                ) : (
                    (this.props.row?.subRows?.length > 0 || this.props.row.rowContentDetail) &&
                    this.props.rowsAreCollapsable && (
                        <td>
                            <div
                                className={"icon-holder" + (this.props.row.expanded ? " active" : "")}
                                role="link"
                                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                    if (this.props.type === "row") {
                                        this.props.onRowExpanded && this.props.onRowExpanded(e, this.props.row);
                                    } else {
                                        this.props.onSubRowExpanded(e, this.props.row, this.props.parentRowIndex);
                                    }
                                }}
                            >
                                {/* {this.props.row.expanded ? angleDown : angleRightIcon} */}
                            </div>
                        </td>
                    )
                )}
                {this.props.row.cells.map((cell: any, cellIndex: number) => {
                    if (this.props[cell.accessor]) {
                        return <td key={`${this.props.type}-${cellIndex}`}>{this.props[cell.accessor]}</td>;
                    }
                    return <td key={`${this.props.type}-${cellIndex}`}>custom {cell.value}</td>;
                })}
                {/* {props.useShowActionColumn && (
                    <td>
                        <ActionColumn
                            actionLinks={props.actionLinks}
                            primaryActionButton={props.primaryActionButton}
                            selectedRow={props.row}
                            tableRef={props.tableRef}
                            onActionDropped={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                props.onActionDropped && props.onActionDropped(event, props.row, props.type === "subRow" ? props.parentRowIndex : null);
                            }}
                        />
                    </td>
                )} */}
            </tr>
        );
    }
}

// const CustomRowTemplate: React.FC<CustomRowTemplateProps> = (props: CustomRowTemplateProps) => {
//     return (
//         <tr
//             className={(props.type === "row" ? "parent-row" : "sub-row") + (props.row.expanded ? " expanded" : "")}
//             style={{ display: props.type === "subRow" ? (props.parentRowIsExpanded ? "table-row" : "none") : "table-row" }}
//         >
//             {props.useRowSelection ? (
//                 <td className="row-selections-column">
//                     {/* <div className="custom-control custom-checkbox">
//                         <input
//                             type="checkbox"
//                             className="custom-control-input"
//                             id={checkRowRandomIds}
//                             checked={props.row.selected}
//                             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                                 if (props.type === "row") {
//                                     props.onItemSelected && props.onItemSelected(e, props.row, props.type);
//                                 } else {
//                                     props.onItemSelected(e, props.row, "subRow", props.parentRowIndex);
//                                 }
//                             }}
//                             name={`chk` + (props.type === "subRow" ? `${props.parentRowIndex}-${props.row.rowIndex}` : props.row.rowIndex)}
//                         />
//                         <label className="custom-control-label" htmlFor={checkRowRandomIds} />
//                     </div> */}
//                     {(props.row.subRows.length > 0 || props.row.rowContentDetail) && props.rowsAreCollapsable && (
//                         <div
//                             className={"icon-holder" + (props.row.expanded ? " active" : "")}
//                             role="link"
//                             onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//                                 if (props.type === "row") {
//                                     props.onRowExpanded(e, props.row);
//                                 } else {
//                                     props.onSubRowExpanded(e, props.row, props.parentRowIndex);
//                                 }
//                             }}
//                         >
//                             {/* {props.row.expanded ? angleDown : angleRightIcon} */}
//                         </div>
//                     )}
//                 </td>
//             ) : (
//                     (props.row?.subRows?.length > 0 || props.row.rowContentDetail) &&
//                     props.rowsAreCollapsable && (
//                         <td>
//                             <div
//                                 className={"icon-holder" + (props.row.expanded ? " active" : "")}
//                                 role="link"
//                                 onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//                                     if (props.type === "row") {
//                                         props.onRowExpanded && props.onRowExpanded(e, props.row);
//                                     } else {
//                                         props.onSubRowExpanded(e, props.row, props.parentRowIndex);
//                                     }
//                                 }}
//                             >
//                                 {/* {props.row.expanded ? angleDown : angleRightIcon} */}
//                             </div>
//                         </td>
//                     )
//                 )}
//             {props.row.cells.map((cell: any, cellIndex: number) => {
//                 return <td key={`${props.type}-${cellIndex}`}>custom {cell.value}</td>;
//             })}
//             {/* {props.useShowActionColumn && (
//                 <td>
//                     <ActionColumn
//                         actionLinks={props.actionLinks}
//                         primaryActionButton={props.primaryActionButton}
//                         selectedRow={props.row}
//                         tableRef={props.tableRef}
//                         onActionDropped={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//                             props.onActionDropped && props.onActionDropped(event, props.row, props.type === "subRow" ? props.parentRowIndex : null);
//                         }}
//                     />
//                 </td>
//             )} */}
//         </tr>
//     );
// };

// export default CustomRowTemplate;
