import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { ButtonGroup, ButtonGroupSizes } from ".";

type ButtonTestItem<T, K> = { value: T; expected: K };

describe("Component: ButtonGroup", () => {
    let container: HTMLDivElement = null;

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
        const text: string = "Test";
        act(() => {
            render(<ButtonGroup>{text}</ButtonGroup>, container);
        });
        expect(container.firstElementChild).toBeDefined();
        expect(container.firstElementChild.innerHTML).toEqual(text);
    });

    it("Should render custom className", () => {
        const className: string = "myButtonGroupClass";
        act(() => {
            render(<ButtonGroup className={className} />, container);
        });
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    describe("Should render supported sizes", () => {
        const list: Array<ButtonTestItem<ButtonGroupSizes, string>> = [
            { value: "lg", expected: "btn-group-lg" },
            { value: "md", expected: "btn-group-md" },
            { value: "sm", expected: "btn-group-sm" },
        ];
        list.map((item: ButtonTestItem<ButtonGroupSizes, string>) => {
            it(`Size: ${item.value} - Expected to render (${item.expected})`, () => {
                act(() => {
                    render(<ButtonGroup size={item.value} />, container);
                });
                expect(container.firstElementChild.classList.contains(item.expected)).toBeTruthy();
            });
        });
    });

    it("Should render vertical", () => {
        act(() => {
            render(<ButtonGroup vertical />, container);
        });
        expect(container.firstElementChild.classList.contains("btn-group-vertical")).toBeTruthy();
    });
});
