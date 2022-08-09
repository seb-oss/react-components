import { render, screen } from "@testing-library/react";
import React from "react";
import { CloseButton } from ".";

describe("Component: CloseButton", () => {
    it("Should render correction", () => {
        render(<CloseButton />);
        expect(screen.getByRole("button")).toHaveClass("rc", "close-btn");
    });

    it("Should allow passing a custom classname", () => {
        const className: string = "myClassName";
        render(<CloseButton className={className} />);
        expect(screen.getByRole("button")).toHaveClass(className);
    });
});
