import React from "react";
import { DivImage } from ".";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { CommonImageProps } from "./CommonType";
import { DivImageProps } from "./DivImage";
const src: string = "data:image/gif;base64,R0lGODdhDwAPAPAAAP///yZFySH5BAEAAAEALAAAAAAPAA8AAAINhI+py+0Po5y02otnAQA7";

type TestCase = { prop: keyof CommonImageProps; className: string };

describe("Component: Image", () => {
    let container: HTMLDivElement = null;

    function fakeImageConstructor(props: DivImageProps) {
        jest.useFakeTimers();

        Object.defineProperty(global, "Image", {
            value: class {
                constructor() {
                    setTimeout(() => {
                        const loadEv: Event = new Event("load", { bubbles: true });
                        const errorEv: Event = new Event("error", { bubbles: true });
                        jest.spyOn(loadEv, "currentTarget", "get").mockImplementation(() => ({ naturalHeight: 15, naturalWidth: 15 } as HTMLImageElement));
                        ((this as unknown) as HTMLImageElement).onload(loadEv);
                        ((this as unknown) as HTMLImageElement).onerror(errorEv);
                    }, 100);
                }
            },
        });

        act(() => {
            render(<DivImage {...props} />, container);
        });
        act(() => jest.advanceTimersToNextTimer());
        act(() => jest.clearAllTimers());
    }

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
            render(<DivImage />, container);
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
                const props: CommonImageProps = { [testCase.prop]: true };
                act(() => {
                    render(<DivImage {...props} />, container);
                });
                expect(container.firstElementChild.classList.contains(testCase.className)).toBeTruthy();
            });
        });
    });

    it("Should render with default image size unless size is passed", () => {
        fakeImageConstructor({ src });
        expect(container.firstElementChild.getAttribute("style")).toContain(`background-image: url(${src});`);
        expect(container.firstElementChild.getAttribute("style")).toContain("width: 15px;");
        expect(container.firstElementChild.getAttribute("style")).toContain("height: 15px;");
    });

    it("Should call onLoad when the image loads and onError on when it doesn't", () => {
        const onLoad: jest.Mock = jest.fn();
        const onError: jest.Mock = jest.fn();

        fakeImageConstructor({ onLoad, src });
        expect(onLoad).toHaveBeenCalled();

        fakeImageConstructor({ onError, src: "invalid_url" });
        expect(onError).toHaveBeenCalled();
    });

    it("Should be able to override width, height, and background image from styles", () => {
        const src2: string = "data:image/gif;base64,R0lGODdhDwAPAPAAAP///yZFySH5BAEAAAEALAAAAAAPAA8AAAINhI+py+";
        fakeImageConstructor({ src, width: 100, height: 100 });
        expect(container.firstElementChild.getAttribute("style")).toContain("width: 100px;");
        expect(container.firstElementChild.getAttribute("style")).toContain("height: 100px;");

        fakeImageConstructor({ src, style: { width: 150, height: 150, backgroundImage: `url(${src2})` } });
        expect(container.firstElementChild.getAttribute("style")).toContain("width: 150px;");
        expect(container.firstElementChild.getAttribute("style")).toContain("height: 150px;");
        expect(container.firstElementChild.getAttribute("style")).toContain(`background-image: url(${src2});`);
    });
});
