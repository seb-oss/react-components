import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { RadioGroup, RadioGroupProps } from "./RadioGroup";
import { RadioButtonProps } from "./RadioButton/RadioButton";

describe("Component: RadioGroup", () => {
    let container: HTMLDivElement = null;
    const props: RadioGroupProps<string> = {
        list: [
            { value: "option1", label: "option1" },
            { value: "option2", label: "option2", description: "desc" },
            { value: "option3", label: "option3", disabled: true },
        ],
        onChange: jest.fn(),
        value: "male",
        name: "gender",
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
            render(<RadioGroup {...props} />, container);
        });
        expect(container.querySelector(".rc.radio-group")).not.toBeNull();
    });

    it("Should pass custom class", () => {
        const className: string = "myRadioGroupClass";
        const id: string = "myRadioGroupId";
        act(() => {
            render(<RadioGroup {...props} className={className} id={id} />, container);
        });
        expect(container.querySelector(".rc.radio-group").classList).toContain(className);
        expect(container.querySelector(`#${id}`)).not.toBeNull();
    });

    it("Should fire change event when radio group value changes", () => {
        act(() => {
            render(<RadioGroup {...props} />, container);
        });
        Simulate.change(container.querySelector("input"));
        expect(props.onChange).toHaveBeenCalled();
    });

    it("Should render and display group label, items' label and description, and group error", () => {
        const label: string = "my label";
        act(() => {
            render(<RadioGroup {...props} label={label} />, container);
        });
        // Group Label
        expect(container.querySelector(`.radio-group-label`)).not.toBeNull();
        expect(container.querySelector(`.radio-group-label`).innerHTML).toContain(label);
        // Item label and description
        expect(container.querySelectorAll(".custom-control")[0].querySelector(".custom-control-label").innerHTML).toEqual(props.list[0].label);
        expect(container.querySelectorAll(".custom-control")[1].querySelector(".radio-description")).not.toBeNull();
        expect(container.querySelectorAll(".custom-control")[1].querySelector(".radio-description").innerHTML).toEqual(props.list[1].description);
    });

    it("Should render group items in inline mode", () => {
        act(() => {
            render(<RadioGroup {...props} condensed inline />, container);
        });
        expect(container.querySelector(".rc.radio-group").classList).toContain("inline");
        expect(container.querySelector(".rc.radio-group").classList).toContain("condensed");
    });

    it("Should render disabled inputs when disabled is passed in item or in disabled prop", () => {
        act(() => {
            render(<RadioGroup {...props} />, container);
        });
        expect(container.querySelectorAll(".custom-control")[2].querySelector(".custom-control-input").hasAttribute("disabled")).toBeTruthy();
        act(() => {
            render(<RadioGroup {...props} disabled />, container);
        });
        props.list.map((item: RadioButtonProps, index: number) => {
            expect(container.querySelectorAll(".custom-control")[index].querySelector(".custom-control-input").hasAttribute("disabled")).toBeTruthy();
        });
    });
});
