import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Collapse } from "./Collapse";
import { act, Simulate } from "react-dom/test-utils";

describe("Util: Collapse", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        jest.useFakeTimers();
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        jest.clearAllMocks();
    });

    it("Should render", () => {
        act(() => {
            render(
                <Collapse toggle={null}>
                    <div>Test</div>
                </Collapse>,
                container
            );
        });
        expect(container).toBeDefined();
    });

    it("Should call custom transitionEnd when transition is triggered", () => {
        const onTransitionEnd: jest.Mock = jest.fn();
        act(() => {
            jest.useFakeTimers();
            render(
                <Collapse toggle onTransitionEnd={onTransitionEnd}>
                    <div>Test</div>
                </Collapse>,
                container
            );
        });
        act(() => {
            Simulate.transitionEnd(container.firstElementChild, { bubbles: true, propertyName: "height" } as any);
            Simulate.transitionEnd(container.firstElementChild, { bubbles: true, propertyName: "width" } as any);
        });
        expect(onTransitionEnd).toBeCalledTimes(2);
    });

    it("Should expand and collapse correctly", () => {
        act(() => {
            jest.useFakeTimers();
            render(<TestBed />, container);
        });

        jest.spyOn(container.firstElementChild, "scrollHeight", "get").mockImplementation(() => 200);

        // Default state collapsed
        expect(container.firstElementChild.getAttribute("style")).toContain("opacity: 0;");
        expect(container.firstElementChild.getAttribute("style")).toContain("display: none;");
        expect(container.firstElementChild.getAttribute("style")).toContain("height: 0px;");

        // Expanding
        act(() => {
            Simulate.click(container.querySelector("#toggle"));
        });
        expect(container.firstElementChild.getAttribute("style")).toContain("display: block;");

        act(() => {
            jest.advanceTimersByTime(20);
        });
        expect(container.firstElementChild.getAttribute("style")).toContain("opacity: 1;");
        expect(container.firstElementChild.getAttribute("style")).toContain("height: 200px;");
        act(() => {
            Simulate.transitionEnd(container.firstElementChild, { bubbles: true, propertyName: "height" } as any);
        });
        expect(container.firstElementChild.getAttribute("style")).toContain("height: auto;");

        // Collapsing
        act(() => {
            Simulate.click(container.querySelector("#toggle"));
        });
        expect(container.firstElementChild.getAttribute("style")).toContain("display: block;");
        act(() => {
            jest.advanceTimersByTime(20);
        });
        expect(container.firstElementChild.getAttribute("style")).toContain("opacity: 0;");
        expect(container.firstElementChild.getAttribute("style")).toContain("height: 0px;");
        act(() => {
            Simulate.transitionEnd(container.firstElementChild, { bubbles: true, propertyName: "height" } as any);
        });
        expect(container.firstElementChild.getAttribute("style")).toContain("display: none;");
    });

    it("Should render correctly when toggle is not initialized", () => {
        act(() => {
            render(<Collapse />, container);
        });

        expect(container.firstElementChild.getAttribute("style")).toContain("opacity: 0;");
        expect(container.firstElementChild.getAttribute("style")).toContain("display: none;");
        expect(container.firstElementChild.getAttribute("style")).toContain("height: 0px;");
    });
});

const TestBed: React.FC = () => {
    const [toggle, setToggle] = React.useState<boolean>(false);

    return (
        <>
            <Collapse toggle={toggle}>
                <div>test</div>
            </Collapse>
            <button id="toggle" onClick={() => setToggle(!toggle)}>
                toggle
            </button>
        </>
    );
};
