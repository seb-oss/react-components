import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Collapse } from "./Collapse";
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
        act(() => { render(<Collapse data-toggle={null}><div>Test</div></Collapse>, container); });
        expect(container).toBeDefined();
    });

    it("Should expand with correct height", () => {
        act(() => {
            render(<Collapse data-toggle={true}><div className="test">Test</div></Collapse>, container, () => {
                jest.spyOn(container.firstElementChild, "scrollHeight", "get").mockImplementation(() => 200);
            });
        });
        expect(container.firstElementChild.getAttribute("style")).toContain("height: 200px; opacity: 1;");
    });
});
