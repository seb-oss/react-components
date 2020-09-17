import React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { Datepicker, DatepickerProps } from ".";

describe("Component: Datepicker", () => {
    const props: DatepickerProps = {
        value: new Date(),
        onChange: jest.fn(),
    };
    let wrapper: ShallowWrapper<DatepickerProps>;
    let mountedWrapper: ReactWrapper<DatepickerProps>;
    beforeEach(() => {
        wrapper = shallow(<Datepicker {...props} />);
        mountedWrapper = mount(<Datepicker {...props} />);
    });
    it("Should render", () => {
        expect(wrapper).toBeDefined();
    });
    // it("Should render and pass custom class", () => {
    //     const className: string = "myDatepickerClass";
    //     const id: string = "myDatepickerId";
    //     wrapper.setProps({ className, id });
    //     expect(wrapper.hasClass(className)).toBeTruthy();
    // });
    it("Should fire change event when component value is changed", () => {
        mountedWrapper.find("input").first().simulate("change");
        expect(props.onChange).toHaveBeenCalled();
        mountedWrapper.unmount();
    });
    // it("Should render label and error", () => {
    //     const label: string = "label";
    //     const error: string = "error";
    //     wrapper.setProps({ label, error });
    //     // Label
    //     expect(wrapper.find("label").length).toBe(1);
    //     expect(wrapper.find("label").text()).toEqual("label");
    //     // Error
    //     expect(wrapper.find(".alert").length).toBe(1);
    //     expect(wrapper.find(".alert").text()).toEqual("error");
    // });
    // it("Should enable disabled when disabled prop is set to true", () => {
    //     mountedWrapper.setProps({ disabled: true });
    //     expect(mountedWrapper.find("input").first().prop("disabled")).toBe(true);
    //     mountedWrapper.unmount();
    // });
    // it("Should render custom calendar icon", () => {
    //     mountedWrapper.setProps({ calendarIcon: <svg id="myCustomCalendarIcon" /> });
    //     expect(mountedWrapper.find("#myCustomCalendarIcon").length).toBeDefined();
    // });
    // it("Should show clear button when enabled", () => {
    //     mountedWrapper.setProps({ clearable: true });
    //     expect(mountedWrapper.find(".react-date-picker__clear-button").length).toBeTruthy();
    // });
    // it("Should show with leading zeroes unless disabled", () => {
    //     mountedWrapper.setProps({ value: new Date("1-1-2019") });
    //     expect(mountedWrapper.find(".react-date-picker__inputGroup__leadingZero").length).toBeGreaterThan(0);
    //     mountedWrapper.setProps({ showLeadingZeros: false });
    //     expect(mountedWrapper.find(".react-date-picker__inputGroup__leadingZero").length).toBe(0);
    // });
    // it("Should show placeholder when passed", () => {
    //     const placeholder: string = "Some test here";
    //     wrapper.setProps({ placeholder, value: null });
    //     expect(wrapper.find(".date-placeholder").length).toBeTruthy();
    // });
    // it("Should render with custom locale", () => {
    //     const locale: string = "sv-se";
    //     const value: Date = new Date();
    //     const [year, month, day] = [2015, 11, 25];
    //     value.setFullYear(year, month, day);
    //     mountedWrapper.setProps({ locale, value });
    //     expect(mountedWrapper.find(`input[name="${props.name}"]`).getElement().props.value).toEqual(`${year}-${month + 1}-${day}`);
    // });
});
