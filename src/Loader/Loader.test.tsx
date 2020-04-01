import * as React from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import { Loader, LoaderProps, LoaderSize } from "./Loader";

describe("Component: Loader", () => {
    let wrapper: ShallowWrapper<LoaderProps>;
    let mountedWrapper: ReactWrapper<LoaderProps>;

    beforeEach(() => {
        wrapper = shallow(<Loader toggle={true} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myLoaderClass";
        const id: string = "myLoaderId";
        mountedWrapper = mount(<Loader toggle={true} className={className} id={id} />);
        expect(mountedWrapper.find(".seb-loader-wrapper").hasClass(className)).toBeTruthy();
        expect(mountedWrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should enable fullscreen when set to true", () => {
        mountedWrapper = mount(<Loader toggle={true} fullscreen={true} />);
        expect(mountedWrapper.find(".seb-loader-wrapper").hasClass("fullscreen")).toBeTruthy();
        mountedWrapper = mount(<Loader toggle={true} fullscreen={false} />);
        expect(mountedWrapper.find(".seb-loader-wrapper").hasClass("fullscreen")).toBeFalsy();
    });

    it("Should hide loader when toggle is true", () => {
        wrapper.setProps({ toggle: false });
        expect(wrapper.find(".seb-loader-wrapper").length).toBe(0);
    });

    describe("Should render with different sizes", () => {
        const testCases: Array<LoaderSize> = ["lg", "md", "sm"];
        testCases.map((size: LoaderSize) => {
            test(`Loader size: ${size}`, () => {
                mountedWrapper = mount(<Loader toggle={true} size={size} />);
                expect(mountedWrapper.find(".seb-loader").hasClass(`loader-${size}`));
            });
        });
    });
});
