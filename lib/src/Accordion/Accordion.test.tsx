import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Accordion, AccordionItem } from ".";

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
            render(<Accordion />, container);
        });
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
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
        test("active", () => expect(firstButton.getAttribute("aria-expanded")).toEqual("true"));
        test("onToggle", () => {
            act(() => {
                firstButton.click();
            });
            expect(firstButton.getAttribute("aria-expanded")).toEqual("false");
        });
    });

    describe("Should set default expanded using default value and default checked", () => {
        test("defaultValue from parent", () => {
            act(() => {
                render(
                    <Accordion defaultValue={0}>
                        <AccordionItem header="First" />
                        <AccordionItem header="Second" />
                    </Accordion>,
                    container
                );
            });
            expect(container.querySelector<HTMLButtonElement>("button").getAttribute("aria-expanded")).toEqual("true");
        });
        test("defaultValue from children", () => {
            act(() => {
                render(
                    <Accordion>
                        <AccordionItem defaultChecked header="First" />
                        <AccordionItem header="Second" />
                    </Accordion>,
                    container
                );
            });
            expect(container.querySelector<HTMLButtonElement>("button").getAttribute("aria-expanded")).toEqual("true");
        });
    });

    it("Should fire on toggle", () => {
        const mockFn: jest.Mock = jest.fn();
        act(() => {
            render(
                <Accordion onToggle={mockFn}>
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
        expect(mockFn).toBeCalled();
    });

    it("Should fire accordion item callback on toggle", () => {
        const mockFn: jest.Mock = jest.fn();
        act(() => {
            render(
                <Accordion>
                    <AccordionItem header="First" onToggle={mockFn} />
                    <AccordionItem header="Second" />
                </Accordion>,
                container
            );
        });
        const firstButton: HTMLButtonElement = container.querySelectorAll<HTMLButtonElement>("button.btn-link").item(0);
        act(() => {
            firstButton.click();
        });
        expect(mockFn).toBeCalled();
    });

    describe("Keyboard support", () => {
        function renderAccordion(): void {
            act(() => {
                render(
                    <Accordion>
                        <AccordionItem header="First" />
                        <AccordionItem header="Second" />
                    </Accordion>,
                    container
                );
            });
            container.querySelector<HTMLButtonElement>("button").focus();
        }

        function pressKey(key: string): void {
            act(() => Simulate.keyDown(document.activeElement, { key }));
        }

        function assertFocusedElement(element: HTMLElement): void {
            expect(document.activeElement).toEqual(element);
        }

        it("Should focus on next header when down arrow button is pressed", () => {
            renderAccordion();
            assertFocusedElement(container.querySelectorAll<HTMLButtonElement>("button")[0]);
            pressKey("ArrowDown");
            assertFocusedElement(container.querySelectorAll<HTMLButtonElement>("button")[1]);
            pressKey("ArrowDown");
            assertFocusedElement(container.querySelectorAll<HTMLButtonElement>("button")[0]);
        });

        it("Should focus on previous header when up arrow button is pressed", () => {
            renderAccordion();
            assertFocusedElement(container.querySelectorAll<HTMLButtonElement>("button")[0]);
            pressKey("ArrowUp");
            assertFocusedElement(container.querySelectorAll<HTMLButtonElement>("button")[1]);
            pressKey("ArrowUp");
            assertFocusedElement(container.querySelectorAll<HTMLButtonElement>("button")[0]);
        });

        it("Should focus on first header when home button is pressed", () => {
            renderAccordion();
            assertFocusedElement(container.querySelectorAll<HTMLButtonElement>("button")[0]);
            pressKey("ArrowDown");
            assertFocusedElement(container.querySelectorAll<HTMLButtonElement>("button")[1]);
            pressKey("Home");
            assertFocusedElement(container.querySelectorAll<HTMLButtonElement>("button")[0]);
        });

        it("Should focus on last header when end button is pressed", () => {
            renderAccordion();
            assertFocusedElement(container.querySelectorAll<HTMLButtonElement>("button")[0]);
            pressKey("End");
            assertFocusedElement(container.querySelectorAll<HTMLButtonElement>("button")[1]);
        });

        it("Should not handle button event when button is pressed on element aside from accordion header", () => {
            // TODO: this does not seemed possible to mimic for now as only accordion header is focusable
        });
    });
});
