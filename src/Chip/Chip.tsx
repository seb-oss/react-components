import React from "react";

import "./chip.scss";

export type ChipProps = React.PropsWithChildren<{
    id?: string;
    className?: string;
    onClose: (e: React.MouseEvent<HTMLDivElement>) => void;
}>;

const Chip: React.FC<ChipProps> = (props: ChipProps) => {
    return (
        <div className={"custom-chip" + (props.className ? ` ${props.className}` : "")} id={props.id}>
            <div className="content">{props.children}</div>
            <div className="chip-close" onClick={props.onClose}>
                &times;
            </div>
        </div>
    );
};

export { Chip };
