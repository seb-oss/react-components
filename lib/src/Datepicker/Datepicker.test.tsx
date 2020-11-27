import React, { ReactElement } from "react";
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

    it("Should render and pass custom class", () => {
        const className: string = "myDatepickerClass";
        wrapper.setProps({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it("Should pass any other native html prop", () => {
        const autoFocus: boolean = true;
        mountedWrapper.setProps({ autoFocus });
        expect(mountedWrapper.find(`input[type="date"]`).getElement().props.autoFocus).toEqual(autoFocus);
        mountedWrapper.setProps({ forceCustom: true, autoFocus });
        const [dayPicker, yearPicker]: Array<ReactElement> = mountedWrapper.find(`div.input-group > input[type="number"]`).getElements();
        expect(dayPicker).toBeTruthy();
        expect(dayPicker.props.autoFocus).toEqual(autoFocus);
        expect(yearPicker).toBeTruthy();
        expect(yearPicker.props.autoFocus).toEqual(autoFocus);
    });

    it("Should pass wrapper and select props for custom datepicker and ignore for native picker", () => {
        const forceCustom: boolean = true;
        const wrapperProps: DatepickerProps["wrapperProps"] = { className: "test123" };
        const customPickerSelectProps: DatepickerProps["customPickerSelectProps"] = { className: "selectTest123" };
        wrapper.setProps({ forceCustom, wrapperProps, customPickerSelectProps });

        const wrapperSelector: string = `div.input-group.${wrapperProps.className}`;
        const selectElementSelector: string = `div.input-group.${wrapperProps.className}>select.custom-select.${customPickerSelectProps.className}`;
        expect(wrapper.find(wrapperSelector).length).toBeTruthy();
        expect(wrapper.find(selectElementSelector).length).toBeTruthy();

        wrapper.setProps({ forceCustom: false, wrapperProps, customPickerSelectProps });
        expect(wrapper.find(wrapperSelector).length).toBeFalsy();
        expect(wrapper.find(selectElementSelector).length).toBeFalsy();
    });

    it("Should fire change event when component value is changed", () => {
        mountedWrapper.find("input").first().simulate("change");
        expect(props.onChange).toHaveBeenCalled();
        mountedWrapper.unmount();
    });

    it("Should enable disabled when disabled prop is set to true", () => {
        mountedWrapper.setProps({ disabled: true });
        expect(mountedWrapper.find("input").first().prop("disabled")).toBe(true);
        mountedWrapper.unmount();
    });

    it("Should render with custom locale", () => {
        const localeCode: string = "sv-se";
        const value: Date = new Date();
        const [year, month, day] = [2015, 11, 25];
        value.setFullYear(year, month, day);
        mountedWrapper.setProps({ localeCode, value });
        expect(mountedWrapper.find(`input[type="date"]`).getElement().props.value).toEqual(`${year}-${month + 1}-${day}`);
    });
});
