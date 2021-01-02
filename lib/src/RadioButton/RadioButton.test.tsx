import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { RadioButton, RadioButtonProps } from "./RadioButton";

describe("Component: RadioButton", () => {
    let container: HTMLDivElement = null;
    const props: RadioButtonProps = {
        value: "wer",
        label: "label",
        onChange: jest.fn(),
        name: "Gender",
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
            render(<RadioButton {...props} />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myRadiobuttonClass";
        const id: string = "myRadiobuttonId";
        act(() => {
            render(<RadioButton {...props} className={className} id={id} />, container);
        });
        expect(container.querySelector(".custom-radio").classList).toContain(className);
        expect(container.querySelector(`#${id}`)).not.toBeNull();
    });

    it("Should render with random id if id is not passed", () => {
        act(() => {
            render(<RadioButton {...props} label="label" />, container);
        });
        expect(container.querySelector("input").hasAttribute("id")).toBeTruthy();
        expect(container.querySelector("label").getAttribute("for")).toBe(container.querySelector("input").getAttribute("id"));
    });

    it("Should fire a change event", () => {
        act(() => {
            render(<RadioButton {...props} />, container);
        });
        Simulate.change(container.querySelector("input"));
        expect(props.onChange).toHaveBeenCalled();
    });

    it("Should render and display label and description", () => {
        const label: string = "my label";
        const description: string = "my description";
        act(() => {
            render(<RadioButton {...props} label={label} description={description} />, container);
        });
        expect(container.querySelector(`.custom-control-label`)).not.toBeNull();
        expect(container.querySelector(`.custom-control-label`).innerHTML).toContain(label);
        expect(container.querySelector(`.radio-description`)).not.toBeNull();
        expect(container.querySelector(`.radio-description`).innerHTML).toBe(description);
    });

    it("Should render inline and condensed when inline prop is set to true", () => {
        act(() => {
            render(<RadioButton {...props} inline condensed />, container);
        });
        expect(container.querySelector(".custom-radio").classList).toContain("inline");
        expect(container.querySelector(".custom-radio").classList).toContain("condensed");
    });
});
