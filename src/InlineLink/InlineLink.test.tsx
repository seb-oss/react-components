import * as React from "react";
import { shallow } from "enzyme";
import { InlineLink } from "./InlineLink";

describe("Component: InlineLink", () => {

    it("Should render", () => {
        const wrapper = shallow(<InlineLink>Link</InlineLink>);
        expect(wrapper).toBeDefined();
        expect(wrapper.text()).toEqual("Link");
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<InlineLink className="myInlineLink">Link</InlineLink>);
        expect(wrapper.hasClass("myInlineLink")).toBeTruthy();
    });

    it("Should fire click event when clicked", () => {
        const action = jest.fn();
        const wrapper = shallow(<InlineLink onClick={action}>Link</InlineLink>);
        wrapper.simulate("click");
        expect(action).toBeCalled();
    });

});
