import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Pagination, PaginationProps } from "./Pagination";

describe("Component: RadioButton", () => {
    const props: PaginationProps = { size: 20, value: 1 };
    let wrapper: ShallowWrapper<PaginationProps>;

    beforeEach(() => wrapper = shallow(<Pagination {...props} />));

    it("Should render in both numbered and dotnav modes", () => {
        expect(wrapper).toBeDefined();
        expect(wrapper.find(".pagination").length).toBe(1);
        expect(wrapper.find(".dotnav").length).toBe(0);
        wrapper.setProps({ useDotNav: true });
        expect(wrapper.find(".pagination").length).toBe(1);
        expect(wrapper.find(".dotnav").length).toBe(1);
    });

    it("Should pass custom class and id", () => {
        const className: string = "myPaginationClass";
        const id: string = "myPaginationId";
        wrapper.setProps({ className, id });
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should render with custom offset", () => {
        wrapper.setProps({ offset: 3 });
        expect(wrapper.find(".page-item").length).toBe(4); // 3 numbers with next button
    });

    describe("Showing first and last when `useFirstAndLast` is enabled", () => {
        beforeEach(() => wrapper.setProps({ useFirstAndLast: true, value: 4 }));

        it("Should render with default svg and sr-only", () => {
            expect(wrapper.find(".nav-action").first().children("svg").length).toBe(1);
            expect(wrapper.find(".nav-action+.sr-only").first().text()).toEqual("First");
            expect(wrapper.find(".nav-action").last().children("svg").length).toBe(1);
            expect(wrapper.find(".nav-action+.sr-only").last().text()).toEqual("Last");
        });

        it("Should render with default text if not passed while `useTextNav` is enabled", () => {
            wrapper.setProps({ useTextNav: true });
            expect(wrapper.find(".nav-action").first().text()).toEqual("First");
            expect(wrapper.find(".nav-action").last().text()).toEqual("Last");
        });

        it("Should render with passed text while `useTextNav` is enabled", () => {
            wrapper.setProps({ useTextNav: true, firstText: "firstItem", lastText: "lastItem" });
            expect(wrapper.find(".nav-action").first().text()).toEqual("firstItem");
            expect(wrapper.find(".nav-action").last().text()).toEqual("lastItem");
        });
    });

    describe("Should render with text navigation", () => {
        beforeEach(() => wrapper.setProps({ useTextNav: true, value: 4 }));

        it("Should render default texts if not passed", () => {
            expect(wrapper.find(".nav-action").first().text()).toEqual("Previous");
            expect(wrapper.find(".nav-action+.sr-only").first().text()).toEqual("Previous");
            expect(wrapper.find(".nav-action").last().text()).toEqual("Next");
            expect(wrapper.find(".nav-action+.sr-only").last().text()).toEqual("Next");
        });

        it("Should render passed text", () => {
            wrapper.setProps({ previousText: "previousItem", nextText: "nextItem" });
            expect(wrapper.find(".nav-action").first().text()).toEqual("previousItem");
            expect(wrapper.find(".nav-action+.sr-only").first().text()).toEqual("previousItem");
            expect(wrapper.find(".nav-action").last().text()).toEqual("nextItem");
            expect(wrapper.find(".nav-action+.sr-only").last().text()).toEqual("nextItem");
        });
    });

    describe("Should trigger onChange callback when page navigation occured", () => {
        let onChange: jest.Mock;

        beforeEach(() => {
            onChange = jest.fn();
            wrapper.setProps({ onChange });
        });

        test("Number pagination", () => {
            wrapper.setProps({ useFirstAndLast: true, offset: 5, value: 3 }); // To cover all navigation options
            wrapper.find(".page-item").first().simulate("click"); // First Button
            wrapper.find(".page-item").at(1).simulate("click"); // Previous Button
            wrapper.find(".page-item").at(7).simulate("click"); // Next Button
            wrapper.find(".page-item").last().simulate("click"); // Last Button
            wrapper.find(".page-item").at(3).simulate("click"); // Number button

            expect(onChange).toHaveBeenCalledTimes(5);
        });

        test("Dotnav pagination", () => {
            wrapper.setProps({ useDotNav: true });
            wrapper.find(".page-item").last().simulate("click"); // Navigate to any dot
            expect(onChange).toHaveBeenCalled();
        });
    });

    describe("Testing pagination behavior when page number changes", () => {
        beforeEach(() => wrapper.setProps({ size: 10, offset: 5, useFirstAndLast: true }));

        it("Should not render First and previous at page 1", () => {
            wrapper.setProps({ value: 1 });

            // Only next and last is rendered
            expect(wrapper.find(".nav-action").length).toBe(2);
            // 2 Navigations + 5 numbers (offset)
            expect(wrapper.find(".page-item").length).toBe(7);
            // First item is 1 and it is active
            expect(wrapper.find(".page-item").first().find(".nav-num").text()).toEqual("1");
            expect(wrapper.find(".page-item").first().hasClass("active")).toBeTruthy();
            // Next button is rendered with `angle-right` svg
            expect(wrapper.find(".nav-action").first().children("svg").length).toBe(1);
            expect(wrapper.find(".nav-action").first().children("svg").prop("name")).toEqual("angle-right");
            // Last button is rendered with `angle-double-right` svg
            expect(wrapper.find(".nav-action").last().children("svg").length).toBe(1);
            expect(wrapper.find(".nav-action").last().children("svg").prop("name")).toEqual("angle-double-right");
        });

        it("Should render First and Previous when current page is not 1", () => {
            wrapper.setProps({ value: 5 });

            // Only next and last is rendered
            expect(wrapper.find(".nav-action").length).toBe(4);
            // 4 Navigations + 5 numbers (offset)
            expect(wrapper.find(".page-item").length).toBe(9);
        });

        it("Should not render Next and Last when current page is the last page", () => {
            wrapper.setProps({ value: 10 });

            // Only next and last is rendered
            expect(wrapper.find(".nav-action").length).toBe(2);
            // 2 Navigations + 5 numbers (offset)
            expect(wrapper.find(".page-item").length).toBe(7);
            // Last item is 10 and it is active
            expect(wrapper.find(".page-item").last().find(".nav-num").text()).toEqual("10");
            expect(wrapper.find(".page-item").last().hasClass("active")).toBeTruthy();
            // First button is rendered with `angle-double-left` svg
            expect(wrapper.find(".nav-action").first().children("svg").length).toBe(1);
            expect(wrapper.find(".nav-action").first().children("svg").prop("name")).toEqual("angle-double-left");
            // Previous button is rendered with `angle-left` svg
            expect(wrapper.find(".nav-action").last().children("svg").length).toBe(1);
            expect(wrapper.find(".nav-action").last().children("svg").prop("name")).toEqual("angle-left");
        });
    });
});
