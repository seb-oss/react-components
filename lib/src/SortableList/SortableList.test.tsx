import React from "react";
import { SortableList, SortableItem, SortableItemProps, SortableListProps } from ".";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";

describe("Component: SortableList", () => {
    let container: HTMLDivElement = null;
    const props: SortableListProps = { onSort: jest.fn() };

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render", () => {
        act(() => {
            render(
                <SortableList {...props}>
                    <SortableItem uniqueKey="1" />
                </SortableList>,
                container
            );
        });
        expect(container.querySelector(".sortable-list")).not.toBeNull();
    });

    it("Should pass a custom class and id", () => {
        const className: string = "mySortableListClass";
        const id: string = "mySortableListId";
        act(() => {
            render(
                <SortableList {...props} className={className} id={id}>
                    <SortableItem uniqueKey="1" />
                </SortableList>,
                container
            );
        });
        expect(container.querySelector(`.${className}`)).not.toBeNull();
        expect(container.querySelector(`#${id}`)).not.toBeNull();
    });

    it("Should set children to disabled if disabled prop is passed", () => {
        act(() => {
            render(
                <SortableList {...props} disabled>
                    <SortableItem uniqueKey="1">
                        <input />
                        test
                    </SortableItem>
                </SortableList>,
                container
            );
        });
        expect(container.querySelector(`.disabled`)).not.toBeNull();
        expect(container.querySelector(`input`).hasAttribute("disabled")).toBeTruthy();
    });

    it("Should allow to sort children by drag and drop", () => {
        const children: { key: string; label: string }[] = [
            { key: "1", label: "1" },
            { key: "2", label: "2" },
            { key: "3", label: "3" },
        ];
        act(() => {
            render(
                <SortableList {...props}>
                    {children.map((item) => (
                        <SortableItem key={item.key} uniqueKey={item.key}>
                            {item.label}
                        </SortableItem>
                    ))}
                </SortableList>,
                container
            );
        });
        const node: HTMLElement = container.querySelector(".sortable-item-wrapper");
        (node.getBoundingClientRect as any) = jest.fn(() => {
            return { top: 50, bottom: 500, right: 400, left: 200, height: 100, width: 50 };
        });
        act(() => {
            Simulate.mouseDown(container.querySelector(".drag-icon"), { target: node, pageX: 50, pageY: 50 });
        });
        act(() => {
            Simulate.dragStart(container.querySelector(".drag-icon"), { dataTransfer: { setDragImage: jest.fn() } } as any);
        });
        act(() => {
            Simulate.dragOver(container.querySelectorAll(".sortable-item-wrapper")[1], { dataTransfer: {}, clientY: 50, target: node } as any);
        });
        act(() => {
            Simulate.transitionEnd(container.querySelectorAll(".sortable-item-wrapper")[1]);
        });
        act(() => {
            Simulate.dragEnd(container.querySelector(".drag-icon"));
        });
        expect(props.onSort).toBeCalledWith(["2", "1", "3"]);
    });
});
