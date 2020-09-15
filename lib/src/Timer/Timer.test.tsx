import React from "react";
import { shallow, mount } from "enzyme";
import { Timer } from ".";

describe("Component: Timer", () => {
    const props = {
        duration: 1000,
        callback: jest.fn(),
    };

    it("Should render", () => {
        const wrapper = shallow(<Timer {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myTimerClass";
        const id: string = "myTimerId";
        const wrapper = shallow(<Timer {...props} className={className} id={id} />);
        expect(wrapper.hasClass(className)).toBeTruthy();
        expect(wrapper.find(`#${id}`).length).toBeTruthy();
    });

    it("check callback method", (done) => {
        const wrapper = mount(<Timer {...props} />);
        setTimeout(() => {
            expect(wrapper.props().callback).toBeCalled();
            done();
        }, 1000);
    });

    test("Test Timer convertMStoTime method", () => {
        const wrapper = shallow(<Timer {...props} />);
        const instance: any = wrapper.instance();
        let value: string = instance.convertMStoTime(3600000);
        expect(value).toEqual("1:00:00");

        value = instance.convertMStoTime(60000);
        expect(value).toEqual("01:00");
        value = instance.convertMStoTime(600000);
        expect(value).toEqual("10:00");

        value = instance.convertMStoTime(1000);
        expect(value).toEqual("00:01");
        value = instance.convertMStoTime(10000);
        expect(value).toEqual("00:10");

        value = instance.convertMStoTime(3661000);
        expect(value).toEqual("1:01:01");
    });

    test("Test Timer clearInterval method", () => {
        const wrapper = shallow(<Timer {...props} />);
        const instance: any = wrapper.instance();
        instance.innerInterval = setInterval(() => {
            console.log("interval started");
        }, 1000);
        instance.clearInterval();
        expect(instance.innerInterval).toEqual(null);
    });

    test("Test Timer startInterval method", (done) => {
        const wrapper = shallow(<Timer {...props} />);
        const instance: any = wrapper.instance();
        instance.startInterval(1000);
        expect(instance.innerInterval).toBeDefined();
        setTimeout(() => {
            expect(instance.innerInterval).toEqual(null);
            done();
        }, 2000);
    });

    test("Timer should be cleared before component unmounts", () => {
        const wrapper = shallow(<Timer {...props} />);
        const instance: any = wrapper.instance();
        instance.startInterval(1000);
        wrapper.instance().componentWillUnmount();
        expect(instance.innerInterval).toEqual(null);
    });

    test("Timer Should not update its value when component re-renders unless receives updates", (done) => {
        const newProps = {
            duration: 3000,
            callback: jest.fn(),
        };
        const wrapper = shallow(<Timer {...newProps} />);
        const instance: any = wrapper.instance();

        // Re-render without updates
        wrapper.instance().componentDidUpdate({ ...newProps }, { ...newProps });
        expect(instance.innerInterval).toBeDefined();

        // Re-render with updates
        newProps.duration = 2000;
        wrapper.setProps(newProps);
        wrapper.instance().componentDidUpdate(newProps, newProps);
        expect(instance.innerInterval).toBeDefined();

        setTimeout(() => {
            expect(instance.innerInterval).toEqual(null);
            done();
        }, 3000);
    });

    it("check null/undefined duration", () => {
        const newProps = {
            duration: null,
            callback: jest.fn(),
        };
        const wrapper = shallow(<Timer {...newProps} />);
        const instance: any = wrapper.instance();
        expect(instance.innerInterval).toBe(undefined);

        newProps.duration = undefined;
        wrapper.setProps(newProps);
        expect(instance.innerInterval).toBe(undefined);

        newProps.duration = 1000;
        wrapper.setProps(newProps);
        expect(instance.innerInterval).not.toBe(undefined);
    });
});
