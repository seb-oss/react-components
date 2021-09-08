import React from "react";
import { SortableItem, SortableItemProps } from ".";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

describe("Component: SortableItem", () => {
    let container: HTMLDivElement = null;
    const props: SortableItemProps = { uniqueKey: "1" };

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
            render(<SortableItem {...props} />, container);
        });
        expect(container.querySelector(".sortable-item")).not.toBeNull();
    });

    it("Should pass a custom class and id", () => {
        const className: string = "mySortableItemClass";
        const id: string = "mySortableItemId";
        act(() => {
            render(<SortableItem {...props} className={className} id={id} />, container);
        });
        expect(container.querySelector(`.${className}`)).not.toBeNull();
        expect(container.querySelector(`#${id}`)).not.toBeNull();
    });

    it("Should set children to disabled if disabled prop is passed", () => {
        act(() => {
            render(
                <SortableItem {...props} disabled>
                    <input />
                    test
                </SortableItem>,
                container
            );
        });
        expect(container.querySelector(`input`).hasAttribute("disabled")).toBeTruthy();
    });
});
