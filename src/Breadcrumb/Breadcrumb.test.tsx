import * as React from "react";
import { shallow } from "enzyme";
import { Breadcrumb } from "./Breadcrumb";

describe("Component: Breadcrumb", () => {
    const breadcrumbList: Array<string> = ["First", "Second", "Third"];

    it("Should render", () => {
        const wrapper = shallow(<Breadcrumb list={breadcrumbList} />);
        expect(wrapper).toBeDefined();
    });

    it("Should render custom className", () => {
        const wrapper = shallow(<Breadcrumb list={breadcrumbList} className="my-breadcrumb" />);
        expect(wrapper.hasClass("my-breadcrumb")).toBeTruthy();
    });

    it("Should fire click event when clicked", () => {
        const onClick = jest.fn();
        const wrapper = shallow(<Breadcrumb list={breadcrumbList} onClick={onClick} />);
        wrapper.find(".breadcrumb-item").first().simulate("click");
        expect(onClick).toBeCalled();
    });
});
