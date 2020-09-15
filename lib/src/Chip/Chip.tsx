import React from "react";
import classnames from "classnames";
import "./chip.scss";

export type ChipProps = JSX.IntrinsicElements["div"] & {
    onClose: React.MouseEventHandler<HTMLDivElement>;
};

export const Chip: React.FC<ChipProps> = ({ onClose, ...props }: ChipProps) => (
    <div {...props} className={classnames(["custom-chip", props.className])}>
        <div className="content">{props.children}</div>
        <div className="chip-close" onClick={onClose}>
            &times;
        </div>
    </div>
);
