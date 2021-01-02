import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Timepicker } from ".";
import { act } from "react-dom/test-utils";

describe("Component: Timepicker", () => {
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
            render(<Timepicker name="test" onChange={jest.fn()} value={{ hours: 1, minutes: 0, dayperiod: "AM" as any }} />, container);
        });
        expect(container).toBeDefined();
    });
});
