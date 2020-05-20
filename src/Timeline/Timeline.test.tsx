import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Timeline, TimelineListItem, TimelineProps } from "./Timeline";

describe("Component: Timeline", () => {
    const timelineList: Array<TimelineListItem> = [
        { title: "title1", time: "time1" },
        { title: "title2", time: "time2" },
        { title: "title3", time: "time3" },
    ];
    let wrapper: ShallowWrapper<TimelineProps>;

    beforeEach(() => {
        wrapper = shallow(<Timeline list={timelineList} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myTimelineClass";
        const id: string = "myTimelineId";
        wrapper.setProps({ className, id });
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should render in horizontal if direction prop is set to `horizontal`", () => {
        expect(wrapper.find(".timeline").hasClass("vertical"));
        wrapper.setProps({ direction: "horizontal" });
        expect(wrapper.find(".row").length).toBeGreaterThan(0);
        expect(wrapper.find(".timeline").hasClass("horizontal"));
    });

    it("Should fire click event if onClick is passed", () => {
        // Vertical
        const verticalClick = jest.fn();
        const verticalWrapper = shallow(<Timeline list={timelineList} />);
        verticalWrapper.find(".title-wrapper").first().simulate("click");
        verticalWrapper.setProps({ onClick: verticalClick });
        verticalWrapper.find(".title-wrapper").first().simulate("click");
        expect(verticalClick).toBeCalled();
        // Horizontal
        const horizontalClick = jest.fn();
        const horizontalWrapper = shallow(<Timeline list={timelineList} direction="horizontal" />);
        horizontalWrapper.find(".title-wrapper").first().simulate("click");
        horizontalWrapper.find(".title-wrapper").at(1).simulate("click");
        horizontalWrapper.setProps({ onClick: horizontalClick });
        horizontalWrapper.find(".title-wrapper").first().simulate("click");
        horizontalWrapper.find(".title-wrapper").at(1).simulate("click");
        expect(horizontalClick).toHaveBeenCalledTimes(2);
    });

    it("Should render timeline item title, time and description", () => {
        const newTimelineList: Array<TimelineListItem> = [
            { title: "title1", time: "time1" },
            { title: "title2", time: "time2" },
            { title: "title3", time: "time3" },
            { title: "title4", time: "time4", desc: "desc4" },
            { title: "title5", time: "time5", desc: "desc5" },
        ];

        // Vertical
        const verticalWrapper = shallow(<Timeline list={timelineList} />);
        expect(verticalWrapper.find(".title-wrapper").at(2).find(".title").text()).toEqual("title3");
        expect(verticalWrapper.find(".title-wrapper").at(2).find(".time").text()).toEqual("time3");
        verticalWrapper.setProps({ list: newTimelineList });
        expect(verticalWrapper.find(".title-wrapper").at(3).find(".desc").length).toBe(1);
        expect(verticalWrapper.find(".title-wrapper").at(3).find(".desc").text()).toEqual("desc4");
        expect(verticalWrapper.find(".title-wrapper").at(4).find(".desc").length).toBe(1);
        expect(verticalWrapper.find(".title-wrapper").at(4).find(".desc").text()).toEqual("desc5");
        // Horizontal
        const horizontalWrapper = shallow(<Timeline list={timelineList} direction="horizontal" />);
        expect(horizontalWrapper.find(".title-wrapper").at(2).find(".title").text()).toEqual("title3");
        expect(horizontalWrapper.find(".title-wrapper").at(2).find(".time").text()).toEqual("time3");
        horizontalWrapper.setProps({ list: newTimelineList }).update();
        expect(horizontalWrapper.find(".title-wrapper").at(1).find(".desc").length).toBe(1);
        expect(horizontalWrapper.find(".title-wrapper").at(1).find(".desc").text()).toEqual("desc4");
        expect(horizontalWrapper.find(".title-wrapper").at(4).find(".desc").length).toBe(1);
        expect(horizontalWrapper.find(".title-wrapper").at(4).find(".desc").text()).toEqual("desc5");
    });
});
