import React from "react";
import { Breadcrumb, BreadcrumbProps } from "./Breadcrumb";
import { BreadcrumbItem, BreadcrumbItemProps } from "./BreadcrumbItem";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

describe("Component: Breadcrumb", () => {
    let container: HTMLDivElement = null;
    const breadcrumbList1: Array<BreadcrumbItemProps> = [{ children: "First" }, { children: "Second" }, { children: "Third" }];

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
            render(<BreadcrumbItem>Home</BreadcrumbItem>, container);
        });
        expect(container.firstElementChild.tagName).toEqual("LI");
        expect(container.firstElementChild.firstElementChild.tagName).toEqual("A");
        expect(container.firstElementChild.firstElementChild.innerHTML).toEqual("Home");
    });

    it("Should pass data-value and title to anchor tag, pass href and onNavigate if not last item", () => {
        const href: string = "#/home";
        const title: string = "myTitle";
        const onNavigate: jest.Mock = jest.fn();
        act(() => {
            render(
                <Breadcrumb>
                    <BreadcrumbItem href={href} title={title} data-value="12" onNavigate={onNavigate}>
                        First
                    </BreadcrumbItem>
                    <BreadcrumbItem href={href} title={title} data-value="12" onNavigate={onNavigate}>
                        Second
                    </BreadcrumbItem>
                </Breadcrumb>,
                container
            );
        });
        const anchor1: HTMLAnchorElement = container.querySelectorAll("a").item(0);
        const anchor2: HTMLAnchorElement = container.querySelectorAll("a").item(1);
        expect(anchor1.title).toEqual(title);
        expect(anchor1.hash).toEqual(href);
        expect(anchor1.dataset.value).toEqual("12");
        expect(anchor2.hash).toBe("");
        act(() => {
            anchor1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            anchor2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(onNavigate).toBeCalledTimes(1);
    });

    it("Should change active state when another item is added", () => {
        act(() => {
            render(<TestBed />, container);
        });
        let items: NodeListOf<HTMLLIElement> = container.querySelectorAll(".breadcrumb-item");
        expect(items[0].classList.contains("active")).toBeFalsy();
        expect(items[1].classList.contains("active")).toBeTruthy();
        expect(items[2]).toBeUndefined();

        act(() => {
            container.querySelector("#trigger").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        items = container.querySelectorAll(".breadcrumb-item");
        expect(items[0].classList.contains("active")).toBeFalsy();
        expect(items[1].classList.contains("active")).toBeFalsy();
        expect(items[2].classList.contains("active")).toBeTruthy();
    });
});

const TestBed: React.FC = () => {
    const [value, setValue] = React.useState<boolean>(false);

    return (
        <div>
            <input id="trigger" type="checkbox" checked={value} onChange={(e) => setValue(e.target.checked)} />
            <Breadcrumb>
                <BreadcrumbItem>First</BreadcrumbItem>
                {/*
                    The title is to trigger the memo component to recalculate
                    The change works perfectly outside test environment
                */}
                <BreadcrumbItem title={value ? "title" : ""}>Second</BreadcrumbItem>
                {value && <BreadcrumbItem>Third</BreadcrumbItem>}
            </Breadcrumb>
        </div>
    );
};
