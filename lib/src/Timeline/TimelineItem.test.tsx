import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { TimelineItem, TimelineItemProps } from "./TimelineItem";

describe("Component: TimelineItem", () => {
    let container: HTMLDivElement = null;
    const props: TimelineItemProps = {
        header: "My header",
        time: "Now",
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

    it("Should render corectly", () => {
        act(() => {
            render(<TimelineItem {...props} />, container);
        });

        expect(container).toBeDefined();
        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("div");
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("timeline-item")).toBeTruthy();
        expect(container.querySelector(".content-wrapper")).not.toBeNull();
        expect(container.querySelector(".time-wrapper")).not.toBeNull();
        expect(container.querySelector(".title")).not.toBeNull();
        expect(container.querySelector(".title").textContent).toEqual(props.header);
        expect(container.querySelector("time")).not.toBeNull();
        expect(container.querySelector("time").textContent).toEqual(props.time);
    });

    it("Should render children correctly", () => {
        const content: string = "my content";
        act(() => {
            render(<TimelineItem {...props}>{content}</TimelineItem>, container);
        });

        expect(container.querySelector(".desc")).not.toBeNull();
        expect(container.querySelector(".desc").innerHTML).toContain(content);
    });

    it("Should add clickable classname when onClick method is passed, and extra classnames", () => {
        const className: string = "myClassName";
        act(() => {
            render(<TimelineItem {...props} onClick={console.log} className={className} />, container);
        });

        expect(container.firstElementChild.classList.contains("clickable")).toBeTruthy();
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });
});
