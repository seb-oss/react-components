import * as React from "react";
import "./icon-style.scss";

export interface IconProps {
    className?: string;
    id?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    size?: number;
    src: JSX.Element;
    title?: string;
}

export const Icon: React.FunctionComponent<IconProps> = React.memo(
    (props: IconProps): React.ReactElement<void> => {
        return (
            <div
                className={"icon-holder" + (props.className ? ` ${props.className}` : "")}
                title={props.title}
                onClick={props.onClick}
                style={props.size ? { width: props.size, height: props.size } : null}
                id={props.id}
            >
                {props.src}
            </div>
        );
    }
);
