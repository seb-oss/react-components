import * as React from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import { RadioButton, RadioButtonProps } from "./RadioButton";

describe("Component: RadioButton", () => {
    let wrapper: ShallowWrapper<RadioButtonProps>;
    const props: RadioButtonProps = {
        value: "wer",
        label: "label",
        onChange: jest.fn(),
        name: "Gender",
        radioValue: "male",
    };

    beforeEach(() => {
        wrapper = shallow(<RadioButton {...props} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myRadiobuttonClass";
        const id: string = "myRadiobuttonId";
        const mountedWrapper: ReactWrapper<RadioButtonProps> = mount(<RadioButton {...props} className={className} id={id} />);
        expect(mountedWrapper.hasClass(className)).toBeTruthy();
        expect(mountedWrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should render with random id if id is not passed", async (done: jest.DoneCallback) => {
        expect.assertions(2);
        const mountedWrapper: ReactWrapper<RadioButtonProps> = mount(<RadioButton {...props} label="label" />);
        setTimeout(() => {
            expect(mountedWrapper.find("input").getElement().props.id).toBeTruthy();
            expect(mountedWrapper.find("label").getElement().props.htmlFor).toBeDefined();
            done();
        });
    });

    it("Should fire a change event", () => {
        wrapper.find("input").simulate("change", { target: { value: "test-value" } });
        expect(props.onChange).toHaveBeenCalled();
    });

    it("Should render and display label and description", () => {
        const label: string = "my label";
        const description: string = "my description";
        const topLabel: string = "my top label";
        wrapper.setProps({ label, description, topLabel });
        expect(wrapper.find(".custom-control-label").length).toBe(1);
        expect(wrapper.find(".custom-control-label").text().indexOf(label)).not.toEqual(-1);
        expect(wrapper.find(".radio-description").length).toBe(1);
        expect(wrapper.find(".radio-description").text()).toEqual(description);
        expect(wrapper.find(".radio-toplabel").length).toBe(1);
        expect(wrapper.find(".radio-toplabel").text()).toEqual(topLabel);
    });

    it("Should render inline and condensed when inline prop is set to true", () => {
        const mountedWrapper: ReactWrapper<RadioButtonProps> = mount(<RadioButton {...props} inline={true} condensed={true} />);
        expect(mountedWrapper.find(".custom-radio").hasClass("inline")).toBeTruthy();
        expect(mountedWrapper.find(".custom-radio").hasClass("condensed")).toBeTruthy();
    });
});
