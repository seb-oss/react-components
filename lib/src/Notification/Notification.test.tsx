import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { Notification, NotificationProps } from ".";

jest.useFakeTimers();

describe("Component: Notification", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render correctly", () => {
        act(() => {
            render(<Notification />, container);
        });
        expect(document.querySelector(".rc.notification")).not.toBeNull();
        expect(document.querySelector(".rc.notification .content-wrapper")).not.toBeNull();
        expect(document.querySelector(".rc.notification .content-wrapper .close")).not.toBeNull();
    });

    it("Should dismiss itself automatically after 5 seconds", () => {
        const onAnimationEnd: jest.Mock = jest.fn();

        act(() => {
            render(<TestBed onAnimationEnd={onAnimationEnd} />, container);
        });

        const notification: HTMLDivElement = document.querySelector(".rc.notification");

        expect(notification).not.toBeNull();
        expect(notification.classList.contains("show")).toBeFalsy();
        expect(notification.classList.contains("hide")).toBeFalsy();

        act(() => Simulate.click(container.querySelector("#toggle")));

        expect(notification.classList.contains("show")).toBeTruthy();
        expect(notification.classList.contains("hide")).toBeFalsy();

        act(() => jest.advanceTimersByTime(5000));

        expect(notification.classList.contains("show")).toBeFalsy();
        expect(notification.classList.contains("hide")).toBeTruthy();

        act(() => Simulate.animationEnd(document.querySelector(".rc.notification")));

        expect(notification.classList.contains("show")).toBeFalsy();
        expect(notification.classList.contains("hide")).toBeFalsy();
        expect(onAnimationEnd).toBeCalled();
    });

    it("Should accept custom dismiss timeout", () => {
        const customTimeout: number = 8000;

        act(() => {
            render(<TestBed dismissTimeout={customTimeout} />, container);
        });

        const notification: HTMLDivElement = document.querySelector(".rc.notification");

        expect(notification).not.toBeNull();
        expect(notification.classList.contains("show")).toBeFalsy();
        expect(notification.classList.contains("hide")).toBeFalsy();

        act(() => Simulate.click(container.querySelector("#toggle")));

        expect(notification.classList.contains("show")).toBeTruthy();
        expect(notification.classList.contains("hide")).toBeFalsy();

        act(() => jest.advanceTimersByTime(customTimeout));

        expect(notification.classList.contains("show")).toBeFalsy();
        expect(notification.classList.contains("hide")).toBeTruthy();
    });

    it("Should should not automatically dismiss when persist is enabled", () => {
        act(() => {
            render(<TestBed persist />, container);
        });

        act(() => Simulate.click(container.querySelector("#toggle")));

        jest.advanceTimersByTime(5000);

        const notification: HTMLDivElement = document.querySelector(".rc.notification");
        // Still showing
        expect(notification.classList.contains("show")).toBeTruthy();
        expect(notification.classList.contains("hide")).toBeFalsy();
    });

    describe("It should allow multiple themes", () => {
        const themes: NotificationProps["theme"][] = ["danger", "inverted", "primary", "purple", "success", "warning"];

        themes.forEach((theme) =>
            test(theme, () => {
                act(() => {
                    render(<Notification theme={theme} />, container);
                });

                expect(document.querySelector(".rc.notification").classList.contains(`theme-${theme}`)).toBeTruthy();
                const contentWrapper = document.querySelector(".content-wrapper");
                // Value rgba(0, 0, 0, 0) means that there is no style applied
                expect(window.getComputedStyle(contentWrapper).backgroundColor).not.toEqual("rgba(0, 0, 0, 0)");
            })
        );
    });

    describe("It should allow slide and bar types", () => {
        const types: NotificationProps["type"][] = ["slide", "bar"];

        types.forEach((type) =>
            test(type, () => {
                act(() => {
                    render(<Notification type={type} />, container);
                });

                expect(document.querySelector(".rc.notification").classList.contains(`type-${type}`)).toBeTruthy();
            })
        );
    });

    describe("It should allow multiple positions", () => {
        const positions: NotificationProps["position"][] = ["top", "bottom", "bottom-left", "bottom-right", "top-left", "top-right"];

        positions.forEach((position) =>
            test(position, () => {
                act(() => {
                    render(<Notification position={position} />, container);
                });

                expect(document.querySelector(".rc.notification").classList.contains(position)).toBeTruthy();
            })
        );
    });
});

const TestBed: React.FC<NotificationProps> = (props: NotificationProps) => {
    const [toggle, setToggle] = React.useState<boolean>(false);

    return (
        <>
            <button id="toggle" onClick={() => setToggle(!toggle)} />
            <Notification {...props} toggle={toggle} onDismiss={() => setToggle(false)} />
        </>
    );
};
