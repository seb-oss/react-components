import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { AccordionItem } from "../Accordion";
import { renderToStaticMarkup } from "react-dom/server";

describe("Component: Accordion", () => {
    let container: HTMLDivElement = null;

    /** To disable Collapse setTimeout calls */
    beforeAll(() => jest.useFakeTimers());

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render correctly", () => {
        act(() => {
            render(<AccordionItem header="test" />, container);
        });
        expect(container.firstElementChild.classList.contains("card")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("collapsed")).toBeTruthy();
        expect(container.firstElementChild.children.length).toBe(2);
        expect(container.firstElementChild.firstElementChild.classList.contains("card-header")).toBeTruthy();
        expect(container.firstElementChild.firstElementChild.firstElementChild.tagName).toEqual("BUTTON");
        expect(container.firstElementChild.firstElementChild.firstElementChild.firstElementChild.tagName).toEqual("H4");
        expect(container.firstElementChild.lastElementChild.classList.contains("collapse")).toBeTruthy();
        expect(container.firstElementChild.lastElementChild.classList.contains("collapsed")).toBeTruthy();
        expect(container.firstElementChild.lastElementChild.firstElementChild.classList.contains("card-body")).toBeTruthy();
        expect(container.firstElementChild.lastElementChild.firstElementChild.firstElementChild.classList.contains("content")).toBeTruthy();
        expect(container.firstElementChild.id).toBeDefined();
    });

    it("Should render header, subheader and content correctly", () => {
        const header: string = "myHeader";
        const subHeader: string = "mySubHeader";
        const content: string = "myContent";
        act(() => {
            render(
                <AccordionItem header={header} subHeader={subHeader}>
                    {content}
                </AccordionItem>,
                container
            );
        });
        expect(container.querySelector("h4").innerHTML).toEqual(header);
        expect(container.querySelector("h6").innerHTML).toEqual(subHeader);
        expect(container.querySelector(".content").innerHTML).toEqual(content);
    });

    it("Should be default to expanded when defaultValue is set to true", () => {
        act(() => {
            render(<AccordionItem header="test" defaultChecked />, container);
        });
        expect(container.firstElementChild.classList.contains("collapsed")).toBeFalsy();
        expect(container.firstElementChild.lastElementChild.classList.contains("collapsed")).toBeFalsy();
    });

    it("Should render parent id in collapse div when available", () => {
        const parentId: string = "123";
        act(() => {
            render(<AccordionItem header="test" data-parent-id={parentId} />, container);
        });
        expect(container.querySelector(".collapse").getAttribute("data-parent")).toEqual(`#${parentId}`);
    });

    it("Should trigger onToggle when button is clicked", () => {
        const onToggle: jest.Mock = jest.fn();
        act(() => {
            render(<AccordionItem header="test" onToggle={onToggle} />, container);
        });
        act(() => {
            container.querySelector("button").click();
        });
        expect(onToggle).toBeCalled();
    });

    it("Should allow rendering nodes in header, subheader, and children", () => {
        const element: JSX.Element = <p>test</p>;
        act(() => {
            render(
                <AccordionItem header={element} subHeader={element}>
                    {element}
                </AccordionItem>,
                container
            );
        });
        expect(container.querySelector("h4").innerHTML).toEqual(renderToStaticMarkup(element));
        expect(container.querySelector("h6").innerHTML).toEqual(renderToStaticMarkup(element));
        expect(container.querySelector(".content").innerHTML).toEqual(renderToStaticMarkup(element));
    });
});
