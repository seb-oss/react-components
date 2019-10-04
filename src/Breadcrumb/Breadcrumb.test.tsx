import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Breadcrumb, BreadcrumbProps } from "./Breadcrumb";

describe("Component: Breadcrumb", () => {
    let wrapper: ShallowWrapper<BreadcrumbProps>;
    const breadcrumbList: Array<string> = ["First", "Second", "Third"];

    beforeEach(() => {
        wrapper = shallow(<Breadcrumb list={breadcrumbList} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should render custom className and id", () => {
        const className: string = "myBreadcrumbClass";
        const id: string = "myBreadcrubID";
        wrapper.setProps({ className, id });
        wrapper.find(".breadcrumb-item").first().simulate("click"); // Simulates scenario where there is no onClick
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeGreaterThan(0);
    });

    it("Should fire click event when clicked", () => {
        const onClick: jest.Mock = jest.fn();
        wrapper.setProps({ onClick });
        wrapper.find(".breadcrumb-item").first().simulate("click");
        expect(onClick).toBeCalled();
    });
});
