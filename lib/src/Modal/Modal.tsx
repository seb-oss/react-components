import React from "react";
import { createPortal } from "react-dom";
import classnames from "classnames";
import "./modal.scss";

export type ModalPosition = "left" | "right" | "default";
export type ModalSize = "lg" | "md" | "sm";
type FocusableElements = HTMLInputElement | HTMLButtonElement | HTMLAnchorElement;

export type ModalProps = JSX.IntrinsicElements["div"] & {
    /** Centers the modal in the middle of the screen. Default is `false` */
    centered?: boolean;
    /** Size of modal `lg` | `md` | `sm` */
    size?: ModalSize;
    /** Toggle fullscreen modal, default is `false` */
    fullscreen?: boolean;
    /** Event triggered when escape key is triggered */
    onEscape?: (e: KeyboardEvent) => void;
    /** Event triggered when the backdrop is clicked */
    onBackdropDismiss?: React.MouseEventHandler<HTMLDivElement>;
    /** Modal position. Available positions: `left`, `right` */
    position?: ModalPosition;
    /** Modal toggle */
    toggle?: boolean;
    /** To only allow tab to focus within modal */
    trapFocus?: boolean;
    /** Automatically focuses on the first input element in the modal dialog */
    autoFocus?: boolean;
};

// This solution is meant to fix Gatsby build which complains that document doesn't exist in server-side rendering
const safeDocument: Document | null = typeof document !== "undefined" ? document : null;

/** The modal component provides a solid foundation for creating dialogs or slideout modals */
export const Modal: React.FC<ModalProps> = React.memo(({ trapFocus, autoFocus, centered, size, fullscreen, onEscape, onBackdropDismiss, position, toggle, ...props }: ModalProps) => {
    const dialogRef: React.MutableRefObject<HTMLDivElement> = React.useRef<HTMLDivElement>();
    const [isPristine, setIsPristine] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (toggle) {
            isPristine && setIsPristine(false);
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [toggle]);

    /** Focus trap */
    React.useEffect(() => {
        function tabHandler(e: KeyboardEvent) {
            if (e.key.toLowerCase() === "tab") {
                const lastFocusable: string = "last-focusable-element";
                const focusableElements: FocusableElements[] = Array.from(dialogRef.current.querySelectorAll<FocusableElements>("input, button, a")).filter((el) => el.className !== lastFocusable);

                if (focusableElements.length) {
                    if (!e.shiftKey) {
                        // Descending focus
                        if (document.activeElement.className === lastFocusable && dialogRef.current.contains(document.activeElement)) {
                            dialogRef.current.querySelector<FocusableElements>("input, button, a").focus();
                        } else if (!dialogRef.current.contains(document.activeElement)) {
                            dialogRef.current.querySelector<FocusableElements>("input, button, a").focus();
                        }
                    } else {
                        // Ascending focus
                        if ((document.activeElement.className === lastFocusable && dialogRef.current.contains(document.activeElement)) || !dialogRef.current.contains(document.activeElement)) {
                            focusableElements[focusableElements.length - 1].focus();
                        }
                    }
                }
            }
        }

        if (trapFocus && toggle) {
            document.addEventListener("keyup", tabHandler);
        } else {
            document.removeEventListener("keyup", tabHandler);
        }

        return () => document.removeEventListener("keyup", tabHandler);
    }, [trapFocus, toggle]);

    // Escape key listner
    React.useEffect(() => {
        function keyupListener(e: KeyboardEvent) {
            e.key.toLowerCase() === "escape" && onEscape(e);
        }

        if (onEscape && toggle) {
            document.addEventListener("keyup", keyupListener);
        } else {
            document.removeEventListener("keyup", keyupListener);
        }

        return () => document.removeEventListener("keyup", keyupListener);
    }, [onEscape, toggle]);

    return !safeDocument
        ? null
        : createPortal(
              <div
                  {...props}
                  className={classnames(
                      "rc",
                      "modal",
                      {
                          show: toggle,
                          hide: !toggle && !isPristine,
                          "modal-centered": centered,
                          "modal-aside": position && position !== "default" && !fullscreen,
                          [`modal-aside-${[position]}`]: position && position !== "default" && !fullscreen,
                          "modal-fullscreen": fullscreen,
                      },
                      props.className
                  )}
                  role={props.role || "dialog"}
                  tabIndex={props.tabIndex || -1}
                  aria-modal="true"
                  onClick={(e) => {
                      props.onClick && props.onClick(e);

                      const target: HTMLDivElement = e.target as any;

                      if (onBackdropDismiss && target.classList.contains("rc") && target.classList.contains("modal")) {
                          onBackdropDismiss(e);
                      }
                  }}
                  onAnimationEnd={(e) => {
                      props.onAnimationEnd && props.onAnimationEnd(e);

                      if (fullscreen && autoFocus && toggle && !dialogRef.current.contains(document.activeElement)) {
                          dialogRef.current.querySelector("input")?.focus();
                      }
                  }}
              >
                  <div
                      ref={dialogRef}
                      role="document"
                      className={classnames("modal-dialog", { [`modal-${size}`]: size })}
                      onAnimationEnd={() => {
                          if (autoFocus && toggle && !dialogRef.current.contains(document.activeElement)) {
                              dialogRef.current.querySelector("input")?.focus();
                          }
                      }}
                  >
                      <div className="modal-content">{props.children}</div>
                      {trapFocus && (
                          <a className="last-focusable-element" href="#">
                              <div className="sr-only">End of focus</div>
                          </a>
                      )}
                  </div>
              </div>,
              safeDocument.body
          );
});
