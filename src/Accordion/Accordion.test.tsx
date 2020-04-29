import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Accordion } from "./Accordion";
import { loremIpsum } from "lorem-ipsum";
import { AccordionItem, AccordionItemProps } from "./AccordionItem";
import { deepCopy } from "@sebgroup/frontend-tools/dist/deepCopy";

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
        test("defaultValue from list", () => {
            act(() => {
                render(<Accordion defaultValue={0} list={accordionList} />, container);
            });
            expect(container.querySelector<HTMLButtonElement>("button").getAttribute("aria-expanded")).toEqual("true");
        });
        test("defaultValue from both list and children - default set in parent", () => {
            act(() => {
                render(
                    <Accordion defaultValue={3} list={accordionList}>
                        <AccordionItem header="First" />
                        <AccordionItem header="Second" />
                    </Accordion>,
                    container
                );
            });
            expect(container.querySelectorAll<HTMLButtonElement>("button").item(3).getAttribute("aria-expanded")).toEqual("true");
        });
        test("defaultValue from both list and children - default set in list item", () => {
            const list: Array<AccordionItemProps> = deepCopy(accordionList);
            list[0].defaultChecked = true;
            act(() => {
                render(
                    <Accordion list={list}>
                        <AccordionItem defaultChecked header="First" />
                        <AccordionItem header="Second" />
                    </Accordion>,
                    container
                );
            });
            expect(container.querySelectorAll<HTMLButtonElement>("button").item(0).getAttribute("aria-expanded")).toEqual("true");
        });
        test("defaultValue from both list and children - default set in child", () => {
            act(() => {
                render(
                    <Accordion list={accordionList}>
                        <AccordionItem defaultChecked header="First" />
                        <AccordionItem header="Second" />
                    </Accordion>,
                    container
                );
            });
            expect(container.querySelectorAll<HTMLButtonElement>("button").item(2).getAttribute("aria-expanded")).toEqual("true");
        });
    });

    it("it should accept both list and children", () => {
        act(() => {
            render(
                <Accordion list={accordionList}>
                    <AccordionItem header="First" />
                    <AccordionItem header="Second" />
                </Accordion>,
                container
            );
        });
        expect(container.querySelectorAll(".card")).toHaveLength(accordionList.length + 2);
    });

    it("Should allow passing a custom onToggle", () => {
        const onToggle: jest.Mock = jest.fn();
        act(() => {
            render(<Accordion onToggle={onToggle} list={accordionList} />, container);
        });
        act(() => {
            container.querySelector("button").click();
        });
        expect(onToggle).toBeCalled();
    });

    describe("Should allow onSeeked to function normally even if it is hijacked by the parent", () => {
        let onSeeked: jest.Mock;

        const verify: (index: number) => void = (index: number) => {
            act(() => {
                Simulate.seeked(container.querySelectorAll(".card").item(index));
            });
            expect(onSeeked).toBeCalled();
        };

        beforeEach(() => {
            onSeeked = jest.fn();
        });

        test("Passed in one of the list items", () => {
            const list: Array<AccordionItemProps> = deepCopy(accordionList);
            list[0].onSeeked = onSeeked;
            act(() => {
                render(<Accordion list={list} />, container);
            });
            verify(0);
        });

        test("Passed in one of the children", () => {
            act(() => {
                render(
                    <Accordion>
                        <AccordionItem onSeeked={onSeeked} header="First" />
                        <AccordionItem header="Second" />
                    </Accordion>,
                    container
                );
            });
            verify(0);
        });

        test("Passed in one of the children while a list is passed as well", () => {
            act(() => {
                render(
                    <Accordion list={accordionList}>
                        <AccordionItem onSeeked={onSeeked} header="First" />
                        <AccordionItem header="Second" />
                    </Accordion>,
                    container
                );
            });
            verify(accordionList.length);
        });

        test("onToggle click event should not trigger onSeeked", () => {
            act(() => {
                render(
                    <Accordion>
                        <AccordionItem onSeeked={onSeeked} header="First" />
                        <AccordionItem header="Second" />
                    </Accordion>,
                    container
                );
            });
            act(() => {
                container.querySelector("button").click();
            });
            verify(0);
        });
    });
});
