import classnames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import { useCombinedRefs } from "../hooks";
import { Key } from "../utils";
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
    /** Automatically focuses on the first focusable element in the modal dialog */
    autoFocus?: boolean;
};

const FOCUSABLE_ELEMENTS_SELECTOR: string = "input, button, a";
// This solution is meant to fix Gatsby build which complains that document doesn't exist in server-side rendering
const safeDocument: Document | null = typeof document !== "undefined" ? document : null;

/** The modal component provides a solid foundation for creating dialogs or slideout modals */
export const Modal: React.FC<ModalProps> = React.memo(
    React.forwardRef(({ autoFocus = true, centered, size, fullscreen, onEscape, onBackdropDismiss, position, toggle, ...props }: ModalProps, ref: React.ForwardedRef<HTMLDivElement>) => {
        const dialogRef: React.MutableRefObject<HTMLDivElement> = useCombinedRefs(ref);
        const [isPristine, setIsPristine] = React.useState<boolean>(true);

        const onDialogKeyDown = React.useCallback<(e: React.KeyboardEvent) => void>(
            (e: React.KeyboardEvent) => {
                switch (e.key) {
                    case Key.Escape:
                        onEscape && onEscape(e as unknown as KeyboardEvent);
                        break;
                    case Key.Tab:
                        // focus on next focusable element and trap the focus within the dialog (focus trap)
                        e.preventDefault();
                        const focusableElements: FocusableElements[] = Array.from(dialogRef.current.querySelectorAll<FocusableElements>(FOCUSABLE_ELEMENTS_SELECTOR));
                        const focusableElementsLength: number = focusableElements.length;

                        if (focusableElementsLength > 0) {
                            const currentFocusedIndex: number = focusableElements.indexOf(document.activeElement as FocusableElements);
                            const direction: number = e.shiftKey ? -1 : 1;
                            const nextFocusIndex: number = (currentFocusedIndex + direction + focusableElementsLength) % focusableElementsLength;
                            focusableElements[nextFocusIndex]?.focus();
                        }

                        break;
                }
            },
            [dialogRef, onEscape]
        );

        React.useEffect(() => {
            if (toggle) {
                isPristine && setIsPristine(false);
                document.body.classList.add("modal-open");
            } else {
                document.body.classList.remove("modal-open");
            }

            return () => document.body.classList.remove("modal-open");
        }, [toggle]);

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

                          if (fullscreen && toggle && autoFocus && !dialogRef.current.contains(document.activeElement)) {
                              dialogRef.current.querySelector<HTMLElement>(FOCUSABLE_ELEMENTS_SELECTOR)?.focus();
                          }
                      }}
                      onKeyDown={onDialogKeyDown}
                  >
                      <div
                          ref={dialogRef}
                          role="document"
                          className={classnames("modal-dialog", { [`modal-${size}`]: size })}
                          onAnimationEnd={() => {
                              if (toggle && autoFocus && !dialogRef.current.contains(document.activeElement)) {
                                  dialogRef.current.querySelector<HTMLElement>(FOCUSABLE_ELEMENTS_SELECTOR)?.focus();
                              }
                          }}
                      >
                          <div className="modal-content">{props.children}</div>
                      </div>
                  </div>,
                  safeDocument.body
              );
    })
);
