import React from "react";
import { ActionLinkItem, PrimaryActionButton, TableRow } from "../Table";
import { randomId } from "@sebgroup/frontend-tools";

const ellipsis: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M192 256c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm88-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-240 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z" />
    </svg>
);

interface ActionColumnProps {
    actionLinks?: Array<ActionLinkItem>;
    onActionDropped?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    primaryActionButton?: PrimaryActionButton;
    selectedRow: TableRow;
    tableRef: React.RefObject<HTMLTableElement>;
}

export const ActionColumnUI: React.FunctionComponent<ActionColumnProps> = (props: ActionColumnProps) => {
    const [btnPrimaryRandomIds] = React.useState<string>(randomId("btn"));
    const [dropup, setDropup] = React.useState<boolean>(false);
    const actionRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const [actionColumnClass, setActionColumnClass] = React.useState<string>("");

    React.useEffect(() => {
        let className: string = "dropdown-content";
        if (props.selectedRow?.actionsDropdownDropped) {
            className += " active";
        }

        if (dropup) {
            className += " dropup";
        }

        setActionColumnClass(className);
    }, [props.selectedRow, dropup]);

    return (
        <div className="action-column">
            {props.primaryActionButton && (
                <button
                    id={btnPrimaryRandomIds}
                    type="button"
                    className={`btn btn-${props.primaryActionButton.buttonTheme ? props.primaryActionButton.buttonTheme : "outline-primary"} btn-${
                        props.primaryActionButton?.buttonSize ? props.primaryActionButton?.buttonSize : "sm"
                    }`}
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        props.primaryActionButton?.onClick && props.primaryActionButton.onClick(e, props.selectedRow);
                    }}
                >
                    {props.primaryActionButton.label}
                </button>
            )}
            {props.actionLinks && props.actionLinks?.length ? (
                <div
                    className="ellipsis-dropdown-holder"
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        const tableSize: DOMRect = props.tableRef?.current?.getBoundingClientRect();
                        const actionColumnHeight: number = actionRef.current?.scrollHeight;
                        const actionColumSize: DOMRect = actionRef.current?.getBoundingClientRect();

                        if (tableSize?.height > actionColumnHeight) {
                            const lengthOffset: number = tableSize?.bottom - actionColumSize?.bottom;
                            if (lengthOffset < actionColumnHeight) {
                                setDropup(true);
                            } else {
                                setDropup(false);
                            }
                        } else {
                            setDropup(false);
                        }
                        e.preventDefault();
                        props.onActionDropped(e);
                    }}
                >
                    <div className="icon-holder" id={"ellipsis-" + props.selectedRow.rowIndex} role="link">
                        {ellipsis}
                    </div>
                    {props.selectedRow.actionsDropdownDropped ? (
                        <div className={actionColumnClass} ref={actionRef}>
                            {props.actionLinks.map((link: ActionLinkItem, index: number) => (
                                <a
                                    key={index}
                                    onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                                        e.preventDefault();
                                        link.onClick(e, props.selectedRow);
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
};
