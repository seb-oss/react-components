import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Loader, LoaderProps } from "./Loader";

describe("Component: Loader", () => {
    let wrapper: ShallowWrapper<LoaderProps>;

    beforeEach(() => {
        wrapper = shallow(<Loader toggle={true} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myLoaderClass";
        const id: string = "myLoaderId";
        wrapper.setProps({ className, id });
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should enable fullscreen when set to true", () => {
        wrapper.setProps({ fullscreen: true });
        expect(wrapper.hasClass("fullscreen")).toBeTruthy();
    });

    it("Should hide loader when toggle is true", () => {
        wrapper.setProps({ toggle: false });
        expect(wrapper.find(".loader-holder").length).toBe(0);
    });

    it("should be able to set sizes by sizeClass or size parameter", () => {
        wrapper.setProps({ toggle: true, fullscreen: false, sizeClassName: "loader-sm" });
        expect(wrapper.find(".seb-loader.loader-sm")).toBeTruthy();

        wrapper.setProps({ toggle: true, fullscreen: false, size: "extraLarge", sizeClassName: undefined });
        expect(wrapper.find(".seb-loader.loader-xl")).toBeTruthy();

        wrapper.setProps({ toggle: true, fullscreen: false, size: "large" });
        expect(wrapper.find(".seb-loader.loader-lg")).toBeTruthy();

        wrapper.setProps({ toggle: true, fullscreen: false, size: "medium" });
        expect(wrapper.find(".seb-loader.loader-md")).toBeTruthy();

        wrapper.setProps({ toggle: true, fullscreen: false, size: "small" });
        console.log(wrapper);
        expect(wrapper.find(".seb-loader.loader-sm")).toBeTruthy();

        wrapper.setProps({ toggle: true, fullscreen: false, size: "tiny" });
        expect(wrapper.find(".seb-loader.loader-xs")).toBeTruthy();
    });

});
