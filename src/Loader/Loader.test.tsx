import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Loader, LoaderSize, LoaderType } from "./Loader";

describe("Component: Loader", () => {
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
        act(() => {
            render(<Loader />, container);
        });
        expect(container.firstElementChild).not.toBeNull();
    });

    it("Should display backdrop and either cover or fullscreen when passed and cover only when both are passed", () => {
        act(() => {
            render(<Loader cover />, container);
        });
        expect(container.firstElementChild.classList.contains("loader-cover")).toBeTruthy();

        act(() => {
            render(<Loader fullscreen backdrop />, container);
        });
        expect(container.firstElementChild.classList.contains("loader-fullscreen")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("loader-backdrop")).toBeTruthy();

        act(() => {
            render(<Loader cover fullscreen />, container);
        });
        expect(container.firstElementChild.classList.contains("loader-cover")).toBeTruthy();
    });

    describe("Should render with all supported sizes", () => {
        const sizeList: Array<LoaderSize> = ["xs", "sm", "md", "lg"];
        sizeList.map((size: LoaderSize) => {
            test(`- size (${size})`, () => {
                act(() => {
                    render(<Loader size={size} />, container);
                });
                expect(container.firstElementChild.classList.contains(`loader-${size}`)).toBeTruthy();
            });
        });
    });

    describe("Should render with all supported types", () => {
        const typeList: Array<LoaderType> = ["spinner", "square"];
        typeList.map((type: LoaderType) => {
            test(`- type (${type})`, () => {
                act(() => {
                    render(<Loader type={type} />, container);
                });
                expect(container.firstElementChild.classList.contains(`loader-${type}`)).toBeTruthy();
            });
        });
    });

    it("Should render custom classname", () => {
        const className: string = "custom-classname";
        act(() => {
            render(<Loader className={className} />, container);
        });
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    it("Should render children under the loader and sr-only at the end with option to pass custom text to it", () => {
        const text: string = "testing...";
        const srText: string = "sr text";
        act(() => {
            render(
                <Loader srText={srText}>
                    <p>{text}</p>
                </Loader>,
                container
            );
        });
        expect(container.firstElementChild.firstElementChild.tagName.toUpperCase()).toEqual("SVG");
        expect(container.firstElementChild.children.item(1).tagName.toUpperCase()).toEqual("P");
        expect(container.firstElementChild.children.item(1).textContent).toEqual(text);
        expect(container.firstElementChild.lastElementChild.tagName.toUpperCase()).toEqual("SPAN");
        expect(container.firstElementChild.lastElementChild.classList.contains("sr-only")).toBeTruthy();
        expect(container.firstElementChild.lastElementChild.textContent).toEqual(srText);
    });
});
