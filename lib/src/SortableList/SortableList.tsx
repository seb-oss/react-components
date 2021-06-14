import React from "react";
import classnames from "classnames";
import "./sortable-list.scss";
import { SortableItem } from "./SortableItem";
import { createPortal } from "react-dom";

// This solution is meant to fix Gatsby build which complains that document doesn't exist in server-side rendering
const safeDocument: Document | null = typeof document !== "undefined" ? document : null;

export const SortableList: React.FC = () => {
    const activeItemRef = React.useRef<HTMLDivElement>();
    const dragContainerRef = React.useRef<HTMLDivElement>();
    const [arr, setArr] = React.useState(["a", "b", "c", "d"]);
    const [elRefs, setElRefs] = React.useState<Array<React.MutableRefObject<HTMLDivElement>>>(null);
    const [draggingOrders, setDraggingOrders] = React.useState(arr);
    const [currentItemNode, setCurrentItemNode] = React.useState<HTMLDivElement>(null);
    const [currentItem, setCurrentItem] = React.useState<number>(null);
    const [delta, setDelta] = React.useState<any>({});
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const [isTranslating, setIsTranslating] = React.useState<boolean>(false);

    // const getOverlappedElement = () => {
    //     const overlapped: HTMLElement = Array.from(dragContainerRef.current.children).find((element: HTMLElement) => {
    //         return element.className.indexOf("hidden") === -1 && checkIfElementsOverlapped(element)
    //     }) as HTMLElement;
    //     if (overlapped) {
    //         const nodeRect: DOMRect = overlapped.getBoundingClientRect();
    //         const activeNodeRect: DOMRect = activeItemRef.current.getBoundingClientRect();
    //         const isAbove: boolean = nodeRect.bottom <= activeNodeRect.top;
    //         console.log(overlapped)
    //         let diff = nodeRect.top - activeNodeRect.bottom;
    //         if (isAbove) {
    //             diff = activeNodeRect.top - nodeRect.bottom;
    //         }
    //         const half = Math.abs(diff) / nodeRect.height >= 0.5;
    //         // if (half) {
    //             // setIsTranslating(true);
    //             overlapped.style.transform = `translate3d(0, ${isAbove ? "" : "-"}${overlapped.offsetHeight}px, 0)`;
    //             setArr(() => {
    //                 return arr.map((item) => item);
    //             })
    //         // }
    //     }
    // }

    const getOverlappedElement = () => {
        // const overlapped: HTMLElement = Array.from(dragContainerRef.current.children).find((element: HTMLElement) => {
        //     return element.className.indexOf("hidden") === -1 && checkIfElementsOverlapped(element)
        // }) as HTMLElement;
        const activeNodeRect: DOMRect = activeItemRef.current.getBoundingClientRect();
        Array.from(dragContainerRef.current.children).map((element: HTMLElement, index: number) => {
            const nodeRect: DOMRect = element.getBoundingClientRect();
            const isAbove: boolean = nodeRect.bottom <= activeNodeRect.top;
            let diff = nodeRect.top - activeNodeRect.bottom;
            if (isAbove) {
                diff = activeNodeRect.top - nodeRect.bottom;
            }
            const half = Math.abs(diff) / nodeRect.height >= 0.8;
            const isOverlapped: boolean = half && element.className.indexOf("hidden") === -1 && checkIfElementsOverlapped(element);
            element.style.transform = isOverlapped && !isTranslating ? `translate3d(0, ${isAbove ? "" : "-"}${element.offsetHeight}px, 0)` : null;
            if (isOverlapped && !isTranslating) {
                setIsTranslating(isOverlapped);
                window.requestAnimationFrame((timestamp) => {
                    // console.log(elapsed, timestamp)
                    // if (elapsed > 200) {
                    // setTimeout(() => {
                    setDraggingOrders((oldOrders) => {
                        setIsTranslating(false);
                        const newList = oldOrders.filter((value) => value !== arr[currentItem]);
                        newList.splice(index, 0, arr[currentItem]);
                        return newList;
                    });
                    // }, 500)
                    // }
                });
            }
        });

        // if (overlapped) {
        //     const nodeRect: DOMRect = overlapped.getBoundingClientRect();
        //     const activeNodeRect: DOMRect = activeItemRef.current.getBoundingClientRect();
        //     const isAbove: boolean = nodeRect.bottom <= activeNodeRect.top;
        //     let diff = nodeRect.top - activeNodeRect.bottom;
        //     if (isAbove) {
        //         diff = activeNodeRect.top - nodeRect.bottom;
        //     }
        //     const half = Math.abs(diff) / nodeRect.height >= 0.5;
        //     // if (half) {
        //         // setIsTranslating(true);
        //         overlapped.style.transform = `translate3d(0, ${isAbove ? "" : "-"}${overlapped.offsetHeight}px, 0)`;
        //         setArr(() => {
        //             return arr.map((item) => item);
        //         })
        //     // }
        // }
    };

    const checkIfElementsOverlapped = (node: HTMLElement) => {
        const nodeRect: DOMRect = node.getBoundingClientRect();
        const activeNodeRect: DOMRect = activeItemRef.current.getBoundingClientRect();
        return activeNodeRect.right >= nodeRect.left && activeNodeRect.left <= nodeRect.right && activeNodeRect.bottom >= nodeRect.top && activeNodeRect.top <= nodeRect.bottom;
    };

    const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index) => {
        setIsDragging(() => {
            const parent: HTMLDivElement = (event.target as HTMLDivElement).closest(".sortable-item");
            setDelta({
                x: event.pageX - parent.getBoundingClientRect().left,
                y: event.pageY - parent.getBoundingClientRect().top,
            });
            setCurrentItem(index);
            setCurrentItemNode(parent);
            return true;
        });
    };
    const onMouseMove = (e) => {
        if (isDragging) {
            activeItemRef.current.style.top = `${Math.min(
                // set boundary for draggable element
                dragContainerRef.current.getBoundingClientRect().bottom,
                Math.max(dragContainerRef.current.getBoundingClientRect().top, e.pageY - delta.y)
            )}px`;
            getOverlappedElement();
        }
    };

    const onMouseUp = (e) => {
        setIsDragging(() => {
            setCurrentItem(null);
            setCurrentItemNode(null);
            elRefs.map((ref: React.MutableRefObject<HTMLElement>, index: number) => {
                const element: HTMLElement = ref.current;
                element.style.transform = null;
            });
            setArr(draggingOrders);
            return false;
        });
    };

    React.useEffect(() => {
        if (currentItem !== null && currentItemNode && activeItemRef?.current) {
            const position = currentItemNode.getBoundingClientRect();
            activeItemRef.current.style.width = `${position.width}px`;
            activeItemRef.current.style.height = `${position.height}px`;
            activeItemRef.current.style.top = `${position.top}px`;
            activeItemRef.current.style.left = `${position.left}px`;
        }
    }, [currentItem, activeItemRef, currentItemNode]);

    React.useEffect(() => {
        setIsDragging(() => {
            // Array.from(dragContainerRef.current.children).forEach((element: HTMLElement) => {
            //     element.style.transform = null;
            // })
            return false;
        });
        // add or remove refs
        setElRefs((elRefs) => arr.map((_, i) => (elRefs ? elRefs[i] : React.createRef())));
    }, [arr]);

    React.useLayoutEffect(() => {
        console.log(elRefs);
    });

    return (
        <div className="rc column-customiser">
            <div className="drop-container" ref={dragContainerRef}>
                {(currentItem === null ? arr : draggingOrders).map((item, index) => (
                    <SortableItem
                        key={index}
                        index={item}
                        ref={elRefs && elRefs[index]}
                        ghostRef={activeItemRef}
                        isActive={currentItem !== null && item === arr[currentItem]}
                        className={"card mb-1"}
                        onMouseDown={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => onMouseDown(ev, index)}
                    >
                        <div className="drag">=</div>
                        <div>
                            {currentItem === null ? "" : "draaagggg"}
                            {item}
                        </div>
                    </SortableItem>
                ))}
                {currentItem !== null &&
                    createPortal(
                        <div
                            onMouseDown={() => console.log("dd")}
                            onMouseMove={onMouseMove}
                            data-value={currentItem}
                            onMouseUp={onMouseUp}
                            onMouseLeave={onMouseUp}
                            ref={activeItemRef}
                            className={classnames("rc", "sortable-item", "ghost-item", "card mb-1")}
                        >
                            <div className="drag">=</div>
                            <div>
                                {currentItem === null ? "" : "draaagggg"}
                                {arr[currentItem]}
                            </div>
                        </div>,
                        safeDocument.body
                    )}
            </div>
        </div>
    );
};
