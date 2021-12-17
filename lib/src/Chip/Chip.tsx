import classnames from "classnames";
import React from "react";
import "./chip.scss";

export type ChipProps = JSX.IntrinsicElements["div"] & {
    /** Event triggered when the close button is clicked */
    onClose: (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>) => void;
};

export const Chip: React.FC<ChipProps> = React.forwardRef(({ onClose, ...props }: ChipProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const onKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            switch (event.key) {
                case "Backspace":
                case "Delete": {
                    onClose(event);
                    break;
                }
            }
        },
        [onClose]
    );

    return (
        <div {...props} ref={ref} role="button" className={classnames("rc", "chip", props.className)} onKeyDown={onKeyDown} tabIndex={0}>
            <div className="content">{props.children}</div>
            <button aria-hidden={true} onClick={onClose} tabIndex={-1}>
                &#x2715;
            </button>
        </div>
    );
});
