import * as React from "react";
import { shallow } from "enzyme";
import { ProgressBar, ProgressBarProps } from "./ProgressBar";

describe("Component: ProgressBar", () => {

    it("Should render", () => {
        const wrapper = shallow(<ProgressBar value={50} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<ProgressBar value={50} className="myProgressbar" />);
        expect(wrapper.hasClass("myProgressbar")).toBeTruthy();
    });

    it("Should render progress value in text with correct value in percen format", () => {
        const wrapper = shallow(<ProgressBar value={20} showProgress={true} />);
        expect(wrapper.find(".custom-progress-bar").first().hasClass("show-progress")).toBeTruthy();
        expect(wrapper.find(".custom-progress-text").length).toBe(1);
        expect(wrapper.find(".custom-progress-text").first().text()).toEqual("20%");
        wrapper.setProps({ value: 60 });
        expect(wrapper.find(".custom-progress-text").first().hasClass("white")).toBeTruthy();
    });

});
