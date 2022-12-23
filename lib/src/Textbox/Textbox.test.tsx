import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Textbox, TextboxProps } from ".";
import { act, Simulate } from "react-dom/test-utils";

type PrefixSuffixTestCase = {
    statement: string;
    props: TextboxProps;
    expect: () => void;
};

describe("Component: Textbox", () => {
    let container: HTMLDivElement = null;
    const renderComponent = (props: TextboxProps = {}) => {
        act(() => {
            render(<Textbox {...props} />, container);
        });
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
        renderComponent();
        expect(container).toBeDefined();
    });

    it("Should render with custom id", () => {
        const customId: string = "element-id";
        renderComponent({ id: customId });
        expect(container.querySelector("input").id).toBe(customId);
    });

    it("Should render with label", () => {
        const label: string = "Element label";
        renderComponent({ label });
        expect(container.querySelector("label").textContent).toBe(label);
    });

    it("Should render with instruction", () => {
        const instruction: string = "Element instruction";
        renderComponent({ instruction });
        expect(container.querySelector(".custom-instruction").textContent).toBe(instruction);
    });

    describe("Textbox prefix or suffix", () => {
        const text: string = "kr";
        const mockClickFn: jest.Mock = jest.fn();
        const testCases: Array<PrefixSuffixTestCase> = [
            {
                statement: "Should display prefix",
                props: { leftSlot: text },
                expect: () => expect(container.querySelector(".input-group-text").textContent).toBe(text),
            },
            {
                statement: "Should display prefix with title",
                props: { leftSlot: text, leftSlotTitle: text },
                expect: () => expect(container.querySelector(".input-group-text").getAttribute("title")).toBe(text),
            },
            {
                statement: "Should able to click on prefix",
                props: { leftSlot: text, onLeftClick: mockClickFn },
                expect: () => {
                    act(() => {
                        Simulate.click(container.querySelector(".input-group-prepend"));
                    });
                    expect(mockClickFn).toBeCalled();
                },
            },
            {
                statement: "Should display suffix",
                props: { rightSlot: text },
                expect: () => expect(container.querySelector(".input-group-text").textContent).toBe(text),
            },
            {
                statement: "Should display suffix with title",
                props: { rightSlot: text, rightSlotTitle: text },
                expect: () => expect(container.querySelector(".input-group-text").getAttribute("title")).toBe(text),
            },
            {
                statement: "Should able to click on suffix",
                props: { rightSlot: text, onRightClick: mockClickFn },
                expect: () => {
                    act(() => {
                        Simulate.click(container.querySelector(".input-group-append"));
                    });
                    expect(mockClickFn).toBeCalled();
                },
            },
        ];
        testCases.map((testCase: PrefixSuffixTestCase) => {
            it(testCase.statement, () => {
                renderComponent(testCase.props);
                testCase.expect();
            });
        });
    });
});
