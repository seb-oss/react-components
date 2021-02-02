import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { RadioGroup } from ".";
import { RadioButton } from "../RadioButton";

const radios: React.ReactElement[] = [
    <RadioButton key={1} value="Yes">
        Yes
    </RadioButton>,
    <RadioButton key={2} value="No">
        No
    </RadioButton>,
];

describe("Component: RadioGroup", () => {
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
            render(<RadioGroup name="test">{radios}</RadioGroup>, container);
        });
        expect(container.firstElementChild).not.toBeNull();
        expect(container.firstElementChild.classList.contains("radio-group")).toBeTruthy();
        expect(container.firstElementChild.children).toHaveLength(radios.length);
    });

    it("Should allow passing a custom classname", () => {
        const className: string = "myclassname";
        act(() => {
            render(<RadioGroup name="test" className={className} />, container);
        });

        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    it("Should capture onChange events from individual radio buttons and emit it as one event", () => {
        const onChange: jest.Mock = jest.fn();

        act(() => {
            render(
                <RadioGroup name="test" onChange={onChange}>
                    {radios}
                </RadioGroup>,
                container
            );
        });

        act(() => Simulate.change(container.querySelector("input")));
        expect(onChange).toBeCalled();
    });

    it("Should render any non radio button components", () => {
        act(() => {
            render(
                <RadioGroup name="test">
                    {radios}
                    test
                </RadioGroup>,
                container
            );
        });

        expect(container.firstElementChild.textContent).toContain("test");
    });
});
