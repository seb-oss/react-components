import { render, screen } from "@testing-library/react";
import React from "react";
import { TableListItem } from ".";

describe("Component: TableListItem", () => {
    it("Should render correctly", () => {
        const id: string = "myId";
        const className: string = "myClassname";
        render(<TableListItem id={id} className={className} name="name" values={["value"]} />);
        expect(screen.getByRole("group")).toBeInTheDocument();
        expect(screen.getByRole("group")).toHaveClass("rc", "table-list-item", "myClassname");
        expect(screen.getByText("name"));
        expect(screen.getByText("value"));
    });

    it("Should render with multiple values", () => {
        render(<TableListItem name="name" values={["value", "value 2"]} />);
        expect(screen.getByText("value"));
        expect(screen.getByText("value 2"));
    });

    it("Should render values inline", () => {
        render(<TableListItem name="name" values={["value", "value 2"]} inline />);
        expect(screen.getByRole("group")).toHaveClass("table-list-item--inline");
    });
});
