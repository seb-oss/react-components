import React from "react";
import { Pagination, PaginationSize, Page } from ".";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";

describe("Component: RadioButton", () => {
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

    it("Should render correctly", () => {
        act(() => {
            render(<Pagination />, container);
        });
        const nav: HTMLElement = container.firstElementChild as any;
        expect(container).toBeDefined();
        expect(nav.tagName.toLowerCase()).toEqual("nav");
        expect(nav.classList.contains("rc")).toBeTruthy();
        expect(nav.firstElementChild.tagName.toLowerCase()).toEqual("ul");
        expect(nav.firstElementChild.classList.contains("pagination")).toBeTruthy();
    });

    describe("Should render with different sizes", () => {
        const cases: PaginationSize[] = ["sm", "md", "lg"];
        cases.forEach((size: PaginationSize) =>
            it(size, () => {
                act(() => {
                    render(<Pagination size={size} />, container);
                });

                expect(container.firstElementChild.firstElementChild.classList.contains(`pagination-${size}`)).toBeTruthy();
            })
        );
    });

    it("Should render the pages passed as children", () => {
        act(() => {
            render(
                <Pagination>
                    <Page>1</Page>
                    <Page>2</Page>
                    <Page>3</Page>
                </Pagination>,
                container
            );
        });

        const ul: HTMLUListElement = container.firstElementChild.firstElementChild as any;
        expect(ul.children.length).toEqual(5);
        expect(ul.children.item(0).classList.contains("previous-nav"));
        expect(ul.children.item(ul.children.length - 1).classList.contains("next-nav"));
    });

    it("Should show first and last buttons when enabled", () => {
        act(() => {
            render(
                <Pagination showFirstAndLast>
                    <Page>1</Page>
                    <Page>2</Page>
                    <Page>3</Page>
                </Pagination>,
                container
            );
        });

        const ul: HTMLUListElement = container.firstElementChild.firstElementChild as any;
        expect(ul.children.length).toEqual(7);
        expect(ul.children.item(0).classList.contains("first-nav"));
        expect(ul.children.item(1).classList.contains("previous-nav"));
        expect(ul.children.item(ul.children.length - 1).classList.contains("next-nav"));
        expect(ul.children.item(ul.children.length - 2).classList.contains("last-nav"));
    });

    describe("Should only within offset and disable first and last when not needed", () => {
        function check(value: number, navs: { next: boolean; prev: boolean; first: boolean; last: boolean; preEllipsis: boolean; postEllipsis: boolean }) {
            act(() => {
                render(
                    <Pagination value={value} offset={3} showFirstAndLast>
                        {[...Array(10)].map((_: undefined, i: number) => (
                            <Page key={i}>{i}</Page>
                        ))}
                    </Pagination>,
                    container
                );
            });

            // 7 is because I'm expecting this: [<<] [<] [1] [2] [3] [>] [>>]. Added to that the ellipsis whether it's expectewd to be rendered or not
            expect(container.querySelector("ul").children.length).toEqual(7 + +navs.postEllipsis + +navs.preEllipsis);
            expect(container.querySelector(".active").textContent).toEqual(value.toString());

            expect(container.querySelector(".first-nav").classList.contains("disabled")).not.toBe(navs.first);
            expect(container.querySelector(".last-nav").classList.contains("disabled")).not.toBe(navs.last);
            expect(container.querySelector(".previous-nav").classList.contains("disabled")).not.toBe(navs.prev);
            expect(container.querySelector(".next-nav").classList.contains("disabled")).not.toBe(navs.next);

            navs.preEllipsis ? expect(container.querySelector(".pre-ellipsis")).not.toBeNull() : expect(container.querySelector(".pre-ellipsis")).toBeNull();
            navs.postEllipsis ? expect(container.querySelector(".post-ellipsis")).not.toBeNull() : expect(container.querySelector(".post-ellipsis")).toBeNull();
        }

        test("value: 0", () => check(0, { first: false, prev: false, next: true, last: true, preEllipsis: false, postEllipsis: true }));
        test("value: 1", () => check(1, { first: false, prev: true, next: true, last: true, preEllipsis: false, postEllipsis: true }));
        test("value: 2", () => check(2, { first: true, prev: true, next: true, last: true, preEllipsis: true, postEllipsis: true }));
        test("value: 7", () => check(7, { first: true, prev: true, next: true, last: true, preEllipsis: true, postEllipsis: true }));
        test("value: 8", () => check(8, { first: true, prev: true, next: true, last: false, preEllipsis: true, postEllipsis: false }));
        test("value: 9", () => check(9, { first: true, prev: true, next: false, last: false, preEllipsis: true, postEllipsis: false }));
    });

    it("Should call onPageChange when a page is clicked", () => {
        const onPageChange: jest.Mock = jest.fn();
        act(() => {
            render(
                <Pagination value={0} onPageChange={onPageChange}>
                    <Page>1</Page>
                    <Page>2</Page>
                </Pagination>,
                container
            );
        });

        act(() => {
            Simulate.click(container.querySelector('.page-item:not([class$="-nav"]):not(.active)'));
        });

        expect(onPageChange).toBeCalledWith(1);
    });

    it("Should render all pages if offset is set to 0", () => {
        act(() => {
            render(
                <Pagination offset={0}>
                    {[...Array(10)].map((_: undefined, i: number) => (
                        <Page key={i}>{i}</Page>
                    ))}
                </Pagination>,
                container
            );
        });

        // 10 pages + next and previous buttons
        expect(container.querySelectorAll(".page-item").length).toEqual(12);
    });

    it("Should render dot navigation when enabled", () => {
        act(() => {
            render(
                <Pagination value={5} useDotNav>
                    {[...Array(10)].map((_: undefined, i: number) => (
                        <Page key={i}>{i}</Page>
                    ))}
                </Pagination>,
                container
            );
        });

        const ul: HTMLUListElement = container.firstElementChild.firstElementChild as any;

        expect(ul.classList.contains("dotnav")).toBeTruthy();
        expect(container.querySelector("next-nav")).toBeNull();
        expect(container.querySelector("previous-nav")).toBeNull();
    });

    describe("Should not navigate when the navigation buttons are disabled", () => {
        test("First and previous", () => {
            const onPageChange: jest.Mock = jest.fn();
            act(() => {
                render(
                    <Pagination value={0} onPageChange={onPageChange} showFirstAndLast>
                        {[...Array(10)].map((_: undefined, i: number) => (
                            <Page key={i}>{i}</Page>
                        ))}
                    </Pagination>,
                    container
                );
            });

            Simulate.click(container.querySelector(".previous-nav"));
            Simulate.click(container.querySelector(".first-nav"));
            expect(onPageChange).not.toBeCalled();

            act(() => {
                render(
                    <Pagination value={4} onPageChange={onPageChange} showFirstAndLast>
                        {[...Array(10)].map((_: undefined, i: number) => (
                            <Page key={i}>{i}</Page>
                        ))}
                    </Pagination>,
                    container
                );
            });

            Simulate.click(container.querySelector(".previous-nav"));
            Simulate.click(container.querySelector(".first-nav"));
            expect(onPageChange).toBeCalledTimes(2);
        });

        test("Last and next", () => {
            const onPageChange: jest.Mock = jest.fn();
            act(() => {
                render(
                    <Pagination value={9} onPageChange={onPageChange} showFirstAndLast>
                        {[...Array(10)].map((_: undefined, i: number) => (
                            <Page key={i}>{i}</Page>
                        ))}
                    </Pagination>,
                    container
                );
            });

            Simulate.click(container.querySelector(".next-nav"));
            Simulate.click(container.querySelector(".last-nav"));
            expect(onPageChange).not.toBeCalled();

            act(() => {
                render(
                    <Pagination value={4} onPageChange={onPageChange} showFirstAndLast>
                        {[...Array(10)].map((_: undefined, i: number) => (
                            <Page key={i}>{i}</Page>
                        ))}
                    </Pagination>,
                    container
                );
            });

            Simulate.click(container.querySelector(".next-nav"));
            Simulate.click(container.querySelector(".last-nav"));
            expect(onPageChange).toBeCalledTimes(2);
        });
    });

    it("Should render any other non element children", () => {
        const phrase: string = "The cat jumped over the fence";
        act(() => {
            render(
                <Pagination>
                    <Page>1</Page>
                    {phrase}
                    <Page>2</Page>
                </Pagination>,
                container
            );
        });

        expect(container.querySelector("ul").innerHTML).toContain(phrase);
    });
});
