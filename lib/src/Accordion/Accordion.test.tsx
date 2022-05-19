import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Accordion, AccordionItem } from ".";

describe("Component: Accordion", () => {
    function getAccordionButtons(): Array<HTMLButtonElement> {
        return screen.getAllByRole<HTMLButtonElement>("button");
    }

    function getButtonExpansion(button: HTMLButtonElement): boolean {
        return JSON.parse(button.getAttribute("aria-expanded"));
    }

    it("Should render correctly", () => {
        const { container }: RenderResult = render(<Accordion />);
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("accordion")).toBeTruthy();
        expect(container.firstElementChild.id).toBeDefined();
    });

    it("Should render with id, custom class and alternative style", () => {
        const id: string = "myId";
        const className: string = "myClassname";
        const { container }: RenderResult = render(<Accordion id={id} className={className} alternative />);
        expect(container.firstElementChild.id).toEqual(id);
        expect(container.firstElementChild.classList.contains("alternative")).toBeTruthy();
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    it("Should toggle on and off an accordion item", async () => {
        render(
            <Accordion>
                <AccordionItem header="First" />
                <AccordionItem header="Second" />
            </Accordion>
        );
        const firstButton: HTMLButtonElement = getAccordionButtons()[0];
        await userEvent.click(firstButton);
        expect(getButtonExpansion(firstButton)).toBeTruthy();
        await userEvent.click(firstButton);
        expect(getButtonExpansion(firstButton)).toBeFalsy();
    });

    it("Should allow rendering none elements", () => {
        const text: string = "Some text";
        render(<Accordion>{text}</Accordion>);
        expect(screen.getByText(text)).toBeInTheDocument();
    });

    describe("Should forward the following props to children accordion items", () => {
        const id: string = "myId";
        let container: HTMLElement;
        let firstButton: HTMLButtonElement;

        beforeEach(() => {
            const result: RenderResult = render(
                <Accordion id={id} defaultValue={0}>
                    <AccordionItem header="First" />
                    <AccordionItem header="Second" />
                </Accordion>
            );
            container = result.container;
            firstButton = getAccordionButtons()[0];
        });

        test("parentId", () => expect(container.querySelectorAll<HTMLDivElement>(".collapse").item(0).dataset.parent).toEqual(`#${id}`));

        test("value", () => expect(firstButton.dataset.indexNumber).toEqual("0"));

        test("active", () => expect(getButtonExpansion(firstButton)).toBeTruthy());

        test("onToggle", async () => {
            await userEvent.click(firstButton);
            expect(getButtonExpansion(firstButton)).toBeFalsy();
        });
    });

    describe("Should set default expanded using default value and default checked", () => {
        test("defaultValue from parent", () => {
            render(
                <Accordion defaultValue={0}>
                    <AccordionItem header="First" />
                    <AccordionItem header="Second" />
                </Accordion>
            );
            expect(getButtonExpansion(getAccordionButtons()[0])).toBeTruthy();
        });

        test("defaultValue from children", () => {
            render(
                <Accordion>
                    <AccordionItem defaultChecked header="First" />
                    <AccordionItem header="Second" />
                </Accordion>
            );
            expect(getButtonExpansion(getAccordionButtons()[0])).toBeTruthy();
        });
    });

    it("Should fire on toggle", async () => {
        const mockFn: jest.Mock = jest.fn();
        render(
            <Accordion onToggle={mockFn}>
                <AccordionItem header="First" />
                <AccordionItem header="Second" />
            </Accordion>
        );
        await userEvent.click(getAccordionButtons()[0]);
        expect(mockFn).toBeCalled();
    });

    it("Should fire accordion item callback on toggle", async () => {
        const mockFn: jest.Mock = jest.fn();
        render(
            <Accordion>
                <AccordionItem header="First" onToggle={mockFn} />
                <AccordionItem header="Second" />
            </Accordion>
        );
        await userEvent.click(getAccordionButtons()[0]);
        expect(mockFn).toBeCalled();
    });

    describe("Keyboard support", () => {
        function renderAccordion(): void {
            render(
                <Accordion>
                    <AccordionItem header="First" />
                    <AccordionItem header="Second" />
                </Accordion>
            );
            getAccordionButtons()[0].focus();
        }

        function assertFocusedElement(element: HTMLElement): void {
            expect(document.activeElement).toEqual(element);
        }

        it("Should focus on next header when down arrow button is pressed", async () => {
            renderAccordion();
            assertFocusedElement(getAccordionButtons()[0]);
            await userEvent.keyboard("[ArrowDown]");
            assertFocusedElement(getAccordionButtons()[1]);
            await userEvent.keyboard("[ArrowDown]");
            assertFocusedElement(getAccordionButtons()[0]);
        });

        it("Should focus on previous header when up arrow button is pressed", async () => {
            renderAccordion();
            assertFocusedElement(getAccordionButtons()[0]);
            await userEvent.keyboard("[ArrowUp]");
            assertFocusedElement(getAccordionButtons()[1]);
            await userEvent.keyboard("[ArrowUp]");
            assertFocusedElement(getAccordionButtons()[0]);
        });

        it("Should focus on first header when home button is pressed", async () => {
            renderAccordion();
            assertFocusedElement(getAccordionButtons()[0]);
            await userEvent.keyboard("[ArrowDown]");
            assertFocusedElement(getAccordionButtons()[1]);
            await userEvent.keyboard("[Home]");
            assertFocusedElement(getAccordionButtons()[0]);
        });

        it("Should focus on last header when end button is pressed", async () => {
            renderAccordion();
            assertFocusedElement(getAccordionButtons()[0]);
            await userEvent.keyboard("[End]");
            assertFocusedElement(getAccordionButtons()[1]);
        });

        it("Should not handle button event when button is pressed on element aside from accordion header", () => {
            // TODO: this does not seemed possible to mimic for now as only accordion header is focusable
        });
    });
});
