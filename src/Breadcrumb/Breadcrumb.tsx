import * as React from "react";
import "./breadcrumb-style.scss";

export interface BreadcrumbProps {
    className?: string;
    id?: string;
    list: Array<string | React.ReactNode>;
    onClick?: (i: number, e?: React.MouseEvent<HTMLLIElement>) => void;
}

export const Breadcrumb: React.FunctionComponent<BreadcrumbProps> = React.memo(
    (props: BreadcrumbProps): React.ReactElement<void> => {
        function onClick(index: number, e?: React.MouseEvent<HTMLLIElement>): void {
            if (index !== props.list.length - 1 && props.onClick) {
                props.onClick(index, e);
            }
        }
        return (
            <div className={"custom-breadcrumb" + (props.className ? ` ${props.className}` : "")} id={props.id}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {props.list.map((item: string | React.ReactNode, i: number) => (
                            <li key={i} className={"breadcrumb-item" + (i === props.list.length - 1 ? " active" : "")} onClick={(e: React.MouseEvent<HTMLLIElement>) => onClick(i, e)}>
                                {item}
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        );
    }
);
