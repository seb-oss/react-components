import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Accordion } from "./Accordion";
import { loremIpsum } from "lorem-ipsum";
import { AccordionItem, AccordionItemProps } from "./AccordionItem";

describe("Component: Accordion", () => {
    let container: HTMLDivElement = null;
    const accordionList: Array<AccordionItemProps> = [
        {
            header: loremIpsum({ units: "word" }),
            children: loremIpsum({ units: "sentence" }),
        },
        {
            header: loremIpsum({ units: "word" }),
            subHeader: loremIpsum({ units: "word" }),
            children: <p>{loremIpsum({ units: "paragraph" })}</p>,
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

    it("Should render correctly", () => {
        act(() => {
            render(<Accordion />, container);
        });
        expect(container.firstElementChild.classList.contains("seb")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("accordion")).toBeTruthy();
        expect(container.firstElementChild.id).toBeDefined();
    });

    it("Should render with id, custom class and alternative style", () => {
        const id: string = "myId";
        const className: string = "myClassname";
        act(() => {
            render(<Accordion id={id} className={className} alternative />, container);
        });
        expect(container.firstElementChild.id).toEqual(id);
        expect(container.firstElementChild.classList.contains("alternative")).toBeTruthy();
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    it("Should toggle on and off an accordion item", () => {
        act(() => {
            render(
                <Accordion>
                    <AccordionItem header="First" />
                    <AccordionItem header="Second" />
                </Accordion>,
                container
            );
        });
        const firstButton: HTMLButtonElement = container.querySelectorAll<HTMLButtonElement>("button.btn-link").item(0);
        act(() => {
            firstButton.click();
        });
        expect(JSON.parse(firstButton.getAttribute("aria-expanded"))).toBeTruthy();
        act(() => {
            firstButton.click();
        });
        expect(JSON.parse(firstButton.getAttribute("aria-expanded"))).toBeFalsy();
    });

    it("Should render with a list", () => {
        act(() => {
            render(<Accordion list={accordionList} />, container);
        });
        expect(container.querySelectorAll(".card").length).toBeGreaterThan(0);
    });

    it("Should not crash when list prop is passed null or undefined", () => {
        act(() => {
            render(<Accordion list={null} />, container);
        });
        expect(container).toBeDefined();
    });

    it("Should allow rendering none elements", () => {
        const text: string = "Some text";
        act(() => {
            render(<Accordion>{text}</Accordion>, container);
        });
        expect(container.firstElementChild.innerHTML).toEqual(text);
    });

    describe("Should forward the following props to children accordion items", () => {
        const id: string = "myId";
        let firstButton: HTMLButtonElement;

        beforeEach(() => {
            act(() => {
                render(
                    <Accordion id={id} defaultValue={0}>
                        <AccordionItem header="First" />
                        <AccordionItem header="Second" />
                    </Accordion>,
                    container
                );
            });
            firstButton = container.querySelectorAll<HTMLButtonElement>("button").item(0);
        });

        test("paretnId", () => expect(container.querySelectorAll<HTMLDivElement>(".collapse").item(0).dataset.parent).toEqual(`#${id}`));
        test("value", () => expect(firstButton.dataset.indexNumber).toEqual("0"));
        test("active", () => expect(JSON.parse(firstButton.getAttribute("aria-expanded"))).toBeTruthy());
        test("onToggle", () => {
            act(() => {
                firstButton.click();
            });
            expect(JSON.parse(firstButton.getAttribute("aria-expanded"))).toBeFalsy();
        });
    });

    describe("Should set default expanded using default value and default checked", () => {
        test("defaultValue", () => {
            act(() => {
                render(
                    <Accordion defaultValue={0}>
                        <AccordionItem header="First" />
                        <AccordionItem header="Second" />
                    </Accordion>,
                    container
                );
            });
            const firstCollapse: HTMLDivElement = container.querySelectorAll<HTMLDivElement>(".card-body").item(0);
            expect(JSON.parse(firstCollapse.dataset.toggle)).toBeTruthy();
        });
        test("defaultValue", () => {
            act(() => {
                render(
                    <Accordion>
                        <AccordionItem defaultChecked header="First" />
                        <AccordionItem header="Second" />
                    </Accordion>,
                    container
                );
            });
            const firstCollapse: HTMLDivElement = container.querySelectorAll<HTMLDivElement>(".card-body").item(0);
            expect(JSON.parse(firstCollapse.dataset.toggle)).toBeTruthy();
        });
    });

    it("Should not expand any accordion item when defaultValue is set to null", () => {
        act(() => {
            render(
                <Accordion defaultValue={null}>
                    <AccordionItem header="First" />
                    <AccordionItem header="Second" />
                </Accordion>,
                container
            );
        });
        container.querySelectorAll<HTMLDivElement>(".card-body").forEach((element: HTMLDivElement) => expect(JSON.parse(element.dataset.toggle)).toBeFalsy());
    });
});
