import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { ToggleSelector, ToggleSelectorProps } from ".";
import { ToggleSelectorItem, ToggleSelectorItemProps } from "./ToggleSelectorItem";

describe("Component: ToggleSelector", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        jest.clearAllMocks();
    });

    it("Should render simple toggle selector", () => {
        act(() => {
            render(<ToggleSelector />, container);
        });

        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("toggle-selector")).toBeTruthy();
    });

    it("Should allow passing a custom className", () => {
        const className: string = "myClassName";

        act(() => {
            render(<ToggleSelector className={className} />, container);
        });

        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    it("Should render children correctly", () => {
        act(() => {
            render(
                <ToggleSelector>
                    <ToggleSelectorItem>Yes</ToggleSelectorItem>
                    <ToggleSelectorItem>No</ToggleSelectorItem>
                </ToggleSelector>,
                container
            );
        });

        let inputs = container.querySelectorAll("input");

        expect(inputs).toHaveLength(2);
        // Taking one as an example
        expect(inputs.item(0).name).not.toBe("");
        expect(inputs.item(0).type).toEqual("radio");
        expect(inputs.item(0).getAttribute("data-index-number")).toEqual("0");

        act(() => {
            render(
                <ToggleSelector multiple>
                    <ToggleSelectorItem>Yes</ToggleSelectorItem>
                    <ToggleSelectorItem>No</ToggleSelectorItem>
                </ToggleSelector>,
                container
            );
        });

        inputs = container.querySelectorAll("input");

        expect(inputs.item(0).name).toBe("");
        expect(inputs.item(0).type).toEqual("checkbox");
    });

    it("Should reflect value correctly", () => {
        interface ValueTestCase {
            multiple: boolean;
            expected: [boolean, boolean];
            value: number | number[];
        }

        const cases: ValueTestCase[] = [
            { multiple: false, expected: [true, false], value: 0 },
            { multiple: false, expected: [false, true], value: 1 },
            { multiple: false, expected: [false, false], value: null },
            { multiple: true, expected: [true, false], value: [0] },
            { multiple: true, expected: [false, true], value: [1] },
            { multiple: true, expected: [true, true], value: [0, 1] },
            { multiple: true, expected: [true, true], value: [0, 1] },
            { multiple: true, expected: [false, false], value: "invalid" as any },
            { multiple: true, expected: [false, false], value: null },
        ];

        let inputs: NodeListOf<HTMLInputElement>;

        cases.forEach((testCase: ValueTestCase) => {
            act(() => {
                render(
                    <ToggleSelector value={testCase.value as any} multiple={testCase.multiple}>
                        <ToggleSelectorItem>Yes</ToggleSelectorItem>
                        <ToggleSelectorItem>No</ToggleSelectorItem>
                    </ToggleSelector>,
                    container
                );
            });

            inputs = container.querySelectorAll("input");

            expect(inputs.item(0).checked).toBe(testCase.expected[0]);
            expect(inputs.item(1).checked).toBe(testCase.expected[1]);
        });
    });

    it("Should handle change correctly", () => {
        interface ChangeTestCase {
            multiple: boolean;
            value: number | number[];
            calledWith: number | number[];
            changeOn: number;
        }

        const testCases: ChangeTestCase[] = [
            { multiple: false, value: null, changeOn: 0, calledWith: 0 },
            { multiple: false, value: 0, changeOn: 1, calledWith: 1 },
            { multiple: false, value: 1, changeOn: 0, calledWith: 0 },
            { multiple: true, value: null, changeOn: 0, calledWith: [0] },
            { multiple: true, value: [0], changeOn: 0, calledWith: [] },
            { multiple: true, value: [0], changeOn: 1, calledWith: [0, 1] },
            { multiple: true, value: [1], changeOn: 0, calledWith: [0, 1] },
            { multiple: true, value: [0, 1], changeOn: 0, calledWith: [1] },
        ];

        const onChange: jest.Mock = jest.fn();

        testCases.forEach((testCase: ChangeTestCase) => {
            onChange.mockReset();

            act(() => {
                render(
                    <ToggleSelector value={testCase.value as any} onChange={onChange} multiple={testCase.multiple}>
                        <ToggleSelectorItem>Yes</ToggleSelectorItem>
                        <ToggleSelectorItem>No</ToggleSelectorItem>
                    </ToggleSelector>,
                    container
                );
            });

            act(() => {
                Simulate.change(container.querySelectorAll("input").item(testCase.changeOn));
                expect(onChange).toBeCalledWith(testCase.calledWith);
            });
        });
    });

    it("Should pass on change event to individual items when an event handler is passed", () => {
        const onChange: jest.Mock = jest.fn();

        act(() => {
            render(
                <ToggleSelector>
                    <ToggleSelectorItem onChange={onChange}>Yes</ToggleSelectorItem>
                    <ToggleSelectorItem>No</ToggleSelectorItem>
                </ToggleSelector>,
                container
            );
        });

        act(() => {
            Simulate.change(container.querySelector("input"));
        });

        expect(onChange).toBeCalled();
    });

    it("Should allow non elements to render as children", () => {
        const content: string = "my content";

        act(() => {
            render(
                <ToggleSelector>
                    <ToggleSelectorItem>Yes</ToggleSelectorItem>
                    {content}
                    <ToggleSelectorItem>No</ToggleSelectorItem>
                </ToggleSelector>,
                container
            );
        });

        expect(container.innerHTML).toContain(content);
    });
});
