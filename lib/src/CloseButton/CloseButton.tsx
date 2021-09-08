import React from "react";
import classnames from "classnames";
import "./close-button.scss";

/**
 * TODO: This is a component that fixes the broken `.close` element provided by Bootstrap
 * This component should be replaced by the element from Bootstrap when this PR is merged:
 * https://github.com/sebgroup/bootstrap/pull/533
 */

export const CloseButton: React.FC<JSX.IntrinsicElements["button"]> = React.memo(
    React.forwardRef((props: JSX.IntrinsicElements["button"], ref: React.ForwardedRef<HTMLButtonElement>) => {
        return <button ref={ref} {...props} className={classnames("rc close-btn", props.className)} />;
    })
);
