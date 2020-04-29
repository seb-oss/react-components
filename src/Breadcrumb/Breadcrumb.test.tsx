import React from "react";
import { Breadcrumb } from "./Breadcrumb";
import { BreadcrumbItem, BreadcrumbItemProps } from "./BreadcrumbItem";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import { deepCopy } from "@sebgroup/frontend-tools/dist/deepCopy";

describe("Component: Breadcrumb", () => {
    let container: HTMLDivElement = null;
    const breadcrumbList: Array<BreadcrumbItemProps> = [{ children: "First" }, { children: "Second" }, { children: "Third" }];

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
            render(<Breadcrumb />, container);
        });
        expect(container.firstElementChild.tagName).toEqual("NAV");
        expect(container.firstElementChild.getAttribute("aria-label")).toEqual("breadcrumb");
        expect(container.firstElementChild.firstElementChild.tagName).toEqual("OL");
        expect(container.firstElementChild.firstElementChild.classList.contains("seb")).toBeTruthy();
        expect(container.firstElementChild.firstElementChild.classList.contains("breadcrumb")).toBeTruthy();
    });

    it("Should render with a list with data-index-number", () => {
        act(() => {
            render(<Breadcrumb list={breadcrumbList} />, container);
        });
        expect(container.firstElementChild.firstElementChild.children.length).toEqual(breadcrumbList.length);
        expect(container.firstElementChild.firstElementChild.firstElementChild.tagName).toEqual("LI");
        expect(container.firstElementChild.firstElementChild.firstElementChild.firstElementChild.tagName).toEqual("A");
        expect(container.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute("data-index-number")).toEqual("0");
    });

    it("Should render BreadcrumbItem directly", () => {
        act(() => {
            render(
                <Breadcrumb>
                    <BreadcrumbItem>First</BreadcrumbItem>
                    <BreadcrumbItem>Second</BreadcrumbItem>
                </Breadcrumb>,
                container
            );
        });
        const items: NodeListOf<HTMLLIElement> = container.querySelectorAll(".breadcrumb-item");
        expect(items.length).toBe(2);
        expect(items[0].firstElementChild.innerHTML).toEqual("First");
        expect(items[1].firstElementChild.innerHTML).toEqual("Second");
    });

    it("Should pass onNavigate to all items in the list", () => {
        const onNavigate: jest.Mock = jest.fn();
        act(() => {
            render(<Breadcrumb list={breadcrumbList} onNavigate={onNavigate} />, container);
        });
        act(() => {
            const items: NodeListOf<HTMLLIElement> = container.querySelectorAll(".breadcrumb-item");
            items[0].firstElementChild.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            items[1].firstElementChild.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            items[items.length - 1].firstElementChild.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(onNavigate).toBeCalledTimes(2);
    });

    it("Should allow rendering none elements", () => {
        const text: string = "Some text";
        act(() => {
            render(<Breadcrumb>{text}</Breadcrumb>, container);
        });
        expect(container.firstElementChild.firstElementChild.innerHTML).toEqual(text);
    });

    it("Should set active to the last child even when rendering a list and children at the same time", () => {
        act(() => {
            render(
                <Breadcrumb list={breadcrumbList}>
                    <BreadcrumbItem>First</BreadcrumbItem>
                    <BreadcrumbItem>Second</BreadcrumbItem>
                </Breadcrumb>,
                container
            );
        });
        const elements: NodeListOf<HTMLLIElement> = container.querySelectorAll<HTMLLIElement>(".breadcrumb-item");
        elements.forEach((element: HTMLLIElement, i: number) => expect(element.classList.contains("active")).toBe(i === elements.length - 1));
    });

    it("Should allow passing a custom onNavigate", () => {
        const onToggle: jest.Mock = jest.fn();
        act(() => {
            render(<Breadcrumb onNavigate={onToggle} list={breadcrumbList} />, container);
        });
        act(() => {
            container.querySelector("a").click();
        });
        expect(onToggle).toBeCalled();
    });

    describe("Should allow onAuxClick to function normally even if it is hijacked by the parent", () => {
        let onAuxClick: jest.Mock;

        const verify: (index: number) => void = (index: number) => {
            act(() => {
                container
                    .querySelectorAll("li")
                    .item(index)
                    .dispatchEvent(new MouseEvent("auxclick", { bubbles: true }));
            });
            expect(onAuxClick).toBeCalledTimes(1);
        };

        beforeEach(() => {
            onAuxClick = jest.fn();
        });

        test("Passed in one of the list items", () => {
            act(() => {
                render(<Breadcrumb list={[{ children: "first", onAuxClick }, { children: "second" }]} />, container);
            });
            verify(0);
        });

        test("Passed in one of the children", () => {
            act(() => {
                render(
                    <Breadcrumb>
                        <BreadcrumbItem onAuxClick={onAuxClick}>First</BreadcrumbItem>
                        <BreadcrumbItem>Second</BreadcrumbItem>
                    </Breadcrumb>,
                    container
                );
            });
            verify(0);
        });

        test("Passed in one of the children while a list is passed as well", () => {
            act(() => {
                render(
                    <Breadcrumb list={breadcrumbList}>
                        <BreadcrumbItem onAuxClick={onAuxClick}>First</BreadcrumbItem>
                        <BreadcrumbItem>Second</BreadcrumbItem>
                    </Breadcrumb>,
                    container
                );
            });
            verify(breadcrumbList.length);
        });

        test("onToggle click event should not trigger onAuxClick", () => {
            act(() => {
                render(
                    <Breadcrumb>
                        <BreadcrumbItem onAuxClick={onAuxClick}>First</BreadcrumbItem>
                        <BreadcrumbItem>Second</BreadcrumbItem>
                    </Breadcrumb>,
                    container
                );
            });
            act(() => {
                container.querySelector("a").click();
            });
            verify(0);
        });
    });
});
