import * as React from "react";
import { shallow, mount } from "enzyme";
import { Tabs } from "./Tabs";

describe("Component: Tabs", () => {
    let props = {
        list: [
            { text: "First", disabled: false },
            { text: "Second", disabled: false },
            { text: "Third", disabled: false },
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

    it("should call the onKeydown event and update selected tabs as required ", () => {
        props = { ...props, activeTab: 1 };
        props = {
            ...props, list: [...props.list, {
                text: "Contact",
                disabled: false,
            }, {
                text: "Rules",
                disabled: false,
            }]
        };
        const onClick = jest.fn();
        const wrapper = mount(<Tabs {...props} onClick={onClick} />);

        wrapper.find(".nav-link").at(1).simulate("keydown", { key: "arrowright" });
        expect(wrapper.find(".nav-link").at(2).hasClass("active")).toBeTruthy();

        wrapper.find(".nav-link").at(2).simulate("keydown", { key: "arrowleft" });
        expect(wrapper.find(".nav-link").at(1).hasClass("active")).toBeTruthy();
    });

    it("should call componentDidUpdate change localActive when active change ", () => {
        const wrapper = shallow(<Tabs {...props} />);
        wrapper.setProps({ activeTab: 2 });
        expect(wrapper.find(".nav-link").at(2).hasClass("active")).toBeTruthy();
    });

});
