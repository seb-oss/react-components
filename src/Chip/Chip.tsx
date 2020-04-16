import React from "react";
import classnames from "classnames";
import "./chip.scss";

export type ChipProps = React.PropsWithChildren<{
    id?: string;
    className?: string;
    onClose: React.MouseEventHandler<HTMLDivElement>;
}>;

const Chip: React.FC<ChipProps> = (props: ChipProps) => (
    <div className={classnames(["custom-chip", props.className])} id={props.id}>
        <div className="content">{props.children}</div>
        <div className="chip-close" onClick={props.onClose}>
            &times;
        </div>
    </div>
);

export { Chip };
