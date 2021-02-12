import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { Radio } from ".";

const radios: React.ReactElement[] = [
    <Radio key={1} value="Yes">
        Yes
    </Radio>,
    <Radio key={2} value="No">
        No
    </Radio>,
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
            render(<Radio.Group name="test">{radios}</Radio.Group>, container);
        });
        expect(container.firstElementChild).not.toBeNull();
        expect(container.firstElementChild.classList.contains("radio-group")).toBeTruthy();
        expect(container.firstElementChild.children).toHaveLength(radios.length);
    });

    it("Should allow passing a custom classname", () => {
        const className: string = "myclassname";
        act(() => {
            render(<Radio.Group name="test" className={className} />, container);
        });

        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    it("Should capture onChange events from individual radio buttons and emit it as one event", () => {
        const onChange: jest.Mock = jest.fn();

        act(() => {
            render(
                <Radio.Group name="test" onChange={onChange}>
                    {radios}
                </Radio.Group>,
                container
            );
        });

        act(() => Simulate.change(container.querySelector("input")));
        expect(onChange).toBeCalled();
    });

    it("Should render any non radio button components", () => {
        act(() => {
            render(
                <Radio.Group name="test">
                    {radios}
                    test
                </Radio.Group>,
                container
            );
        });

        expect(container.firstElementChild.textContent).toContain("test");
    });
});
