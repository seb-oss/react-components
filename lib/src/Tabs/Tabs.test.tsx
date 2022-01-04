import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Tabs, TabItem, TabsProps } from ".";
import { act, Simulate } from "react-dom/test-utils";

type TabsKeyboardEventTestCase = {
    statement: string;
    triggerEvent: () => void;
    expectedOutcome: () => void;
    props: TabsProps;
};

describe("Component: Tabs", () => {
    let container: HTMLDivElement = null;
    const tabItems: string[] = ["First", "Second", "Third"];

    const renderComponent = ({ children, ...props }: TabsProps = {}, items: string[] = []) => {
        act(() => {
            render(
                <Tabs {...props}>
                    {items.map((tab: string) => (
                        <TabItem key={tab}>{tab}</TabItem>
                    ))}
                    {children}
                </Tabs>,
                container
            );
        });
    };

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render", () => {
        renderComponent();
        expect(container).toBeDefined();
        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("ul");
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("nav")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("nav-tabs")).toBeTruthy();
        expect(container.firstElementChild.getAttribute("role")).toEqual("tablist");
    });

    it("Should render tab items correctly", () => {
        renderComponent({}, tabItems);

        const items = container.querySelectorAll("a");

        expect(items).toHaveLength(tabItems.length);
        expect(items.item(0).getAttribute("data-index-number")).toEqual("0");
        expect(items.item(1).getAttribute("data-index-number")).toEqual("1");
    });

    it("Should render non HTML elements", () => {
        renderComponent({ children: "test123" }, tabItems);
        expect(container.firstElementChild.textContent).toContain("test123");
    });

    it("Should fire onTabChange when an item is clicked", () => {
        const onTabChange: jest.Mock = jest.fn();
        renderComponent({ value: 0, onTabChange }, tabItems);

        act(() => Simulate.click(container.querySelectorAll("a").item(1)));

        expect(onTabChange).toBeCalledWith(1);
    });

    describe("Tabs keyboard event", () => {
        const onTabChange: jest.Mock = jest.fn();
        const onTabDelete: jest.Mock = jest.fn();
        const testCases: Array<TabsKeyboardEventTestCase> = [
            {
                statement: "focus next element on arrow right button pressed",
                triggerEvent: () => Simulate.keyDown(container.querySelector(".nav-tabs"), { key: "ArrowRight" }),
                expectedOutcome: () => expect(document.activeElement.textContent).toBe(tabItems[2]),
                props: { value: 1 },
            },
            {
                statement: "focus previous element on arrow left button pressed",
                triggerEvent: () => Simulate.keyDown(container.querySelector(".nav-tabs"), { key: "ArrowLeft" }),
                expectedOutcome: () => expect(document.activeElement.textContent).toBe(tabItems[0]),
                props: { value: 1 },
            },
            {
                statement: "focus first element on home button pressed",
                triggerEvent: () => Simulate.keyDown(container.querySelector(".nav-tabs"), { key: "Home" }),
                expectedOutcome: () => expect(document.activeElement.textContent).toBe(tabItems[0]),
                props: { value: 1 },
            },
            {
                statement: "focus first element on end button pressed",
                triggerEvent: () => Simulate.keyDown(container.querySelector(".nav-tabs"), { key: "End" }),
                expectedOutcome: () => expect(document.activeElement.textContent).toBe(tabItems[tabItems.length - 1]),
                props: { value: 1 },
            },
            {
                statement: "set tab item as active on spacebar pressed",
                triggerEvent: () => Simulate.keyDown(container.querySelector(".nav-tabs"), { key: " " }),
                expectedOutcome: () => expect(onTabChange).toBeCalled(),
                props: { value: 1, onTabChange },
            },
            {
                statement: "set tab item as active on enter pressed",
                triggerEvent: () => Simulate.keyDown(container.querySelector(".nav-tabs"), { key: "Enter" }),
                expectedOutcome: () => expect(onTabChange).toBeCalled(),
                props: { value: 1, onTabChange },
            },
            {
                statement: "fire onTabDelete on delete pressed",
                triggerEvent: () => Simulate.keyDown(container.querySelector(".nav-tabs"), { key: "Delete" }),
                expectedOutcome: () => expect(onTabDelete).toBeCalled(),
                props: { value: 1, onTabDelete },
            },
            {
                statement: "should set focus element as active on arrow right button pressed when autoSelectOnFocus is set",
                triggerEvent: () => Simulate.keyDown(container.querySelector(".nav-tabs"), { key: "ArrowRight" }),
                expectedOutcome: () => expect(onTabChange).toBeCalled(),
                props: { value: 1, onTabChange, autoSelectOnFocus: true },
            },
        ];
        testCases.forEach((testCase: TabsKeyboardEventTestCase) => {
            it(testCase.statement, () => {
                renderComponent(testCase.props, tabItems);
                testCase.triggerEvent();
                testCase.expectedOutcome();
            });
        });
    });
});
