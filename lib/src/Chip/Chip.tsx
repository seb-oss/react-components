import React from "react";
import classnames from "classnames";
import "./chip.scss";

export type ChipProps = JSX.IntrinsicElements["div"] & {
    /** Event triggered when the close button is clicked */
    onClose: React.MouseEventHandler<HTMLButtonElement>;
};

export const Chip: React.FC<ChipProps> = ({ onClose, ...props }: ChipProps) => (
    <div {...props} className={classnames("rc", "chip", props.className)}>
        <div className="content">{props.children}</div>
        <button onClick={onClose}>&#x2715;</button>
    </div>
);
