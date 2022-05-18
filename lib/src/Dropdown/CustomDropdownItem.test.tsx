import { render, screen } from "@testing-library/react";
import React from "react";
import { CustomDropdownItem } from "./CustomDropdownItem";

describe("Component: CustomDropdownItem", () => {
    const content: string = "my content";

    it("Should render correction", () => {
        render(<CustomDropdownItem>{content}</CustomDropdownItem>);
        // Dropdown item classes
        const dropdownItem: HTMLOptionElement = screen.getByRole("option");
        expect(dropdownItem).toHaveClass("custom-control");
        expect(dropdownItem).not.toHaveClass("custom-checkbox", "focused");
        // Input element classes
        const inputElement: HTMLInputElement = screen.getByLabelText(content);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute("type", "radio");
        expect(inputElement).not.toHaveClass("custom-control-input");
        // Input label classes
        const inputLabel: HTMLElement = screen.getByText(content);
        expect(inputLabel).toBeInTheDocument();
        expect(inputLabel).toHaveClass("custom-radio");
        expect(inputLabel).not.toHaveClass("custom-control-label");
        // Should have a random id
        expect(inputElement).toHaveAttribute("id", expect.any(String));
    });

    it("Should render correctly with multiple", () => {
        render(<CustomDropdownItem multiple>{content}</CustomDropdownItem>);
        expect(screen.getByRole("option")).toHaveClass("custom-checkbox");
        const inputElement: HTMLInputElement = screen.getByLabelText(content);
        expect(inputElement).toHaveAttribute("type", "checkbox");
        expect(inputElement).toHaveClass("custom-control-input");
        expect(screen.getByText(content)).toHaveClass("custom-control-label");
    });

    it("Should render correctly with focused", () => {
        render(<CustomDropdownItem focused />);
        expect(screen.getByRole("option")).toHaveClass("focused");
    });
});
