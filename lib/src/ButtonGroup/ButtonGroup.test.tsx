import { render, screen } from "@testing-library/react";
import React from "react";
import { ButtonGroup, ButtonGroupSizes } from ".";

type ButtonTestItem<T, K> = { value: T; expected: K };

describe("Component: ButtonGroup", () => {
    it("Should render", () => {
        const text: string = "Test";
        render(<ButtonGroup>{text}</ButtonGroup>);
        expect(screen.getByText(text)).toBeInTheDocument();
    });

    it("Should render custom className", () => {
        const className: string = "myButtonGroupClass";
        render(<ButtonGroup className={className} />);
        expect(screen.getByRole("group")).toHaveClass(className);
    });

    describe("Should render supported sizes", () => {
        const list: Array<ButtonTestItem<ButtonGroupSizes, string>> = [
            { value: "lg", expected: "btn-group-lg" },
            { value: "md", expected: "btn-group-md" },
            { value: "sm", expected: "btn-group-sm" },
        ];
        list.map((item: ButtonTestItem<ButtonGroupSizes, string>) => {
            it(`Size: ${item.value} - Expected to render (${item.expected})`, () => {
                render(<ButtonGroup size={item.value} />);
                expect(screen.getByRole("group")).toHaveClass(item.expected);
            });
        });
    });

    it("Should render vertical", () => {
        render(<ButtonGroup vertical />);
        expect(screen.getByRole("group")).toHaveClass("btn-group-vertical");
    });
});
