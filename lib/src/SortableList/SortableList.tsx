import React from "react";
import classnames from "classnames";
import { SortableItemProps } from "./SortableItem";
import "./dragtouch.polyfills";
import "./sortable-list.scss";
import { Key } from "../utils";

const dragAndDropIcon: JSX.Element = (
    <svg width="10px" fill="currentColor" height="16px" viewBox="0 0 10 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Group" fill="currentColor">
                <circle id="Oval" cx="2" cy="2" r="2" />
                <circle id="Oval-Copy-2" cx="2" cy="8" r="2" />
                <circle id="Oval-Copy-4" cx="2" cy="14" r="2" />
                <circle id="Oval-Copy" cx="8" cy="2" r="2" />
                <circle id="Oval-Copy-3" cx="8" cy="8" r="2" />
                <circle id="Oval-Copy-5" cx="8" cy="14" r="2" />
            </g>
        </g>
    </svg>
);

export type SortableListProps = JSX.IntrinsicElements["div"] & {
    /** on sort callback */
    onSort: (list: Array<string>) => void;
    /** disable sorting */
    disabled?: boolean;
};

type PositionDelta = {
    x: number;
    y: number;
};

type OrderItem = Pick<SortableItemWrapperProps, "disabled" | "uniqueKey">;

/** The component allows for sorting list by drag and drop. */
export const SortableList: React.FC<SortableListProps> = ({ onSort, className, disabled, ...props }: React.PropsWithChildren<SortableListProps>) => {
    const dragContainerRef = React.useRef<HTMLDivElement>();
    const [defaultOrders, setDefaultOrders] = React.useState<OrderItem[]>([]);
    const [draggingOrders, setDraggingOrders] = React.useState<OrderItem[]>(defaultOrders);
    const [currentItemNode, setCurrentItemNode] = React.useState<HTMLDivElement>(null);
    const [currentItemIndex, setCurrentItemIndex] = React.useState<number>(null);
    const [delta, setDelta] = React.useState<PositionDelta>({ x: 0, y: 0 });
    const [dragNode, setDragNode] = React.useState<HTMLElement>(null);
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const [isTranslating, setIsTranslating] = React.useState<boolean>(false);
    const [affectedIndex, setAffectedIndex] = React.useState<number>(null);
    const [affectedNode, setAffectedNode] = React.useState<HTMLDivElement>(null);

    /**
     * when user clicks on sortable item, set initial delta and selected item
     * @param event mouse event
     * @param index selected index
     */
    const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>, index: number) => {
        const itemParentNode: HTMLDivElement = (event.target as HTMLDivElement).closest(".sortable-item-wrapper");
        const position: React.MouseEvent = ((event as React.TouchEvent).touches ? (event as React.TouchEvent).touches[0] : event) as React.MouseEvent;
        setDelta({
            x: position.pageX - itemParentNode.getBoundingClientRect().left,
            y: position.pageY - itemParentNode.getBoundingClientRect().top,
        });
        setCurrentItemIndex(index);
        setCurrentItemNode(itemParentNode);
    };

    /**
     * on drag initiated, set the ghost item
     * @param event drag event
     */
    const onDragStart = React.useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            setIsDragging(() => {
                const clonedNode: HTMLElement = currentItemNode.cloneNode(true) as HTMLElement;
                clonedNode.classList.remove("is-active");
                clonedNode.classList.add("on-drag");
                clonedNode.style.width = `${currentItemNode.getBoundingClientRect().width}px`;
                clonedNode.style.height = `${currentItemNode.getBoundingClientRect().height}px`;
                document.body.appendChild(clonedNode);
                event.dataTransfer.setDragImage(clonedNode, delta.x, delta.y);
                event.dataTransfer.effectAllowed = "move";
                setDragNode(clonedNode);
                return true;
            });
        },
        [currentItemNode]
    );

    /**
     * when the dragged item is dragged over another sortable item, check if the overlapped element fulfills criteria to be swapped
     * @param event drag event
     * @param index overlapped index
     */
    const onDragOver = React.useCallback(
        (event: React.DragEvent<HTMLDivElement>, index: number) => {
            event.preventDefault(); // to prevent ghost image for reverting to original position
            event.dataTransfer.dropEffect = "move";
            const activeNodeRect: DOMRect = currentItemNode.getBoundingClientRect();
            const itemParentNode: HTMLDivElement = (event.target as HTMLDivElement).closest(".sortable-item-wrapper");
            const nodeRect: DOMRect = itemParentNode.getBoundingClientRect();
            const ghostImagePositionTop: number = event.clientY - delta.y;
            const ghostImagePositionBottom: number = ghostImagePositionTop + activeNodeRect.height; // get ghost image's actual position
            const isAboveGhostImage: boolean = nodeRect.top <= ghostImagePositionTop;
            let positionDifference: number = nodeRect.top - ghostImagePositionBottom;
            if (isAboveGhostImage) {
                positionDifference = ghostImagePositionTop - nodeRect.bottom;
            }
            const isHalfCoverage: boolean = Math.abs(positionDifference) / nodeRect.height >= 0.5; // only trigger swapping when overlapped coverage is more than 50%
            const isOverlapped: boolean = isHalfCoverage && !isTranslating && itemParentNode.className.indexOf("on-drag") === -1;
            itemParentNode.style.transform = null;
            if (isOverlapped) {
                // if the overlapped item fulfills criteria, initiate animation
                setIsTranslating(true);
                itemParentNode.style.transform = `translate3d(0, ${isAboveGhostImage ? "" : "-"}${itemParentNode.offsetHeight}px, 0)`;
                setAffectedNode(itemParentNode);
                setAffectedIndex(index);
            }
        },
        [currentItemNode, delta, setIsTranslating, setAffectedNode, setAffectedIndex]
    );

    /** sort dragging order on transition end */
    const onTransitionEnd = React.useCallback(() => {
        if (affectedNode) {
            setDraggingOrders((oldOrders: OrderItem[]) => {
                const newList: OrderItem[] = oldOrders.slice(0);
                affectedNode.style.transform = null;
                let itemIndex: number = currentItemIndex;
                const originalItem: OrderItem = newList.find(({ uniqueKey }: OrderItem, index: number) => {
                    itemIndex = index;
                    return uniqueKey === defaultOrders[currentItemIndex].uniqueKey;
                });
                newList[itemIndex] = newList[affectedIndex]; // swap overlapped
                newList[affectedIndex] = originalItem;
                setAffectedIndex(null);
                setAffectedNode(null);
                setIsTranslating(false);
                return newList;
            });
        }
    }, [affectedNode, affectedIndex, setDraggingOrders, setAffectedIndex, setAffectedNode, setIsTranslating]);

    /**
     * on drag end, remove appended ghost image and style, fire on sort callback
     * @param event drag event
     */
    const onDragEnd = React.useCallback(
        (event: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
            setIsDragging(() => {
                event.preventDefault(); // to prevent ghost image for reverting to original position
                event.stopPropagation();
                Array.from(dragContainerRef.current.children).forEach((element: HTMLElement) => {
                    element.style.transform = null;
                });
                setCurrentItemIndex(null);
                setCurrentItemNode(null);
                onSort(draggingOrders.map(({ uniqueKey }: OrderItem) => uniqueKey));
                setDefaultOrders(draggingOrders);
                dragNode?.remove();
                return false;
            });
        },
        [dragContainerRef, draggingOrders, dragNode, setIsDragging, setCurrentItemIndex, setCurrentItemNode, onSort, setDefaultOrders]
    );

    const onItemSwap = React.useCallback(
        (currentIndex: number, swapIndex: number, focusTarget: HTMLDivElement) => {
            const newList: OrderItem[] = defaultOrders.slice(0);
            const swapItem = newList[swapIndex];
            newList[swapIndex] = newList[currentIndex]; // swap overlapped
            newList[currentIndex] = swapItem;
            onSort(newList.map(({ uniqueKey }: OrderItem) => uniqueKey));
            setDefaultOrders(newList);
            focusTarget.focus();
        },
        [defaultOrders]
    );

    const onKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            const selectedItemIndex: number = Number((event.target as HTMLDivElement).dataset?.index);
            switch (event.key) {
                case Key.Space:
                case Key.Enter:
                    setCurrentItemIndex((oldItemIndex: number) => (oldItemIndex === null ? selectedItemIndex : null));
                    break;
                case Key.ArrowRight:
                case Key.ArrowDown:
                    event.preventDefault();
                    setCurrentItemIndex((oldItemIndex: number) => {
                        if (oldItemIndex !== null && selectedItemIndex < defaultOrders.length - 1) {
                            onItemSwap(selectedItemIndex, selectedItemIndex + 1, (event.target as HTMLDivElement).nextElementSibling as HTMLDivElement);
                            return selectedItemIndex;
                        }
                        return oldItemIndex;
                    });
                    break;
                case Key.ArrowLeft:
                case Key.ArrowUp:
                    event.preventDefault();
                    setCurrentItemIndex((oldItemIndex: number) => {
                        if (oldItemIndex !== null && selectedItemIndex > 0) {
                            onItemSwap(selectedItemIndex, selectedItemIndex - 1, (event.target as HTMLDivElement).previousElementSibling as HTMLDivElement);
                            return selectedItemIndex;
                        }
                        return oldItemIndex;
                    });
                    break;
            }
        },
        [onItemSwap, defaultOrders]
    );

    React.useEffect(() => {
        setDefaultOrders(() => {
            const newOrderList: OrderItem[] = React.Children.toArray(props.children)
                .filter((item: React.ReactChild) => React.isValidElement<React.FC<SortableItemProps>>(item) && (item?.type as any)?.displayName === "SortableItem")
                .map(({ props }: React.ReactElement<SortableItemProps>) => ({ uniqueKey: props.uniqueKey, disabled: props.disabled }));
            if (newOrderList.length === 0) {
                console.warn("Please pass at least one SortableItem element to make SortableList works");
            }
            return newOrderList;
        });
    }, [props.children]);

    React.useEffect(() => {
        setDraggingOrders(defaultOrders);
    }, [defaultOrders]);

    return (
        <div role="application" className={classnames("rc", "sortable-list", className, { disabled })}>
            <div {...props} className="drop-container" tabIndex={0} role="list" ref={dragContainerRef} onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => onKeyDown(event)}>
                {(currentItemIndex === null ? defaultOrders : draggingOrders).map((item: OrderItem, index: number) => (
                    <SortableItemWrapper
                        key={index}
                        index={index}
                        uniqueKey={item.uniqueKey}
                        disabled={disabled || item.disabled}
                        isActive={currentItemIndex !== null && item === defaultOrders[currentItemIndex]}
                        isDragging={isDragging}
                        className="sortable-item-wrapper"
                        onMouseDown={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => onMouseDown(event, index)}
                        onTouchStart={(event: React.TouchEvent<HTMLDivElement>) => onMouseDown(event, index)}
                        onMouseUp={onDragEnd}
                        onTouchEnd={onDragEnd}
                        onDragStart={onDragStart}
                        onDragOver={isTranslating ? null : (event: React.DragEvent<HTMLDivElement>) => onDragOver(event, index)}
                        onDragEnd={onDragEnd}
                        onTransitionEnd={onTransitionEnd}
                        aria-grabbed={currentItemIndex === index}
                    >
                        {React.Children.map(props.children, (Child: React.ReactElement<SortableItemProps>) => {
                            const { uniqueKey }: SortableItemProps = Child.props;
                            const isDisabled: boolean = disabled || item.disabled;
                            return item.uniqueKey === uniqueKey && React.isValidElement<React.FC<SortableItemProps>>(Child)
                                ? React.cloneElement(Child, {
                                      disabled: isDisabled,
                                      "aria-disabled": isDisabled,
                                  })
                                : null;
                        })}
                    </SortableItemWrapper>
                ))}
            </div>
        </div>
    );
};

type SortableItemWrapperProps = SortableItemProps &
    JSX.IntrinsicElements["div"] & {
        isActive?: boolean;
        disabled?: boolean;
        isDragging?: boolean;
        index: number;
    };

const SortableItemWrapper: React.FC<SortableItemWrapperProps> = ({
    isActive,
    isDragging,
    className,
    disabled,
    children,
    uniqueKey,
    index,
    onDragStart,
    onDragOver,
    onDragEnd,
    onTransitionEnd,
    onMouseDown,
    onMouseUp,
    onTouchEnd,
    onTouchStart,
    ...props
}: React.PropsWithChildren<SortableItemWrapperProps>) => {
    return (
        <div
            {...props}
            tabIndex={0}
            role="listitem"
            className={classnames("rc", "sortable-item-wrapper", className, { "is-active": isActive && isDragging, disabled })}
            data-value={uniqueKey}
            data-index={index}
            onTransitionEnd={disabled ? null : onTransitionEnd}
            onDragOver={disabled ? null : isActive ? (event: React.DragEvent) => event.preventDefault() : onDragOver}
        >
            <div className="sort-item-content">{children}</div>
            <div
                className="drag-icon"
                draggable={isActive && !disabled}
                onMouseUp={isDragging || disabled ? null : onMouseUp}
                onTouchEnd={isDragging || disabled ? null : onTouchEnd}
                onMouseDown={disabled ? null : onMouseDown}
                onTouchStart={disabled ? null : onTouchStart}
                onDragStart={isActive || !disabled ? onDragStart : null}
                onDragEnd={isDragging || !disabled ? onDragEnd : null}
            >
                {dragAndDropIcon}
            </div>
        </div>
    );
};
