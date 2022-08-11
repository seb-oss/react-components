import { createEvent, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { act } from "react-dom/test-utils";
import { Collapse } from "./Collapse";

type TransitionProperty = "height" | "width";

describe("Util: Collapse", () => {
    const collapsedStyle: Record<string, unknown> = {
        display: "none",
        opacity: 0,
    };
    const expandedStyle: Record<string, unknown> = {
        display: "block",
        opacity: 1,
    };

    function simulateTransition(collapse: HTMLElement, property: TransitionProperty): void {
        const transitionEndEvent = createEvent.transitionEnd(collapse, { bubbles: true, cancelable: false });
        (transitionEndEvent as any).propertyName = property;
        fireEvent(collapse, transitionEndEvent);
    }

    it("Should render", () => {
        render(
            <Collapse toggle={null}>
                <div>Test</div>
            </Collapse>
        );
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("Should call custom transitionEnd when transition is triggered", () => {
        const onTransitionEnd: jest.Mock = jest.fn();
        render(
            <Collapse data-testid="collapse" toggle onTransitionEnd={onTransitionEnd}>
                <div>Test</div>
            </Collapse>
        );
        const collapse: HTMLDivElement = screen.getByTestId("collapse");
        simulateTransition(collapse, "height");
        simulateTransition(collapse, "width");
        expect(onTransitionEnd).toBeCalledTimes(2);
    });

    it("Should expand and collapse correctly", async () => {
        const mockScrollHeight: number = 200;
        jest.useFakeTimers();
        render(<TestBed />);
        const collapse: HTMLDivElement = screen.getByTestId("collapse");
        jest.spyOn(collapse, "scrollHeight", "get").mockImplementation(() => mockScrollHeight);

        // Default state collapsed
        expect(collapse).toHaveStyle(collapsedStyle);

        // Expanding
        userEvent.click(screen.getByRole("button"));
        await waitFor(() => expect(collapse).toHaveStyle(`height: ${mockScrollHeight}px`));
        act(() => {
            jest.advanceTimersByTime(20);
        });
        await waitFor(() => expect(collapse).toHaveStyle(expandedStyle));
        simulateTransition(collapse, "height");
        expect(collapse).toHaveStyle({ height: "auto" });

        // Collapsing
        userEvent.click(screen.getByRole("button"));
        await waitFor(() => expect(collapse).not.toHaveStyle({ height: "auto" }));
        act(() => {
            jest.advanceTimersByTime(20);
        });
        simulateTransition(collapse, "height");
        await waitFor(() => expect(collapse).toHaveStyle(collapsedStyle));
        jest.clearAllTimers();
    });

    it("Should render correctly when toggle is not initialized", () => {
        render(<Collapse data-testid="collapse" />);
        expect(screen.getByTestId("collapse")).toHaveStyle(collapsedStyle);
    });
});

const TestBed: React.FC = () => {
    const [toggle, setToggle] = React.useState<boolean>(false);
    return (
        <>
            <Collapse data-testid="collapse" toggle={toggle}>
                <div>test</div>
            </Collapse>
            <button id="toggle" onClick={() => setToggle(!toggle)}>
                toggle
            </button>
        </>
    );
};
