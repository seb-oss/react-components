import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { ProgressBar, ProgressBarProps } from "./ProgressBar";

describe("Component: ProgressBar", () => {
    let wrapper: ShallowWrapper<ProgressBarProps>;

    beforeEach(() => {
        wrapper = shallow(<ProgressBar value={50} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myProgressbarClass";
        const id: string = "myProgressbarId";
        wrapper.setProps({ className, id });
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should render progress value in text with correct value in percen format", () => {
        wrapper.setProps({ value: 20, showProgress: true });
        expect(wrapper.find(".custom-progress-bar").first().hasClass("show-progress")).toBeTruthy();
        expect(wrapper.find(".custom-progress-text").length).toBe(1);
        expect(wrapper.find(".custom-progress-text").first().text()).toEqual("20%");
        wrapper.setProps({ value: 60 });
        expect(wrapper.find(".custom-progress-text").first().hasClass("white")).toBeTruthy();
    });
});
