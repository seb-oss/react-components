import React from "react";
import { Breadcrumb } from "./Breadcrumb";
import { BreadcrumbItem } from "./BreadcrumbItem";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

describe("Component: Breadcrumb", () => {
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
            render(<BreadcrumbItem>Home</BreadcrumbItem>, container);
        });
        expect(container.firstElementChild.tagName).toEqual("LI");
        expect(container.firstElementChild.firstElementChild.tagName).toEqual("A");
        expect(container.firstElementChild.firstElementChild.innerHTML).toEqual("Home");
    });

    it("Should pass data-index-number and title to anchor tag, pass href and onNavigate if not last item", () => {
        const href: string = "#/home";
        const title: string = "myTitle";
        const onNavigate: jest.Mock = jest.fn();
        act(() => {
            render(
                <Breadcrumb onNavigate={onNavigate}>
                    <BreadcrumbItem href={href} title={title}>
                        First
                    </BreadcrumbItem>
                    <BreadcrumbItem href={href} title={title}>
                        Second
                    </BreadcrumbItem>
                </Breadcrumb>,
                container
            );
        });
        const links: NodeListOf<HTMLAnchorElement> = container.querySelectorAll<HTMLAnchorElement>("a");
        expect(links.item(0).title).toEqual(title);
        expect(links.item(0).hash).toEqual(href);
        expect(links.item(0).dataset.indexNumber).toEqual("0");
        expect(links.item(1).hash).toBe("");
        act(() => {
            links.forEach((link: HTMLAnchorElement) => link.click());
        });
        expect(onNavigate).toBeCalledTimes(1);
    });

    it("Should change active state when another item is added", () => {
        act(() => {
            render(<TestBed />, container);
        });
        let items: NodeListOf<HTMLLIElement> = container.querySelectorAll<HTMLLIElement>(".breadcrumb-item");
        expect(items[0].classList.contains("active")).toBeFalsy();
        expect(items[1].classList.contains("active")).toBeTruthy();
        expect(items[2]).toBeUndefined();

        act(() => {
            container.querySelector<HTMLInputElement>("#trigger").click();
        });

        items = container.querySelectorAll<HTMLLIElement>(".breadcrumb-item");
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
                <BreadcrumbItem>Second</BreadcrumbItem>
                {value && <BreadcrumbItem>Third</BreadcrumbItem>}
            </Breadcrumb>
        </div>
    );
};
