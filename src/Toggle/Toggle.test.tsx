import React from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import { Toggle, ToggleProps } from "./Toggle";

describe("Component: Toggle ", () => {
    const props: ToggleProps = {
        value: true,
        onChange: jest.fn(),
        name: "myToggle",
    };
    let wrapper: ShallowWrapper<ToggleProps>;

    beforeEach(() => {
        wrapper = shallow(<Toggle {...props} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const className: string = "myToggleClass";
        wrapper.setProps({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it("Should pass custom id", () => {
        let mountedWrapper: ReactWrapper<ToggleProps>;
        const id: string = "my-toggle-id";
        mountedWrapper = mount(<Toggle {...props} id={id} />);
        expect(mountedWrapper.find(`#${id}`).length).toBeTruthy();
        mountedWrapper = mount(<Toggle {...props} />);
        expect(mountedWrapper.find("input").getElement().props.id).toBeTruthy();
    });

    it("Should fire change event when changed", () => {
        wrapper.find("input").simulate("change", { target: { value: false } });
        wrapper.find("input").simulate("focus", {
            preventDefault: () => {
                console.log("Its preventing the default");
            },
            stopPropagation: () => {
                console.log("We are stopping propagation ");
            },
        });
        expect(props.onChange).toBeCalled();
    });

    it("Should render label and name", () => {
        const label: string = "my toggle label";
        const name: string = "my-toggle-name";
        wrapper.setProps({ label, name });
        expect(wrapper.find(".custom-control-label").length).toBe(1);
        expect(wrapper.find(".custom-control-label").text()).toEqual(label);
        expect(wrapper.find("input").getElement().props.name).toEqual(name);
    });
});
