import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Breadcrumb, BreadcrumbItem } from ".";

describe("Component: Breadcrumb", () => {
    it("Should render correctly", () => {
        const { container }: RenderResult = render(<BreadcrumbItem>Home</BreadcrumbItem>);
        expect(container.firstElementChild.tagName).toEqual("LI");
        expect(container.firstElementChild.firstElementChild.tagName).toEqual("A");
        expect(screen.getByText("Home"));
    });

    it("Should pass data-index-number and title to anchor tag, pass href and onNavigate if not last item", async () => {
        const href: string = "#/home";
        const title: string = "myTitle";
        const onNavigate: jest.Mock = jest.fn();
        const { container }: RenderResult = render(
            <Breadcrumb onNavigate={onNavigate}>
                <BreadcrumbItem href={href} title={title}>
                    First
                </BreadcrumbItem>
                <BreadcrumbItem href={href} title={title}>
                    Second
                </BreadcrumbItem>
            </Breadcrumb>
        );
        // using `querySelectorAll` instead of `screen.getByRole('link')` because the latter does not recognize anchor without `href` as link
        const links: NodeListOf<HTMLAnchorElement> = container.querySelectorAll<HTMLAnchorElement>("a");
        expect(links.item(0).title).toEqual(title);
        expect(links.item(0).hash).toEqual(href);
        expect(links.item(0).dataset.indexNumber).toEqual("0");
        expect(links.item(1).hash).toBe("");

        for (const link of links as any) {
            await userEvent.click(link);
        }

        expect(onNavigate).toBeCalledTimes(1);
    });

    it("Should change active state when another item is added", async () => {
        const { container }: RenderResult = render(<TestBed />);
        let items: NodeListOf<HTMLLIElement> = container.querySelectorAll<HTMLLIElement>(".breadcrumb-item");
        expect(items[0]).not.toHaveClass("active");
        expect(items[1]).toHaveClass("active");
        expect(items[2]).toBeUndefined();
        await userEvent.click(screen.getByRole("checkbox"));
        items = container.querySelectorAll<HTMLLIElement>(".breadcrumb-item");
        expect(items[0]).not.toHaveClass("active");
        expect(items[1]).not.toHaveClass("active");
        expect(items[2]).toHaveClass("active");
    });
});

const TestBed: React.FC = () => {
    const [value, setValue] = React.useState<boolean>(false);

    return (
        <div>
            <input id="trigger" type="checkbox" checked={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.checked)} />
            <Breadcrumb>
                <BreadcrumbItem>First</BreadcrumbItem>
                <BreadcrumbItem>Second</BreadcrumbItem>
                {value && <BreadcrumbItem>Third</BreadcrumbItem>}
            </Breadcrumb>
        </div>
    );
};
