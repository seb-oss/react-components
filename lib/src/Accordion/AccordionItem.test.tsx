import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AccordionItem } from ".";

describe("Component: Accordion", () => {
    it("Should render correctly", () => {
        const { container }: RenderResult = render(<AccordionItem header="test" />);
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
        render(
            <AccordionItem header={header} subHeader={subHeader}>
                {content}
            </AccordionItem>
        );
        expect(screen.getByText(header)).toBeInTheDocument();
        expect(screen.getByText(subHeader)).toBeInTheDocument();
        expect(screen.getByText(content)).toBeInTheDocument();
    });

    it("Should be default to expanded when defaultValue is set to true", () => {
        const { container }: RenderResult = render(<AccordionItem header="test" defaultChecked />);
        expect(container.firstElementChild.classList.contains("collapsed")).toBeFalsy();
        expect(container.firstElementChild.lastElementChild.classList.contains("collapsed")).toBeFalsy();
    });

    it("Should render parent id in collapse div when available", () => {
        const parentId: string = "123";
        const { container }: RenderResult = render(<AccordionItem header="test" data-parent-id={parentId} />);
        expect(container.querySelector(".collapse").getAttribute("data-parent")).toEqual(`#${parentId}`);
    });

    it("Should trigger onToggle when button is clicked", async () => {
        const onToggle: jest.Mock = jest.fn();
        render(<AccordionItem header="test" onToggle={onToggle} />);
        await userEvent.click(screen.getByRole("button"));
        expect(onToggle).toBeCalled();
    });

    it("Should allow rendering nodes in header, subheader, and children", () => {
        const element: JSX.Element = <p>test</p>;
        const { container }: RenderResult = render(
            <AccordionItem header={element} subHeader={element}>
                {element}
            </AccordionItem>
        );
        expect(container.querySelector("h4").innerHTML).toEqual(renderToStaticMarkup(element));
        expect(container.querySelector("h6").innerHTML).toEqual(renderToStaticMarkup(element));
        expect(container.querySelector(".content").innerHTML).toEqual(renderToStaticMarkup(element));
    });
});
