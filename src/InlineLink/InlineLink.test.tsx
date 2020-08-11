import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { InlineLink, InlineLinkProps } from "./InlineLink";

describe("Component: InlineLink", () => {
    let wrapper: ShallowWrapper<InlineLinkProps>;

    beforeEach(() => {
        wrapper = shallow(<InlineLink>Link</InlineLink>);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
        expect(wrapper.text()).toEqual("Link");
    });

    it("Should pass custom class and id", () => {
        const className: string = "myInlineLinkClass";
        const id: string = "myInlineLinkId";
        wrapper.setProps({ className, id });
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should fire click event when clicked", () => {
        const onClick: jest.Mock = jest.fn();
        wrapper.setProps({ onClick });
        wrapper.simulate("click");
        expect(onClick).toBeCalled();
    });
});
