import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Rating, RatingProps } from "./Rating";

describe("Component: Rating", () => {
    let container: HTMLDivElement = null;

    const props: RatingProps = {
        initialValue: 1,
        max: 5,
        min: 1,
    };

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
            render(<Rating {...props} />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should render and pass custom class", () => {
        const className: string = "myCustomClass";

        act(() => {
            render(<Rating wrapperProps={{ className }} />, container);
        });

        expect(container).toBeDefined();

        expect(container.querySelector(`.${className}`)).toBeTruthy();
        expect(container.querySelectorAll(`.${className}`).length).toEqual(1);

        act(() => {
            render(<Rating {...{ ...props, className }} />, container);
        });

        expect(container.querySelectorAll(`input.${className}`).length).toEqual(1);
    });

    it("Should pass any other native html prop", () => {
        const id: string = "my-id";

        act(() => {
            render(<Rating {...{ ...props, id }} />, container);
        });
        expect(container).toBeDefined();

        expect(container.firstElementChild);
        expect(container.querySelector("input").id).toEqual(id);
    });

    it("Should contain 5 svgs", () => {
        act(() => {
            render(<Rating {...props} />, container);
        });
        expect(container.querySelector(".rating-icons").children.length).toEqual(5);

        act(() => {
            render(<Rating {...{ ...props, max: 2 }} />, container);
        });
        expect(container.querySelector(".rating-icons").children.length).toEqual(2);
    });

    it("should not be clicked if props.readyOnly is true", () => {
        const readOnly: boolean = true;
        const onChange: jest.Mock = jest.fn();
        act(() => {
            render(<Rating {...{ ...props, readOnly }} onChange={onChange} />, container);
        });
        const inputElement: HTMLInputElement = container.querySelector(".rating input");
        act(() => {
            Simulate.change(inputElement, { clientX: 657 });
        });
        expect(onChange).not.toBeCalled();
    });

    it("should contain correct colors if passed", () => {
        act(() => {
            render(<Rating {...{ ...props }} />, container);
        });

        expect(container.querySelector("svg #full_grad").querySelector("stop").getAttribute("stop-color")).toEqual("#FFC500");

        const colors: [string, string] = ["black", "white"];
        act(() => {
            render(<Rating {...{ ...props, colors }} />, container);
        });

        expect(container.querySelector("svg #full_grad").querySelector("stop").getAttribute("stop-color")).toEqual(colors[1]);
        expect(container.querySelector("svg #no_grad").querySelector("stop").getAttribute("stop-color")).toEqual(colors[0]);
    });

    const ratingColorTestCases: Array<any> = [
        {
            boundingClientRect: { left: 0, width: 200 },
            clientX: 0,
            hoveredIndex: 0,
            expectedColors: {
                noGrad: 5,
                fullGrad: 0,
                dynamicGrad: 0,
            },
        },
        {
            boundingClientRect: { left: 555, width: 200 },
            clientX: 657,
            hoveredIndex: 2,
            expectedColors: {
                noGrad: 2,
                fullGrad: 2,
                dynamicGrad: 1,
            },
        },
        {
            boundingClientRect: { left: 200, width: 200 },
            clientX: 657,
            hoveredIndex: 5,
            expectedColors: {
                noGrad: 0,
                fullGrad: 5,
                dynamicGrad: 0,
            },
        },
    ];

    for (const testCase of ratingColorTestCases) {
        test(`should render ${testCase.expectedColors.noGrad} filled with #no_grad and ${testCase.expectedColors.fullGrad} filled with #full_grad and ${testCase.expectedColors.dynamicGrad} filled with #dynamic_grad`, () => {
            const getBoundingClientRectMock = jest.fn(() => testCase.boundingClientRect);
            act(() => {
                render(<Rating {...props} />, container);
            });
            const inputElement: HTMLInputElement = container.querySelector(".rating input");
            (inputElement.getBoundingClientRect as any) = jest.fn(() => {
                return getBoundingClientRectMock();
            });
            act(() => {
                Simulate.mouseEnter(inputElement, { clientX: testCase.clientX });
            });
            const component = container.querySelector(".rating");
            expect(component.querySelectorAll(`[fill="url(#dynamic_grad${testCase.hoveredIndex})"]`).length).toEqual(testCase.expectedColors.dynamicGrad);
            expect(component.querySelectorAll('[fill="url(#no_grad)"]').length).toEqual(testCase.expectedColors.noGrad);
            expect(component.querySelectorAll('[fill="url(#full_grad)"]').length).toEqual(testCase.expectedColors.fullGrad);
        });
    }

    it("should change svgs colors when mouseEnter and match the value when mouseLeave", () => {
        act(() => {
            render(<Rating {...props} />, container);
        });
        const component = container.querySelector(".rating");
        expect(component.querySelectorAll('[fill="url(#no_grad)"]').length).toEqual(5);
        expect(component.querySelectorAll('[fill="url(#full_grad)"]').length).toEqual(0);
        const getBoundingClientRect = jest.fn(() => {
            return { left: 555, width: 200 };
        });
        const inputElement: HTMLInputElement = container.querySelector(".rating input");
        (inputElement.getBoundingClientRect as any) = jest.fn(() => {
            return getBoundingClientRect();
        });
        act(() => {
            Simulate.mouseEnter(inputElement, { clientX: 657 });
        });

        expect(component.querySelectorAll(`[fill="url(#dynamic_grad2)"]`).length).toEqual(1);
        expect(component.querySelectorAll('[fill="url(#no_grad)"]').length).toEqual(2);
        expect(component.querySelectorAll('[fill="url(#full_grad)"]').length).toEqual(2);

        act(() => {
            Simulate.mouseLeave(inputElement);
        });

        expect(component.querySelectorAll('[fill="url(#no_grad)"]').length).toEqual(5);
        expect(component.querySelectorAll('[fill="url(#full_grad)"]').length).toEqual(0);
    });

    it("should change svgs colors when mouseEnter and keep the same colors after clicking and mouseLeave", () => {
        let value: string = "1";
        const onChange: jest.Mock = jest.fn();
        act(() => {
            render(<Rating {...props} onChange={onChange} value={value} step={1} />, container);
        });
        const getBoundingClientRect = jest.fn(() => {
            return { left: 200, width: 200 };
        });
        const inputElement: HTMLInputElement = container.querySelector(".rating input");
        (inputElement.getBoundingClientRect as any) = jest.fn(() => {
            return getBoundingClientRect();
        });
        act(() => {
            Simulate.change(inputElement, { clientX: 657 });
        });

        expect(onChange).toBeCalled();
    });

    it("Should have a custom svg if passed as prop", () => {
        expect(container.querySelector("svg #custom-svg")).toBeFalsy();
        const customSVG = (
            <svg id="custom-svg" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
            </svg>
        );
        act(() => {
            render(<Rating {...props} customSVG={customSVG} />, container);
        });
        expect(container).toBeDefined();
        expect(container.querySelector("svg #custom-svg")).toBeTruthy();
    });

    it("should display only full colors if step = 1", () => {
        act(() => {
            render(<Rating {...props} step={1} />, container);
        });
        const getBoundingClientRect = jest.fn(() => {
            return { left: 555, width: 200 };
        });
        const inputElement: HTMLInputElement = container.querySelector(".rating input");
        (inputElement.getBoundingClientRect as any) = jest.fn(() => {
            return getBoundingClientRect();
        });
        act(() => {
            Simulate.mouseEnter(inputElement, { clientX: 657 });
        });

        const component = container.querySelector(".rating");
        expect(component.querySelectorAll(`[fill="url(#dynamic_grad2)"]`).length).toEqual(0);
        expect(component.querySelectorAll('[fill="url(#no_grad)"]').length).toEqual(2);
        expect(component.querySelectorAll('[fill="url(#full_grad)"]').length).toEqual(3);
    });

    it("should display only full colors if step = 0.5", () => {
        act(() => {
            render(<Rating {...props} step={0.5} min={0.5} />, container);
        });
        const getBoundingClientRect = jest.fn(() => {
            return { left: 512, width: 200 };
        });
        const inputElement: HTMLInputElement = container.querySelector(".rating input");
        (inputElement.getBoundingClientRect as any) = jest.fn(() => {
            return getBoundingClientRect();
        });
        act(() => {
            Simulate.mouseEnter(inputElement, { clientX: 605 });
        });

        const component = container.querySelector(".rating");

        expect(component.querySelectorAll(`[fill="url(#half_grad)"]`).length).toEqual(1);
        expect(component.querySelectorAll('[fill="url(#no_grad)"]').length).toEqual(2);
        expect(component.querySelectorAll('[fill="url(#full_grad)"]').length).toEqual(2);
    });
});
