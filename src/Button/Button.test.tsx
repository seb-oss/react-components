import * as React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Button, ButtonTheme, ButtonSizes } from "./Button";

type ButtonTestItem<T, K> = { value: T; expected: K };

describe("Component: Button", () => {
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
            render(<Button>{text}</Button>, container);
        });
        expect(container.firstElementChild).toBeDefined();
        expect(container.firstElementChild.innerHTML).toEqual(text);
    });

    it("Should render custom className", () => {
        const className: string = "myButtonClass";
        act(() => {
            render(<Button className={className} />, container);
        });
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    describe("Should render supported themes", () => {
        const list: Array<ButtonTestItem<ButtonTheme, string>> = [
            { value: "primary", expected: "btn-primary" },
            { value: "outline-primary", expected: "btn-outline-primary" },
            { value: "secondary", expected: "btn-secondary" },
            { value: "dark", expected: "btn-dark" },
            { value: "light", expected: "btn-light" },
            { value: "link", expected: "btn-link" },
            { value: "danger", expected: "btn-danger" },
            { value: "outline-danger", expected: "btn-outline-danger" },
        ];
        list.map((item: ButtonTestItem<ButtonTheme, string>) => {
            it(`Size: ${item.value} - Expected to render (btn-${item.expected})`, () => {
                act(() => {
                    render(<Button theme={item.value} />, container);
                });
                expect(container.firstElementChild.classList.contains(item.expected));
            });
        });
    });

    describe("Should render supported sizes", () => {
        const list: Array<ButtonTestItem<ButtonSizes, string>> = [
            { value: "lg", expected: "btn-lg" },
            { value: "md", expected: "btn-md" },
            { value: "sm", expected: "btn-sm" },
        ];
        list.map((item: ButtonTestItem<ButtonSizes, string>) => {
            it(`Size: ${item.value} - Expected to render (btn-${item.expected})`, () => {
                act(() => {
                    render(<Button size={item.value} />, container);
                });
                expect(container.firstElementChild.classList.contains(item.expected));
            });
        });
    });

    it("Should render icon inside button", () => {
        act(() => {
            render(
                <Button>
                    <svg id="mySvg" />
                </Button>,
                container
            );
        });
        expect(container.firstElementChild.firstElementChild).toBeDefined();
        expect(container.firstElementChild.firstElementChild.id).toEqual("mySvg");
    });
});
