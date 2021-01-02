import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { Notification, NotificationProps, NotificationAction } from ".";

describe("Component: Notification", () => {
    let container: HTMLDivElement = null;
    let onDismiss: jest.Mock = jest.fn();
    const actions: Array<NotificationAction> = [
        { text: "action1", action: jest.fn() },
        { text: "action2", action: jest.fn() },
        { text: "action3", action: jest.fn() },
    ];
    const props: NotificationProps = {
        toggle: false,
        onDismiss,
    };

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        jest.clearAllMocks();
    });

    it("Should render", () => {
        act(() => {
            render(<Notification {...props} />, container);
        });
        expect(container.querySelector(".rc.custom-notification")).not.toBeNull();
    });

    describe("Should render with defaults", () => {
        test("slide-in style should render with bottom-left position and purple theme", () => {
            act(() => {
                render(<Notification {...props} />, container);
            });
            expect(container.querySelector(".style-slide-in")).not.toBeNull();
            expect(container.querySelector(".bottom-left")).not.toBeNull();
            expect(container.querySelector(".theme-purple")).not.toBeNull();
        });

        test("bar style should render purple theme", () => {
            act(() => {
                render(<Notification {...props} type="bar" />, container);
            });
            expect(container.querySelector(".style-bar")).not.toBeNull();
            expect(container.querySelector(".theme-purple")).not.toBeNull();
        });

        it("Should dismiss when the default timer is done", async () => {
            jest.useFakeTimers();
            act(() => {
                render(<Notification {...props} toggle dismissTimeout={500} />, container);
            });
            expect(container.querySelector(".open")).not.toBeNull();
            jest.runAllTimers();
            expect(onDismiss).toBeCalled();
        });

        it("Should render with defaults if type is not supported", () => {
            act(() => {
                render(<Notification {...props} type={"bingo" as any} />, container);
            });
            expect(container.querySelector(".default")).not.toBeNull();
        });
    });

    it("Should render different variations of style, position and theme", () => {
        act(() => {
            render(<Notification {...props} type="bar" theme="primary" position="bottom" />, container);
        });
        expect(container.querySelector(".style-bar")).not.toBeNull();
        expect(container.querySelector(".theme-primary")).not.toBeNull();
        expect(container.querySelector(".bottom")).not.toBeNull();
    });

    it("Should pass custom class", () => {
        const className: string = "myNotification";
        act(() => {
            render(<Notification {...props} className={className} />, container);
        });
        expect(container.querySelector(`.${className}`)).not.toBeNull();
    });

    it("Should render title and message", () => {
        const title: string = "title";
        const message: string = "message";
        act(() => {
            render(<Notification {...props} title={title} message={message} />, container);
        });
        expect(container.querySelector(".notification-title")).not.toBeNull();
        expect(container.querySelector(".notification-title").innerHTML).toBe(title);
        expect(container.querySelector(".notification-message")).not.toBeNull();
        expect(container.querySelector(".notification-message").innerHTML).toBe(message);
    });

    it("Should allow dismissing with close button", () => {
        act(() => {
            render(<Notification {...props} dismissable />, container);
        });
        expect(container.querySelector(".dismiss-btn")).not.toBeNull();
        Simulate.click(container.querySelector(".dismiss-btn"));
        expect(onDismiss).toBeCalled();
    });

    it("Should call onClick when notification is clicked", () => {
        const onClick: jest.Mock = jest.fn();
        act(() => {
            render(<Notification {...props} onClick={onClick} />, container);
        });
        Simulate.click(container.querySelector(".content-wrapper"));
        expect(container.querySelector(".content-wrapper").classList).toContain("clickable");
        expect(onClick).toBeCalled();
    });

    it("Should render child element when passed", () => {
        act(() => {
            render(
                <Notification {...props}>
                    <div className="testing">test</div>
                </Notification>,
                container
            );
        });
        expect(container.querySelector(".testing")).not.toBeNull();
    });

    describe("Should render actions when passed", () => {
        it("Should render actions", () => {
            act(() => {
                render(<Notification {...props} actions={actions} />, container);
            });
            expect(container.querySelector(".actions-wrapper")).not.toBeNull();
        });

        it("Should not render actions if the style is set to bar", () => {
            act(() => {
                render(<Notification {...props} type="bar" actions={actions} />, container);
            });
            expect(container.querySelector(".actions-wrapper")).toBeNull();
        });

        it("Should render one action taking the whole width", () => {
            act(() => {
                render(<Notification {...props} actions={[actions[0]]} />, container);
            });
            expect(container.querySelector(".actions-wrapper")).not.toBeNull();
            expect(container.querySelector(".actions-wrapper").classList).not.toContain("partitioned");
        });

        it("Should render two actions with equal width", () => {
            act(() => {
                render(<Notification {...props} actions={actions} />, container);
            });
            expect(container.querySelector(".actions-wrapper")).not.toBeNull();
            expect(container.querySelector(".actions-wrapper").classList).toContain("partitioned");
        });

        it("Should render actions with correct label and action callback should be called when clicked", () => {
            act(() => {
                render(<Notification {...props} actions={actions} />, container);
            });
            actions.map((item: NotificationAction, index: number) => {
                expect(container.querySelectorAll(".action-wrapper")[index].querySelector("button").innerHTML).toBe(item.text);
                Simulate.click(container.querySelectorAll(".action-wrapper")[index].querySelector("button"));
                expect(item.action).toBeCalled();
            });
        });
    });

    it("Should not start timer if persist prop is set to true", () => {
        jest.useFakeTimers();
        act(() => {
            render(<Notification {...props} toggle dismissTimeout={500} persist />, container);
        });
        expect(container.querySelector(".open")).not.toBeNull();
        jest.runAllTimers();
        expect(onDismiss).not.toBeCalled();
    });
});
