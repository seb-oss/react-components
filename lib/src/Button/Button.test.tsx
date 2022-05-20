import { render, screen } from "@testing-library/react";
import React from "react";
import { Button, ButtonSize, ButtonTheme } from ".";

type ButtonTestItem<T, K> = { value: T; expected: K };

describe("Component: Button", () => {
    it("Should render", () => {
        const text: string = "Test";
        render(<Button>{text}</Button>);
        expect(screen.getByText(text)).toBeInTheDocument();
    });

    it("Should render custom className", () => {
        const className: string = "myButtonClass";
        render(<Button className={className} />);
        expect(screen.getByRole("button")).toHaveClass(className);
    });

    describe("Should render supported themes", () => {
        const list: Array<ButtonTestItem<ButtonTheme, string>> = [
            { value: "primary", expected: "btn-primary" },
            { value: "outline-primary", expected: "btn-outline-primary" },
            { value: "secondary", expected: "btn-secondary" },
            { value: "dark", expected: "btn-dark" },
            { value: "light", expected: "btn-light" },
            { value: "link", expected: "btn-link" },
            { value: "danger", expected: "btn-danger" },
            { value: "outline-danger", expected: "btn-outline-danger" },
        ];
        list.map((item: ButtonTestItem<ButtonTheme, string>) => {
            it(`Size: ${item.value} - Expected to render (${item.expected})`, () => {
                render(<Button theme={item.value} />);
                expect(screen.getByRole("button")).toHaveClass(item.expected);
            });
        });
    });

    describe("Should render supported sizes", () => {
        const list: Array<ButtonTestItem<ButtonSize, string>> = [
            { value: "lg", expected: "btn-lg" },
            { value: "md", expected: "btn-md" },
            { value: "sm", expected: "btn-sm" },
        ];
        list.map((item: ButtonTestItem<ButtonSize, string>) => {
            it(`Size: ${item.value} - Expected to render (btn-${item.expected})`, () => {
                render(<Button size={item.value} />);
                expect(screen.getByRole("button")).toHaveClass(item.expected);
            });
        });
    });

    it("Should render icon inside button", () => {
        const testId: string = "mySvg";
        render(
            <Button>
                <svg data-testid={testId} />
            </Button>
        );
        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
});
