import * as React from "react";
import "./breadcrumb-style.scss";

interface BreadcrumbProps {
    list: Array<string>;
    onClick?: (i: number) => void;
    className?: string;
}

export const Breadcrumb: React.FunctionComponent<BreadcrumbProps> = React.memo((props: BreadcrumbProps): React.ReactElement<void> => {
    return (
        <div className={"custom-breadcrumb" + (props.className ? ` ${props.className}` : "")}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {props.list.map((item: string, i: number) =>
                        <li
                            key={i}
                            className={"breadcrumb-item" + (i === props.list.length - 1 ? " active" : "")}
                            onClick={() => { (i !== props.list.length - 1 && props.onClick) && props.onClick(i); }}
                        >{item}
                        </li>
                    )}
                </ol>
            </nav>
        </div>
    );
});
