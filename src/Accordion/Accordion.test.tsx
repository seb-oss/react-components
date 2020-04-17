import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Accordion, AccrodionListItem } from "./Accordion";
import { loremIpsum } from "lorem-ipsum";
import { deepCopy } from "@sebgroup/frontend-tools/dist/deepCopy";

describe("Component: Accordion", () => {
    let container: HTMLDivElement = null;
    const accordionList: Array<AccrodionListItem> = [
        {
            header: loremIpsum({ units: "word" }),
            content: loremIpsum({ units: "sentence" }),
        },
        {
            header: loremIpsum({ units: "word" }),
            subHeader: loremIpsum({ units: "word" }),
            content: <p>{loremIpsum({ units: "paragraph" })}</p>,
        },
    ];

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render custom className and id", () => {
        const className: string = "myAccordionClass";
        const id: string = "myAccordionId";
        act(() => {
            render(<Accordion list={accordionList} className={className} id={id} />, container);
        });
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
        expect(container.firstElementChild.id).toEqual(id);
    });

    it("Should render subheader is included in props and content as html", () => {
        const newAccordionList: Array<AccrodionListItem> = deepCopy(accordionList);
        newAccordionList[0].subHeader = "Test subheader";
        act(() => {
            render(<Accordion list={newAccordionList} />, container);
        });
        expect(container.querySelectorAll("h6").length).toBeGreaterThan(0);
        expect(container.querySelectorAll(".content").item(1).firstElementChild instanceof HTMLParagraphElement).toBeTruthy();
    });

    it("Should toggle accordion when clicked, and toggled off when another item is clicked", () => {
        act(() => {
            render(<Accordion list={accordionList} />, container);
        });
        act(() => {
            container
                .querySelectorAll("button")
                .item(0)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(container.querySelectorAll(".card").item(0).classList.contains("collapsed")).toBeFalsy();

        act(() => {
            container
                .querySelectorAll("button")
                .item(1)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(container.querySelectorAll(".card").item(0).classList.contains("collapsed")).toBeTruthy();
        expect(container.querySelectorAll(".card").item(1).classList.contains("collapsed")).toBeFalsy();
    });

    it("Should untoggle accordion when clicked again", () => {
        act(() => {
            render(<Accordion list={accordionList} />, container);
        });
        // jest.spyOn(container.querySelector(".content-wrapper").firstElementChild, "scrollHeight", "get").mockImplementation(() => 200);
        act(() => {
            container
                .querySelectorAll("button")
                .item(0)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(container.querySelectorAll(".card").item(0).classList.contains("collapsed")).toBeFalsy();

        act(() => {
            container
                .querySelectorAll("button")
                .item(0)
                .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(container.querySelectorAll(".card").item(0).classList.contains("collapsed")).toBeTruthy();
    });

    it("Should render alternative style", () => {
        act(() => {
            render(<Accordion list={accordionList} alternative />, container);
        });
        expect(container.firstElementChild.classList.contains("alternative")).toBeTruthy();
    });

    it("Should not crash when list prop is passed null or undefined", () => {
        act(() => {
            render(<Accordion list={null} />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should not crash when invalid header, subheader, and content is passed", () => {
        act(() => {
            render(<Accordion list={[{ header: {}, subHeader: {}, content: {} }]} />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should not crash when passing primitive type values as header, subheader or content", () => {
        act(() => {
            render(<Accordion list={[{ header: "hello", subHeader: "hello", content: "hello" }]} />, container);
        });
        expect(container).toBeDefined();
    });
});
