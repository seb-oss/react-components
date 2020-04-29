import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Collapse } from "./Collapse";
import { act, Simulate } from "react-dom/test-utils";

describe("Util: Animations", () => {
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
        act(() => { render(<Collapse toggle={null}><div>Test</div></Collapse>, container); });
        expect(container).toBeDefined();
    });

    it("Should call custom transitionEnd when transition is triggered", () => {
        const onTransitionEnd: jest.Mock = jest.fn();
        act(() => {
            jest.useFakeTimers();
            render(<Collapse toggle onTransitionEnd={onTransitionEnd}><div>Test</div></Collapse>, container);
        });
        jest.spyOn(container.firstElementChild, "scrollHeight", "get").mockImplementation(() => 200);
        act(() => { jest.advanceTimersByTime(20); });
        act(() => { Simulate.transitionEnd(container.firstElementChild, { bubbles: true }); });
        expect(onTransitionEnd).toBeCalled();
    });

    it("Should expand and collapse correctly", () => {
        const transitionEvent = new Event("transitionend", { bubbles: true });
        transitionEvent["propertyName"] = "height";

        act(() => {
            jest.useFakeTimers();
            render(<TestBed />, container);
        });

        // Default state collapsed
        jest.spyOn(container.firstElementChild, "scrollHeight", "get").mockImplementation(() => 200);
        expect(container.firstElementChild.getAttribute("style")).toContain("opacity: 0;");
        expect(container.firstElementChild.getAttribute("style")).toContain("display: none;");
        expect(container.firstElementChild.getAttribute("style")).toContain("height: 0px;");

        // Expanding
        act(() => { jest.advanceTimersByTime(3020); });
        expect(container.firstElementChild.getAttribute("style")).toContain("opacity: 1;");
        expect(container.firstElementChild.getAttribute("style")).toContain("display: block;");
        expect(container.firstElementChild.getAttribute("style")).toContain("height: 200px;");
        act(() => { container.firstElementChild.dispatchEvent(transitionEvent); });
        expect(container.firstElementChild.getAttribute("style")).toContain("height: auto;");

        // Collapsing
        act(() => { jest.advanceTimersByTime(3020); });
        expect(container.firstElementChild.getAttribute("style")).toContain("opacity: 0;");
        expect(container.firstElementChild.getAttribute("style")).toContain("display: block;");
        expect(container.firstElementChild.getAttribute("style")).toContain("height: 0px;");
        act(() => { container.firstElementChild.dispatchEvent(transitionEvent); });
        expect(container.firstElementChild.getAttribute("style")).toContain("display: none;");
    });
});

const TestBed: React.FC = () => {
    const [toggle, setToggle] = React.useState<boolean>();
    React.useEffect(() => {
        setTimeout(() => {
            setToggle(true);
        }, 3000);
        setTimeout(() => {
            setToggle(false);
        }, 6000);
    }, []);
    return (
        <Collapse toggle={toggle}>
            <div>test</div>
        </Collapse>
    );
}
