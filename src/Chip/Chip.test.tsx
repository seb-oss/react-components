import * as React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Chip } from "./Chip";
import { act } from "react-dom/test-utils";

describe("Component: Chip", () => {
    let container: HTMLDivElement = null;
    let onClose: (e: React.MouseEvent<HTMLDivElement>) => void;

    beforeEach(() => {
        onClose = jest.fn();
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
            render(<Chip onClose={onClose}>Test</Chip>, container);
        });
        expect(container).toBeDefined();
        expect(container.querySelector(".content").textContent).toEqual("Test");
    });

    it("Should render id and className", () => {
        const id: string = "myId";
        const className: string = "myClassName";
        act(() => {
            render(
                <Chip onClose={onClose} id={id} className={className}>
                    Test
                </Chip>,
                container
            );
        });
        expect(container.querySelector(".custom-chip").id).toEqual(id);
        expect(container.querySelector(".custom-chip").classList.contains(className)).toBeTruthy();
    });

    it("Should trigger onClose callback when clicked", () => {
        act(() => {
            render(<Chip onClose={onClose}>Test</Chip>, container);
        });
        act(() => {
            container.querySelector(".chip-close").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(onClose).toHaveBeenCalled();
    });
});
