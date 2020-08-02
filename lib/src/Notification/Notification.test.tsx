import React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { Notification, NotificationProps, NotificationAction } from ".";

describe("Component: Notification", () => {
    let wrapper: ShallowWrapper<NotificationProps>;
    let onDismiss: jest.Mock;

    beforeEach(() => {
        onDismiss = jest.fn();
        wrapper = shallow(<Notification toggle={false} onDismiss={onDismiss} />);
    });

    it("Should render", () => expect(wrapper).toBeDefined());

    describe("Should render with defaults", () => {
        test("slide-in style should render with bottom-left position and purple theme", () => {
            expect(wrapper.hasClass("style-slide-in")).toBeTruthy();
            expect(wrapper.hasClass("bottom-left")).toBeTruthy();
            expect(wrapper.hasClass("theme-purple")).toBeTruthy();
        });

        test("bar style should render with top position and purple theme", () => {
            wrapper.setProps({ style: "bar" });
            expect(wrapper.hasClass("style-bar")).toBeTruthy();
            expect(wrapper.hasClass("top")).toBeTruthy();
            expect(wrapper.hasClass("theme-purple")).toBeTruthy();
        });

        it("Should dismiss when the default timer is done", async (done: jest.DoneCallback) => {
            expect.assertions(2);
            wrapper.setProps({ toggle: true, dismissTimeout: 500, onDismiss: () => wrapper.setProps({ toggle: false }) });
            expect(wrapper.hasClass("open")).toBeTruthy();
            await setTimeout(() => {
                expect(wrapper.hasClass("open")).toBeFalsy();
                done();
            }, 600);
        });

        it("Should render with defaults if style or position props passed is not supported", () => {
            wrapper.setProps({ style: "bingo" as any, position: "top-right" });
            expect(wrapper.hasClass("style-slide-in")).toBeTruthy();
            expect(wrapper.hasClass("top-right")).toBeTruthy();
            wrapper.setProps({ style: "slide-in", position: "top-left" });
            expect(wrapper.hasClass("style-slide-in")).toBeTruthy();
            expect(wrapper.hasClass("top-left")).toBeTruthy();
            wrapper.setProps({ position: "bingo" as any });
            expect(wrapper.hasClass("bottom-left")).toBeTruthy();
        });
    });

    it("Should render different variations of style, position and theme", () => {
        wrapper.setProps({ style: "bar", theme: "primary", position: "bottom" });
        expect(wrapper.hasClass("style-bar")).toBeTruthy();
        expect(wrapper.hasClass("theme-primary")).toBeTruthy();
        expect(wrapper.hasClass("bottom")).toBeTruthy();
    });

    it("Should pass custom class", () => {
        wrapper.setProps({ className: "myNotification" });
        expect(wrapper.hasClass("myNotification")).toBeTruthy();
    });

    it("Should render title and message", () => {
        wrapper.setProps({ title: "title", message: "message" });
        expect(wrapper.find(".notification-title").length).not.toBe(0);
        expect(wrapper.find(".notification-title").text()).toEqual("title");
        expect(wrapper.find(".notification-message").length).not.toBe(0);
        expect(wrapper.find(".notification-message").text()).toEqual("message");
    });

    it("Should allow dismissing with close button", () => {
        wrapper.setProps({ dismissable: true });
        expect(wrapper.find(".dismiss-btn")).toBeTruthy();
        wrapper.find(".dismiss-btn").simulate("click");
        expect(onDismiss).toBeCalled();
    });

    it("Should call onClick when notification is clicked", () => {
        const onClick: jest.Mock = jest.fn();
        wrapper.setProps({ onClick: onClick });
        wrapper.find(".content-wrapper").simulate("click");
        expect(wrapper.find(".content-wrapper").hasClass("clickable")).toBeTruthy();
        expect(onClick).toBeCalled();
    });

    it("Should render child element when passed", () => {
        const newWrapper: ShallowWrapper<NotificationProps> = shallow(
            <Notification toggle={true} onDismiss={jest.fn()}>
                <div className="testing">test</div>
            </Notification>
        );
        expect(newWrapper.find(".testing").length).not.toBe(0);
    });

    describe("Should render actions when passed", () => {
        it("Should not render actions if more than two actions are passed", () => {
            const actions: Array<NotificationAction> = [
                { text: "action1", action: jest.fn() },
                { text: "action2", action: jest.fn() },
                { text: "action3", action: jest.fn() },
            ];
            wrapper.setProps({ actions: actions });
            expect(wrapper.find(".actions-wrapper").length).toBe(0);
        });

        it("Should not render actions if the style is set to bar", () => {
            wrapper.setProps({ style: "bar", actions: [{ text: "actions1", action: jest.fn() }] });
            expect(wrapper.find(".actions-wrapper").length).toBe(0);
        });

        it("Should render one action taking the whole width", () => {
            wrapper.setProps({ actions: [{ text: "action1", action: jest.fn() }] });
            expect(wrapper.find(".actions-wrapper").length).not.toBe(0);
            expect(wrapper.find(".actions-wrapper").hasClass("partitioned")).toBeFalsy();
        });

        it("Should render two actions with equal width", () => {
            const actions: Array<NotificationAction> = [
                { text: "action1", action: jest.fn() },
                { text: "action2", action: jest.fn() },
            ];
            wrapper.setProps({ actions: actions });
            expect(wrapper.find(".actions-wrapper").length).not.toBe(0);
            expect(wrapper.find(".actions-wrapper").hasClass("partitioned")).toBeTruthy();
        });

        it("Should render actions with correct label and action callback should be called when clicked", () => {
            const actions: Array<NotificationAction> = [
                { text: "action1", action: jest.fn() },
                { text: "action2", action: jest.fn() },
            ];
            wrapper.setProps({ actions: actions });
            expect(wrapper.find(".action-wrapper").first().find("button").text()).toEqual(actions[0].text);
            expect(wrapper.find(".action-wrapper").at(1).find("button").text()).toEqual(actions[1].text);
            wrapper.find(".action-wrapper").first().find("button").simulate("click");
            wrapper.find(".action-wrapper").at(1).find("button").simulate("click");
            expect(actions[0].action).toBeCalled();
            expect(actions[1].action).toBeCalled();
        });
    });

    it("Should not start timer if persist prop is set to true", async (done: jest.DoneCallback) => {
        expect.assertions(2);
        wrapper.setProps({ persist: true, dismissTimeout: 500 });
        wrapper.setProps({ toggle: true });
        expect(wrapper.hasClass("open")).toBeTruthy();

        await setTimeout(() => {
            expect(wrapper.hasClass("open")).toBeTruthy();
            done();
        }, 600);
    });

    it("Should clear timers when it unmounts", async (done: jest.DoneCallback) => {
        const newWrapper: ReactWrapper<NotificationProps> = mount(<Notification toggle={false} onDismiss={jest.fn()} />);
        // The timer is instantiated When the component is mounted
        newWrapper.setProps({ toggle: true }, () => expect((newWrapper.instance() as Notification).timerRef).not.toBeNull());
        const timeoutRef = await setTimeout(() => {
            newWrapper.instance().componentWillUnmount();
            expect((newWrapper.instance() as Notification).timerRef).toBeNull();
            done();
            clearTimeout(timeoutRef);
        }, 500);
    });
});
