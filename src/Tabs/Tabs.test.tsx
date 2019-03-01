import * as React from "react";
import { shallow } from "enzyme";
import { Tabs } from "./Tabs";

describe("Component: Tabs", () => {
    const props = {
        list: [
            { text: "First" },
            { text: "Second" },
            { text: "Third" },
            { text: "Fourth", disabled: true },
        ],
        activeTab: 0
    };

    it("Should render", () => {
        const wrapper = shallow(<Tabs {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<Tabs {...props} className="myTabs" />);
        expect(wrapper.hasClass("myTabs")).toBeTruthy();
    });

    it("Should fire click event if passed", () => {
        const onClick = jest.fn();
        const wrapper = shallow(<Tabs {...props} onClick={onClick} />);
        wrapper.find(".nav-link").last().simulate("click");
        expect(onClick).toHaveBeenCalledTimes(0);
        wrapper.find(".nav-link").at(1).simulate("click");
        expect(onClick).toBeCalled();
    });

    it("Should render a tab as disabled if passed", () => {
        const wrapper = shallow(<Tabs {...props} />);
        expect(wrapper.find(".nav-link").last().hasClass("disabled")).toBeTruthy();
    });

});
