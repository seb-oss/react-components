import React from "react";
import classnames from "classnames";
import { createPortal } from "react-dom";
import { ElementPosition, useOverlay } from "./useOverlay";
import "./overlay.scss";

export type OverlayProps = React.PropsWithChildren<{
    disableAutoPosition?: boolean;
    overlayReference: () => HTMLDivElement;
    className?: string;
    onBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
    show: boolean;
    position?: ElementPosition;
    ref?: React.Ref<HTMLDivElement>;
}>;

// This solution is meant to fix Gatsby build which complains that document doesn't exist in server-side rendering
const safeDocument: Document | null = typeof document !== "undefined" ? document : null;

export const Overlay: React.FC<OverlayProps> = React.forwardRef(({ disableAutoPosition, ...props }: OverlayProps, ref: React.RefObject<HTMLDivElement>) => {
    const [overlayContentRef, setOverlayContentRef] = React.useState<HTMLDivElement>(null);
    const { style, currentPosition } = useOverlay(props.overlayReference(), overlayContentRef, props.show, props.position, { disableAutoPosition });

    const getOverlayContentRef = React.useCallback((node: HTMLDivElement) => {
        if (node) {
            setOverlayContentRef(node);
        }
    }, []);

    React.useImperativeHandle(ref, () => ({
        ...ref.current,
        focus: () => overlayContentRef?.focus(),
        blur: () => overlayContentRef?.blur(),
    }));

    React.useEffect(() => {
        !!overlayContentRef && overlayContentRef.focus();
    }, [overlayContentRef]);

    return safeDocument && props.show
        ? createPortal(
              <div
                  className={classnames("overlay-container", props.className, currentPosition || "top", { show: props.show && overlayContentRef })}
                  ref={getOverlayContentRef}
                  tabIndex={-1}
                  onBlur={props.onBlur}
                  aria-hidden={!props.show}
                  style={style}
              >
                  {props.children}
              </div>,
              safeDocument.body
          )
        : null;
});
