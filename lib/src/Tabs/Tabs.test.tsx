import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Tabs, TabItem } from ".";
import { act, Simulate } from "react-dom/test-utils";

describe("Component: Tabs", () => {
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

    it("Should render", () => {
        act(() => {
            render(<Tabs />, container);
        });
        expect(container).toBeDefined();
        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("ul");
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("nav")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("nav-tabs")).toBeTruthy();
        expect(container.firstElementChild.getAttribute("role")).toEqual("tablist");
    });

    it("Should render tab items correctly", () => {
        act(() => {
            render(
                <Tabs>
                    <TabItem>First</TabItem>
                    <TabItem>Second</TabItem>
                </Tabs>,
                container
            );
        });

        const items = container.querySelectorAll("a");

        expect(items).toHaveLength(2);
        expect(items.item(0).getAttribute("data-index-number")).toEqual("0");
        expect(items.item(1).getAttribute("data-index-number")).toEqual("1");
    });

    it("Should render non HTML elements", () => {
        act(() => {
            render(
                <Tabs>
                    <TabItem>First</TabItem>
                    <TabItem>Second</TabItem>
                    test123
                </Tabs>,
                container
            );
        });

        expect(container.firstElementChild.textContent).toContain("test123");
    });

    it("Should fire onTabChange when an item is clicked", () => {
        const onTabChange: jest.Mock = jest.fn();

        act(() => {
            render(
                <Tabs value={0} onTabChange={onTabChange}>
                    <TabItem>First</TabItem>
                    <TabItem>Second</TabItem>
                </Tabs>,
                container
            );
        });

        act(() => Simulate.click(container.querySelectorAll("a").item(1)));

        expect(onTabChange).toBeCalledWith(1);
    });
});
