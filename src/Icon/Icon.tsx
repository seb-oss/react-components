import * as React from "react";
import "./icon-style.scss";

export interface IconProps {
    src: any;
    className?: string;
    title?: string;
    size?: number;
    onClick?: (event: any) => void;
}

export const Icon: React.FunctionComponent<IconProps> = React.memo((props: IconProps): React.ReactElement<void> => {
    return (
        <div
            className={"icon-holder" + (props.className ? ` ${props.className}` : "")}
            title={props.title}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => { props.onClick && props.onClick(e); }}
            style={props.size ? { width: props.size, height: props.size } : null}
        >
            {props.src}
        </div>
    );
});
