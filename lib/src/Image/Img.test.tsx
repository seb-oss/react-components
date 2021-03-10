import React from "react";
import { Img } from ".";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { ImgProps } from ".";

type TestCase = { prop: keyof ImgProps; className: string };

const image: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

describe("Component: Image", () => {
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

    it("Should render correctly", () => {
        act(() => {
            render(<Img />, container);
        });
        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("img");

        act(() => {
            render(<Img type="div" />, container);
        });
        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("div");
    });

    it("Should allow passing a custom classname", () => {
        const className: string = "myClassName";

        act(() => {
            render(<Img className={className} />, container);
        });
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();

        act(() => {
            render(<Img type="div" className={className} />, container);
        });
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    describe("Should render with these options responsive, thumbnail and rounded", () => {
        const testCases: Array<TestCase> = [
            { prop: "responsive", className: "img-fluid" },
            { prop: "thumbnail", className: "img-thumbnail" },
            { prop: "rounded", className: "img-rounded" },
        ];
        testCases.map((testCase: TestCase) => {
            test(`- ${testCase.prop}`, () => {
                const props: ImgProps = { [testCase.prop]: true };
                act(() => {
                    render(<Img {...props} />, container);
                });
                expect(container.firstElementChild.classList.contains(testCase.className)).toBeTruthy();

                act(() => {
                    render(<Img type="div" {...props} />, container);
                });
                expect(container.firstElementChild.classList.contains(testCase.className)).toBeTruthy();
            });
        });
    });

    it("Should be able to set the width with attribute, style or use natural width in div image", () => {
        act(() => {
            render(<Img type="div" src={image} width={100} />, container);
        });
        expect(container.firstElementChild.getAttribute("style")).toContain("width: 100px");

        act(() => {
            render(<Img type="div" src={image} style={{ width: 100 }} />, container);
        });
        expect(container.firstElementChild.getAttribute("style")).toContain("width: 100px");
    });

    it("Should calculate the image's natural width and height when its not passed to div image", async () => {
        let promise = new Promise((resolve) => {
            act(() => {
                render(<Img type="div" src={image} onLoad={resolve} />, container);
            });
        });

        await act(async () => {
            await promise;
        });
        const style: string = container.firstElementChild.getAttribute("style");
        expect(style).toContain(`background-image: url(${image})`);
        expect(style).toContain(`width: 1px`);
        expect(style).toContain(`height: 1px`);
    });
});
