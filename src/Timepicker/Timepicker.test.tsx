import * as React from "react";
import { shallow, mount } from "enzyme";
import { Timepicker, TimepickerDayperiodTypes, TimepickerValue } from "./Timepicker";

describe("Component: Timepicker", () => {

    const props = {
        value: { hours: 6, minutes: 30, dayperiod: TimepickerDayperiodTypes.AM },
        onChange: jest.fn(),
        name: "myTimepicker"
    };

    it("Should render", () => {
        const wrapper = shallow(<Timepicker {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<Timepicker {...props} className="myTimepicker" />);
        expect(wrapper.hasClass("myTimepicker")).toBeTruthy();
    });

    it("Should fire change event", () => {
        const wrapper = mount(<Timepicker {...props} />);
        // Hours
        wrapper.find(".timepicker-hours").find(".triangle-before").simulate("click");
        wrapper.find(".timepicker-hours").find(".triangle-after").simulate("click");
        wrapper.find(".timepicker-hours").find(".timepicker-input").simulate("change", 3);
        // Minutes
        wrapper.find(".timepicker-minutes").find(".triangle-before").simulate("click");
        wrapper.find(".timepicker-minutes").find(".triangle-after").simulate("click");
        wrapper.find(".timepicker-minutes").find(".timepicker-input").simulate("change", 10);
        // Dayperiod
        wrapper.find(".timepicker-dayperiod").find(".triangle-before").simulate("click");
        wrapper.find(".timepicker-dayperiod").find(".triangle-after").simulate("click");
        expect(props.onChange).toHaveBeenCalledTimes(8);
        wrapper.unmount();
    });

    it("Should should always show the value in double digits", () => {
        let testValue: TimepickerValue = { hours: 1, minutes: 0, dayperiod: TimepickerDayperiodTypes.AM };
        const wrapper = mount(<Timepicker name="test" onChange={jest.fn()} value={testValue} />);
        expect(wrapper.find(".timepicker-hours").find("input").prop("value")).toEqual("01");
        expect(wrapper.find(".timepicker-minutes").find("input").prop("value")).toEqual("00");
        testValue = { ...testValue, hours: 10, minutes: 20 };
        wrapper.setProps({ value: testValue }).update();
        expect(wrapper.find(".timepicker-hours").find("input").prop("value")).toEqual("10");
        expect(wrapper.find(".timepicker-minutes").find("input").prop("value")).toEqual("20");
    });

    test("Test handleClick method", () => {
        const wrapper = shallow(<Timepicker {...props} />);
        const instance: any = wrapper.instance();
        let result: TimepickerValue;

        // Incrementing Hours
        result = instance.handleClick("HOURS", "INCREMENT", props.value);
        expect(result.hours).toEqual(props.value.hours + 1);
        // Incrementing Hours to more than its maximum value should return the minimum value
        result = instance.handleClick("HOURS", "INCREMENT", { ...props.value, hours: 12 });
        expect(result.hours).toEqual(1);
        // Decrementing Hours
        result = instance.handleClick("HOURS", "DECREMENT", props.value);
        expect(result.hours).toEqual(props.value.hours - 1);
        // Decrementing Hours to less than its minimum value should return the maximum value
        result = instance.handleClick("HOURS", "DECREMENT", { ...props.value, hours: 1 });
        expect(result.hours).toEqual(12);

        // Incrementing Minutes
        result = instance.handleClick("MINUTES", "INCREMENT", props.value);
        expect(result.minutes).toEqual(props.value.minutes + 1);
        // Incrementing Minutes to more than its maximum value should return the minimum value
        result = instance.handleClick("MINUTES", "INCREMENT", { ...props.value, minutes: 59 });
        expect(result.minutes).toEqual(0);
        // Decrementing Minutes
        result = instance.handleClick("MINUTES", "DECREMENT", props.value);
        expect(result.minutes).toEqual(props.value.minutes - 1);
        // Decrementing Minutes to less than its minimum value should return the maximum value
        result = instance.handleClick("MINUTES", "DECREMENT", { ...props.value, minutes: 0 });
        expect(result.minutes).toEqual(59);

        // Incrementing Dayperiod
        result = instance.handleClick("DAYPERIOD", "INCREMENT", props.value);
        expect(result.dayperiod).toEqual(TimepickerDayperiodTypes.PM);
        result = instance.handleClick("DAYPERIOD", "INCREMENT", { ...props.value, dayperiod: TimepickerDayperiodTypes.PM });
        expect(result.dayperiod).toEqual(TimepickerDayperiodTypes.AM);
        // Decrementing Dayperiod
        result = instance.handleClick("DAYPERIOD", "DECREMENT", props.value);
        expect(result.dayperiod).toEqual(TimepickerDayperiodTypes.PM);
        result = instance.handleClick("DAYPERIOD", "DECREMENT", { ...props.value, dayperiod: TimepickerDayperiodTypes.PM });
        expect(result.dayperiod).toEqual(TimepickerDayperiodTypes.AM);
    });

    test("Test handleChange method", () => {
        const wrapper = shallow(<Timepicker {...props} />);
        const instance: any = wrapper.instance();
        let result: TimepickerValue;

        // Value passed should be of type `number`
        result = instance.handleChange("HOURS", "TEST", props.value);
        expect(result).toEqual(null);

        // Changing hours within range 1-12
        result = instance.handleChange("HOURS", 5, props.value);
        expect(result.hours).toEqual(5);
        // Chaning hours to more than 12 should reset to 12
        result = instance.handleChange("HOURS", 13, props.value);
        expect(result.hours).toEqual(12);
        // Changin hours to less than 1 should rest to 1
        result = instance.handleChange("HOURS", 0, props.value);
        expect(result.hours).toEqual(1);

        // Changing minutes within range 0 - 59
        result = instance.handleChange("MINUTES", 10, props.value);
        expect(result.minutes).toEqual(10);
        // Changing minutes to more than 59 should reset to 59
        result = instance.handleChange("MINUTES", 66, props.value);
        expect(result.minutes).toEqual(59);
        // Changing minutes to less than 0 should reset to 0
        result = instance.handleChange("MINUTES", -5, props.value);
        expect(result.minutes).toEqual(0);
    });

});
