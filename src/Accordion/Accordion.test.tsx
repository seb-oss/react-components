import * as React from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import { Accordion, AccrodionListItem, AccordionProps, AccordionIconRotation } from "./Accordion";

type keyboardTestUnit = { key: string, registeredAt: number, expectedValue: boolean };

describe("Component: Accordion", () => {
    let wrapper: ShallowWrapper<AccordionProps>;
    let mountedWrapper: ReactWrapper<AccordionProps>;
    const accordionList: Array<AccrodionListItem> = [
        { header: "Item 1", content: { title: "title", desc: "desc" } },
        { header: "Item 2", content: [{ title: "title", desc: "desc" }, { title: "title", desc: "desc" }] },
        { header: "Item 3", content: [{ desc: "desc" }, { desc: "desc" }] }
    ];

    beforeEach(() => {
        wrapper = shallow(<Accordion list={accordionList} />);
        mountedWrapper = mount(<Accordion list={accordionList} />);
    });

    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });

    it("Should render custom className and id", () => {
        const className: string = "myAccordionClass";
        const id: string = "myAccordionId";
        mountedWrapper.setProps({ className, id });
        expect(mountedWrapper.hasClass(className)).toBeTruthy();
        expect(mountedWrapper.find(`#${id}`).length).toBeGreaterThan(0);
    });

    it("Should render subheader is included in props", () => {
        const newAccordionList = JSON.parse(JSON.stringify(accordionList));
        newAccordionList[0].subHeaderText = "Test subheader";
        wrapper.setProps({ list: newAccordionList });
        expect(wrapper.find(".with-sub-header").length).toEqual(1);
    });

    it("Should toggle accordion when clicked, and toggled off when another item is clicked", () => {
        mountedWrapper.find(".accordion-item").first().find(".header-wrapper").simulate("click");
        expect(mountedWrapper.find(".accordion-item").first().hasClass("active")).toBeTruthy();
        mountedWrapper.find(".accordion-item").at(1).find(".header-wrapper").simulate("click");
        expect(mountedWrapper.find(".accordion-item").first().hasClass("active")).toBeFalsy();
        expect(mountedWrapper.find(".accordion-item").at(1).hasClass("active")).toBeTruthy();
    });

    it("Should untoggle accordion when clicked again", () => {
        mountedWrapper.find(".accordion-item").first().find(".header-wrapper").simulate("click");
        mountedWrapper.find(".accordion-item").first().find(".header-wrapper").simulate("click");
        expect(mountedWrapper.find(".active").length).toBe(0);
    });

    it("Should untoggle accordion item when clicked on another accordion item", () => {
        mountedWrapper.find(".accordion-item").first().find(".header-wrapper").simulate("click");
        mountedWrapper.find(".accordion-item").at(1).find(".header-wrapper").simulate("click");

        expect(mountedWrapper.find(".accordion-item").first().hasClass("active")).toBeFalsy();
        expect(mountedWrapper.find(".accordion-item").at(1).hasClass("active")).toBeTruthy();
        expect(mountedWrapper.find(".active").length).toBe(1);
    });

    it("Should render with a custom icon", () => {
        mountedWrapper.setProps({ customIcon: <svg id="testIcon" /> });
        expect(mountedWrapper.find("#testIcon").length).toBeTruthy();
    });

    it("Should render with a custom icon when expanded", () => {
        mountedWrapper = mount(<Accordion list={accordionList} customIconExpanded={<svg id="testIcon" />} />);
        expect(mountedWrapper.find("#testIcon").length).toBeTruthy();
        expect(mountedWrapper.find(".transform").length).toBeTruthy();
    });

    describe("Should show icon to either sides (right or left)", () => {
        const testCases: Array<"right" | "left"> = ["right", "left"];
        testCases.map((testCase: "right" | "left") => {
            test(`Icon aligned to the ${testCase}`, () => {
                mountedWrapper = mount(<Accordion list={accordionList} iconPosition={testCase} />);
                expect(mountedWrapper.find(`.${testCase}`).length).toBeTruthy();
            });
        });
    });

    describe("Should allow multiple rotation functions to be applied to the icons", () => {
        const testCases: Array<AccordionIconRotation> = ["deg-180", "deg-180-counter", "deg-90", "deg-90-counter"];
        testCases.map((testCase: AccordionIconRotation) => {
            test(`Icon rotation is ${testCase}`, () => {
                mountedWrapper = mount(<Accordion list={accordionList} iconRotation={testCase} />);
                expect(mountedWrapper.find(`.${testCase}`).length).toBeTruthy();
            });
        });
    });

    describe("Should be able to toggle accordion using `space` or `enter`", () => {
        const testList: Array<keyboardTestUnit> = [
            { key: " ", registeredAt: 1, expectedValue: true },
            { key: "space", registeredAt: 1, expectedValue: true },
            { key: "enter", registeredAt: 1, expectedValue: true },
            { key: "backspace", registeredAt: 1, expectedValue: false }, // Should not do anything
        ];

        beforeEach(() => {
            mountedWrapper.setProps({ list: accordionList });
        });

        testList.map((item: keyboardTestUnit) => {
            it(`Testing key [${item.key}]`, () => {
                mountedWrapper.find(".accordion-item").at(1).simulate("keydown", { key: item.key });
                expect(mountedWrapper.find(".accordion-item").at(1).hasClass("active"));
            });
        });

        it("Should be toggled off with keyboard events", () => {
            mountedWrapper.find(".accordion-item").first().simulate("keydown", { key: "space" });
            expect(mountedWrapper.find(".accordion-item").first().hasClass("active")).toBeTruthy();
            mountedWrapper.find(".accordion-item").first().simulate("keydown", { key: "space" });
            expect(mountedWrapper.find(".accordion-item").first().hasClass("active")).toBeFalsy();
        });
    });

    it("Should render react node as an accordion item", () => {
        const list: Array<AccrodionListItem> = JSON.parse(JSON.stringify(accordionList));
        list.push({ header: "Item 4", content: <><p id="test-node">test content</p></> });
        mountedWrapper.setProps({ list });
        expect(mountedWrapper.find("#test-node").length).toBeTruthy();
    });

    it("Should not render any item if the list is empty", () => {
        mountedWrapper.setProps({ list: [] });
        expect(mountedWrapper.find(".text-wrapper").length).toBeFalsy();
    });

    describe("Should render alternate theme", () => {
        beforeEach(() => {
            mountedWrapper = mount(<Accordion list={accordionList} alternative={true} />);
        });

        it("Should render alternate theme", () => {
            expect(mountedWrapper.find(".custom-accordion").hasClass("alternate-accordion")).toBeTruthy();
        });
    });
});
