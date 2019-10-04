import * as React from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import { Image, ImageProps } from "./Image";

describe("Component: Image", () => {
    let wrapper: ShallowWrapper<ImageProps>;
    const props: ImageProps = {
        src: "my-image-src",
        width: "200px",
        height: "200px"
    };

    beforeEach(() => {
        wrapper = shallow(<Image {...props} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const updatedProps: ImageProps = { ...props, className: "myImageClass", id: "myImageId" };
        wrapper.setProps({ ...updatedProps });
        expect(wrapper.find(".div-tag").hasClass(updatedProps.className)).toBeTruthy();
        expect(wrapper.find(`#${updatedProps.id}`).length).toBeGreaterThan(0);
        wrapper.setProps({ useImgTag: true });
        expect(wrapper.find(".img-tag").hasClass(updatedProps.className)).toBeTruthy();
        expect(wrapper.find(`#${updatedProps.id}`).length).toBeGreaterThan(0);
    });

    it("Should pass alt, aria-label, and aria-describedby", () => {
        const updatedProps: ImageProps = { ...props, alt: "myImageAlt", ariaLabel: "myLabel", ariaDescribedBy: "myDescription" };
        const mountedWrapper: ReactWrapper<ImageProps> = mount(<Image {...updatedProps} />);
        mountedWrapper.setProps({ ...updatedProps });
        expect(mountedWrapper.find(".div-tag").getDOMNode().hasAttribute("title")).toBeTruthy();
        expect(mountedWrapper.find(".div-tag").getDOMNode().getAttribute("title")).toEqual(updatedProps.alt);
        expect(mountedWrapper.find(".div-tag").getDOMNode().hasAttribute("aria-label")).toBeTruthy();
        expect(mountedWrapper.find(".div-tag").getDOMNode().getAttribute("aria-label")).toEqual(updatedProps.ariaLabel);
        expect(mountedWrapper.find(".div-tag").getDOMNode().hasAttribute("aria-describedby")).toBeTruthy();
        expect(mountedWrapper.find(".div-tag").getDOMNode().getAttribute("aria-describedby")).toEqual(updatedProps.ariaDescribedBy);
        mountedWrapper.setProps({ useImgTag: true });
        expect(mountedWrapper.find(".img-tag").getDOMNode().hasAttribute("alt")).toBeTruthy();
        expect(mountedWrapper.find(".img-tag").getDOMNode().getAttribute("alt")).toEqual(updatedProps.alt);
        expect(mountedWrapper.find(".img-tag").getDOMNode().hasAttribute("aria-label")).toBeTruthy();
        expect(mountedWrapper.find(".img-tag").getDOMNode().getAttribute("aria-label")).toEqual(updatedProps.ariaLabel);
        expect(mountedWrapper.find(".img-tag").getDOMNode().hasAttribute("aria-describedby")).toBeTruthy();
        expect(mountedWrapper.find(".img-tag").getDOMNode().getAttribute("aria-describedby")).toEqual(updatedProps.ariaDescribedBy);
    });

    it("Should fire click event when clicked", () => {
        const action1 = jest.fn();
        const action2 = jest.fn();
        wrapper.setProps({ onClick: action1 });
        wrapper.children().first().simulate("click");
        expect(action1).toBeCalled();
        wrapper.setProps({ useImgTag: true, onClick: action2 });
        wrapper.children().first().simulate("click");
        expect(action2).toBeCalled();
    });
});
