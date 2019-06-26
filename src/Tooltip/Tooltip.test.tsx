import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Tooltip, TooltipMessageGroupItem, TooltipProps } from "./Tooltip";

describe("Component: Tooltip ", () => {
    let wrapper: ShallowWrapper<TooltipProps>;

    beforeEach(() => {
        wrapper = shallow(<Tooltip />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        wrapper.setProps({ className: "myTooltip" });
        expect(wrapper.hasClass("myTooltip")).toBeTruthy();
    });

    it("Should render a title and a message", () => {
        wrapper.setProps({ title: "title", message: "message" });
        expect(wrapper.find(".message-container").find(".title").length).toBe(1);
        expect(wrapper.find(".message-container").find(".title").text()).toEqual("title");
        expect(wrapper.find(".message-container").find(".message").length).toBe(1);
        expect(wrapper.find(".message-container").find(".message").text()).toEqual("message");
    });

    it("Should render a list of title and messages", () => {
        const list: Array<TooltipMessageGroupItem> = [
            { title: "title1", message: "message1" },
            { message: "message2" },
        ];
        wrapper.setProps({ messageGroup: list });
        expect(wrapper.find(".message-container").find(".message-list-item").length).toBe(2);
        expect(wrapper.find(".message-container").find(".message-list-item").first().find(".title").length).toBe(1);
        expect(wrapper.find(".message-container").find(".message-list-item").first().find(".title").text()).toEqual("title1");
        expect(wrapper.find(".message-container").find(".message-list-item").first().find(".message").length).toBe(1);
        expect(wrapper.find(".message-container").find(".message-list-item").first().find(".message").text()).toEqual("message1");
        expect(wrapper.find(".message-container").find(".message-list-item").at(1).find(".message").length).toBe(1);
        expect(wrapper.find(".message-container").find(".message-list-item").at(1).find(".message").text()).toEqual("message2");
    });

    it("Should render in all allowed positions", () => {
        // Top
        wrapper.setProps({ position: "top" });
        expect(wrapper.find(".content").hasClass("top"));
        wrapper.setProps({ position: "top-right" }).update();
        expect(wrapper.find(".content").hasClass("top-right"));
        wrapper.setProps({ position: "top-left" }).update();
        expect(wrapper.find(".content").hasClass("top-left"));
        // Bottom
        wrapper.setProps({ position: "bottom" }).update();
        expect(wrapper.find(".content").hasClass("bottom"));
        wrapper.setProps({ position: "bottom-right" }).update();
        expect(wrapper.find(".content").hasClass("bottom-right"));
        wrapper.setProps({ position: "bottom-left" }).update();
        expect(wrapper.find(".content").hasClass("bottom-left"));
        // Left
        wrapper.setProps({ position: "left" }).update();
        expect(wrapper.find(".content").hasClass("left"));
        wrapper.setProps({ position: "left-top" }).update();
        expect(wrapper.find(".content").hasClass("left-top"));
        wrapper.setProps({ position: "left-bottom" }).update();
        expect(wrapper.find(".content").hasClass("left-bottom"));
        // Right
        wrapper.setProps({ position: "right" }).update();
        expect(wrapper.find(".content").hasClass("right"));
        wrapper.setProps({ position: "right-top" }).update();
        expect(wrapper.find(".content").hasClass("right-top"));
        wrapper.setProps({ position: "right-bottom" }).update();
        expect(wrapper.find(".content").hasClass("right-bottom"));
    });

    it("Should render tooltip with one of the supported themes", () => {
        wrapper.setProps({ theme: "danger" });
        expect(wrapper.find(".content").hasClass("danger"));
    });

    it("Should be toggled when tooltip icon is clicked", () => {
        wrapper.find(".icon").simulate("click");
        expect(wrapper.find(".content").hasClass("open")).toBeTruthy();
    });

    it("Should enable tooltip on hover when triggerOnHover prop is set to true", () => {
        wrapper.setProps({ triggerOnHover: true });
        wrapper.find(".icon").simulate("mouseEnter");
        expect(wrapper.find(".content").hasClass("open")).toBeTruthy();
        wrapper.find(".icon").simulate("mouseLeave");
        expect(wrapper.find(".content").hasClass("open")).toBeFalsy();
    });

    it("Should render with passed width", () => {
        expect(wrapper.find(".message-container").prop("style")).toEqual({ width: "120px" });
        wrapper.setProps({ width: 300 });
        expect(wrapper.find(".message-container").prop("style")).toEqual({ width: "300px" });
    });

    it("Should render with custom SVG", () => {
        const testIcon: JSX.Element = <svg />;
        wrapper.setProps({ customSvg: testIcon });
        expect(wrapper.find(".icon").childAt(0).matchesElement(testIcon)).toBeTruthy();
    });

    it("should be able to call click event onClick when clickAction is provided ", () => {
        const clickActionSpy = jest.fn();
        wrapper = shallow(<Tooltip onClick={clickActionSpy} className="my-tooltip" />);

        wrapper.find(".my-tooltip > .icon").simulate("click", [null, { target: { value: false } }]);

        expect(clickActionSpy).toHaveBeenCalled();
    });

    describe("Test the component's public methods", () => {
        test("Method: forceDismiss", () => {
            const tooltipClasses = ["icon", "message", "message-container", "triangle"];
            const instance = (wrapper.instance() as any);
            // Dismiss tooltip
            instance.setState({ toggle: true });
            instance.forceDismiss();
            expect(instance.state.toggle).toEqual(false);
            // Dismiss Tooltip if clicked outside
            instance.setState({ toggle: true });
            instance.forceDismiss({ target: { className: "xyz" } });
            expect(instance.state.toggle).toEqual(false);
            // Do not dismiss tooltip if clicked inside
            tooltipClasses.map((classname) => {
                instance.setState({ toggle: true });
                instance.forceDismiss({ target: { className: classname } });
                expect(instance.state.toggle).not.toEqual(false);
            });
        });

        test("Method: forceShow", () => {
            const instance = (wrapper.instance() as any);
            instance.forceShow();
            expect(instance.state.toggle).toEqual(true);
        });
    });
});
