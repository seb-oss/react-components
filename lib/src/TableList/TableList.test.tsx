import { render, screen } from "@testing-library/react";
import React from "react";
import { TableList } from ".";

describe("Component: TableList", () => {
    it("Should render correctly", () => {
        render(<TableList header="header" wrapperProps={{ className: "myWrapperClassname" }} />);
        expect(screen.getByRole("figure")).toBeInTheDocument();
        expect(screen.getByRole("figure")).toHaveClass("rc", "table-list", "myWrapperClassname");
        expect(screen.getByText("header")).toBeInTheDocument();
        expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("Should render with id and custom class", () => {
        const id: string = "myId";
        const className: string = "myClassname";
        render(<TableList id={id} className={className} header="header" />);
        expect(screen.getByRole("list")).toHaveAttribute("id", "myId");
        expect(screen.getByRole("list")).toHaveClass("myClassname");
    });
});
