import * as React from "react";
import { shallow } from "enzyme";
import { Image } from "./Image";

describe("Component: Image", () => {
    const props = {
        src: "my-image-src",
        width: "200px",
        height: "200px"
    };

    it("Should render", () => {
        const wrapper = shallow(<Image {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<Image {...props} className="myImage" />);
        expect(wrapper.children().first().hasClass("myImage")).toBeTruthy();
        wrapper.setProps({ useImgTag: true });
        expect(wrapper.children().first().hasClass("myImage")).toBeTruthy();
    });

    it("Should fire click event when clicked", () => {
        const action1 = jest.fn();
        const action2 = jest.fn();
        const wrapper = shallow(<Image {...props} onClick={action1} />);
        wrapper.children().first().simulate("click");
        expect(action1).toBeCalled();
        wrapper.setProps({ useImgTag: true, onClick: action2 });
        wrapper.children().first().simulate("click");
        expect(action2).toBeCalled();
    });
});
