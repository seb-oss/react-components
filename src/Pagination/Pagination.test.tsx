import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Pagination, PaginationProps } from "./Pagination";

describe("Component: RadioButton", () => {
    const props: PaginationProps = { size: 20, value: 1, pagingLength: 4 };
    let mountedWrapper: ReactWrapper<PaginationProps>;

    beforeEach(() => {
        mountedWrapper = mount(<Pagination {...props} />);
    });

    afterEach(() => {
        mountedWrapper.unmount();
    });

    it("Should render in both numbered and dotnav modes", () => {
        expect(mountedWrapper).toBeDefined();
        expect(mountedWrapper.find(".pagination").length).toBe(1);
        expect(mountedWrapper.find(".dotnav").length).toBe(0);
        mountedWrapper.setProps({ useDotNav: true });
        expect(mountedWrapper.find(".pagination").length).toBe(1);
        expect(mountedWrapper.find(".dotnav").length).toBe(1);
    });

    it("Should pass custom class and id", () => {
        const className: string = "myPaginationClass";
        const id: string = "myPaginationId";
        mountedWrapper.setProps({ className, id });
        expect(mountedWrapper.hasClass(className)).toBeTruthy();
        expect(mountedWrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("Should render with custom pageLength", () => {
        mountedWrapper.setProps({ pagingLength: 3 });
        expect(mountedWrapper.find(".page-item").length).toBe(3); // 3 numbers
    });

    describe("Showing first and last when `useFirstAndLast` is enabled", () => {
        beforeEach(() => mountedWrapper.setProps({ useFirstAndLast: true, value: 4 }));

        it("Should render with default svg and sr-only", () => {
            expect(mountedWrapper.find(".nav-action").first().children("svg").length).toBe(1);
            expect(mountedWrapper.find(".nav-action+.sr-only").first().text()).toEqual("First");
            expect(mountedWrapper.find(".nav-action").last().children("svg").length).toBe(1);
            expect(mountedWrapper.find(".nav-action+.sr-only").last().text()).toEqual("Last");
        });

        it("Should render with default text if not passed while `useTextNav` is enabled", () => {
            mountedWrapper.setProps({ useTextNav: true });
            expect(mountedWrapper.find(".nav-action").first().text()).toEqual("First");
            expect(mountedWrapper.find(".nav-action").last().text()).toEqual("Last");
        });

        it("Should render with passed text while `useTextNav` is enabled", () => {
            mountedWrapper.setProps({ useTextNav: true, firstText: "firstItem", lastText: "lastItem" });
            expect(mountedWrapper.find(".nav-action").first().text()).toEqual("firstItem");
            expect(mountedWrapper.find(".nav-action").last().text()).toEqual("lastItem");
        });
    });

    describe("Should render with text navigation", () => {
        beforeEach(() => mountedWrapper.setProps({ useTextNav: true, value: 4 }));

        it("Should render default texts if not passed", () => {
            expect(mountedWrapper.find(".nav-action").first().text()).toEqual("Previous");
            expect(mountedWrapper.find(".nav-action+.sr-only").first().text()).toEqual("Previous");
            expect(mountedWrapper.find(".nav-action").last().text()).toEqual("Next");
            expect(mountedWrapper.find(".nav-action+.sr-only").last().text()).toEqual("Next");
        });

        it("Should render passed text", () => {
            mountedWrapper.setProps({ previousText: "previousItem", nextText: "nextItem" });
            expect(mountedWrapper.find(".nav-action").first().text()).toEqual("previousItem");
            expect(mountedWrapper.find(".nav-action+.sr-only").first().text()).toEqual("previousItem");
            expect(mountedWrapper.find(".nav-action").last().text()).toEqual("nextItem");
            expect(mountedWrapper.find(".nav-action+.sr-only").last().text()).toEqual("nextItem");
        });
    });

    describe("Should trigger onChange callback when page navigation occured", () => {
        let onChange: jest.Mock;

        beforeEach(() => {
            onChange = jest.fn();
            mountedWrapper.setProps({ onChange });
        });

        test("Number pagination", () => {
            mountedWrapper.setProps({ useFirstAndLast: true, offset: 5, value: 3 }); // To cover all navigation options
            mountedWrapper.find(".page-item").first().simulate("click"); // First Button
            mountedWrapper.find(".page-item").at(1).simulate("click"); // Previous Button
            mountedWrapper.find(".page-item").at(6).simulate("click"); // Next Button
            mountedWrapper.find(".page-item").last().simulate("click"); // Last Button
            mountedWrapper.find(".page-item").at(3).simulate("click"); // Number button

            expect(onChange).toHaveBeenCalledTimes(5);
        });

        test("Dotnav pagination", () => {
            mountedWrapper.setProps({ useDotNav: true });
            mountedWrapper.find(".page-item").last().simulate("click"); // Navigate to any dot
            expect(onChange).toHaveBeenCalled();
        });
    });

    describe("Testing pagination behavior when page number changes", () => {
        beforeEach(() => {
            mountedWrapper = mount(<Pagination size={10} value={1} offset={2} pagingLength={5} useFirstAndLast={true} />);
        });

        it("Should not render First and previous at page 1", () => {
            mountedWrapper.setProps({ value: 1 });

            // Only next and last is rendered
            expect(mountedWrapper.find(".nav-action").length).toBe(2);
            // 2 Navigations + 5 numbers (size /  offset)
            expect(mountedWrapper.find(".page-item").length).toBe(7);
            // First item is 1 and it is active
            expect(mountedWrapper.find(".page-item").first().find(".nav-num").text()).toEqual("1");
            expect(mountedWrapper.find(".page-item").first().hasClass("active")).toBeTruthy();
            // Next button is rendered with `angle-right` svg
            expect(mountedWrapper.find(".nav-action").first().children("svg").length).toBe(1);
            expect(mountedWrapper.find(".nav-action").first().children("svg").prop("name")).toEqual("angle-right");
            // Last button is rendered with `angle-double-right` svg
            expect(mountedWrapper.find(".nav-action").last().children("svg").length).toBe(1);
            expect(mountedWrapper.find(".nav-action").last().children("svg").prop("name")).toEqual("angle-double-right");
        });

        it("Should render First and Previous when current page is not 1", () => {
            mountedWrapper.setProps({ value: 2 });

            // Only next and last is rendered
            expect(mountedWrapper.find(".nav-action").length).toBe(4);
            // 4 Navigations + 5 numbers (offset)
            expect(mountedWrapper.find(".page-item").length).toBe(9);
        });

        it("Should not render Next and Last when current page is the last page", () => {
            mountedWrapper.setProps({ value: 5 });

            // Only previous and first is rendered
            expect(mountedWrapper.find(".nav-action").length).toBe(2);
            // 2 Navigations + 5 numbers (offset)
            expect(mountedWrapper.find(".page-item").length).toBe(7);
            // Last item is 10 and it is active
            expect(mountedWrapper.find(".page-item").last().find(".nav-num").text()).toEqual("5");
            expect(mountedWrapper.find(".page-item").last().hasClass("active")).toBeTruthy();
            // First button is rendered with `angle-double-left` svg
            expect(mountedWrapper.find(".nav-action").first().children("svg").length).toBe(1);
            expect(mountedWrapper.find(".nav-action").first().children("svg").prop("name")).toEqual("angle-double-left");
            // Previous button is rendered with `angle-left` svg
            expect(mountedWrapper.find(".nav-action").last().children("svg").length).toBe(1);
            expect(mountedWrapper.find(".nav-action").last().children("svg").prop("name")).toEqual("angle-left");
        });
    });

    describe("test pagination list when The original size of the pagination is greater than the expected size ", () => {

        it("Should display current number at the center with next and previous buttons side by side", () => {
            /**
             * When the size is 60, offset is 6, then original paginSize will be 10
             * the default paging length is 5
             * if  the value is 3
             * the value should be in the middle regadless
             * so pagination should display 1 to 5 with 3 as active and in the middle.
             */
            mountedWrapper = mount(<Pagination size={60} offset={6} value={3}></Pagination>);
            const allPageItems: ReactWrapper = mountedWrapper.findWhere((x: ReactWrapper) => x.hasClass("page-item"));
            const activePage: ReactWrapper = allPageItems.filterWhere((x: ReactWrapper) => x.hasClass('active'));
            // note since we have sr-only classes, there will be two links here and .text concat returns the two together .
            expect(activePage.text()).toContain(3);

            expect(allPageItems.first().text()).toContain("Previous");
            expect(allPageItems.last().text()).toContain("Next");

            // and the first page should be 1

            expect(allPageItems.at(1).text()).toContain(1);
        });

        it("When paging size, length and offset changes, recalculate and place the active in the middle regardless ", () => {
            mountedWrapper = mount(<Pagination size={60} offset={10} pagingLength={5} value={4}></Pagination>);

            const allPageItems: ReactWrapper = mountedWrapper.findWhere((x: ReactWrapper) => x.hasClass("page-item"));
            const activePage: ReactWrapper = allPageItems.filterWhere((x: ReactWrapper) => x.hasClass('active'));

            expect(activePage.text()).toContain(4);

            expect(allPageItems.first().text()).toContain("Previous");
            expect(allPageItems.last().text()).toContain("Next");

            // and the first page should be 2

            expect(allPageItems.at(1).text()).toContain(2);
        });
    })
});
