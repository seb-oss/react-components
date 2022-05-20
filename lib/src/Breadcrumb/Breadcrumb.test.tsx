import { render, RenderResult, screen } from "@testing-library/react";
import React from "react";
import { Breadcrumb, BreadcrumbItem } from ".";

describe("Component: Breadcrumb", () => {
    it("Should render", () => {
        const { container }: RenderResult = render(<Breadcrumb />);
        expect(container.firstElementChild.tagName).toEqual("NAV");
        expect(container.firstElementChild.getAttribute("aria-label")).toEqual("breadcrumb");
        expect(container.firstElementChild.firstElementChild.tagName).toEqual("OL");
        expect(container.firstElementChild.firstElementChild.classList.contains("breadcrumb")).toBeTruthy();
    });

    it("Should render BreadcrumbItem directly", () => {
        render(
            <Breadcrumb>
                <BreadcrumbItem>First</BreadcrumbItem>
                <BreadcrumbItem>Second</BreadcrumbItem>
            </Breadcrumb>
        );
        expect(screen.getByText("First")).toBeInTheDocument();
        expect(screen.getByText("Second")).toBeInTheDocument();
    });

    it("Should allow rendering none elements", () => {
        const text: string = "Some text";
        render(<Breadcrumb>{text}</Breadcrumb>);
        expect(screen.getByText(text)).toBeInTheDocument();
    });
});
