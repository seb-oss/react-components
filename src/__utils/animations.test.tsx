import * as React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { SlideUpDown } from "./animations";
import { act } from "react-dom/test-utils";

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
        act(() => { render(<SlideUpDown triggerValue={null}><div>Test</div></SlideUpDown>, container); });
        expect(container).toBeDefined();
    });

    it("Should expand with corrent height", () => {
        act(() => { render(<SlideUpDown triggerValue={null}><div className="test">Test</div></SlideUpDown>, container, () => {
            jest.spyOn(container.querySelector(".test"), "scrollHeight", "get").mockImplementation(() => 200);
        }); });
        expect(container.querySelector(".expand").getAttribute("style")).toContain("height: 200px");
    });
});
