import React from "react";
import { Img } from ".";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { ImgProps } from ".";

type TestCase = { prop: keyof ImgProps; className: string };

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

    it("Should render", () => {
        act(() => {
            render(<Img />, container);
        });
        expect(container.firstElementChild).not.toBeNull();
    });

    describe("Testing common image options", () => {
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
            });
        });
    });
});
