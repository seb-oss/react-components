import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Chip } from ".";

describe("Component: Chip", () => {
    let onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;

    beforeEach(() => {
        onClose = jest.fn();
    });

    it("Should render correction", () => {
        render(<Chip onClose={onClose}>Test</Chip>);
        const chip: HTMLElement = screen.getByRole("button");
        expect(chip).toBeInTheDocument();
        expect(chip).toHaveClass("rc", "chip");
        expect(chip.querySelector("button")).toBeInTheDocument();
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("Should trigger onClose callback when close button is clicked", async () => {
        render(<Chip onClose={onClose}>Test</Chip>);
        await userEvent.click(screen.getByRole("button").querySelector("button"));
        expect(onClose).toHaveBeenCalled();
    });

    describe("Keyboard support", () => {
        function renderChip(): void {
            render(<Chip onClose={onClose}>Chip</Chip>);
            screen.getByRole("button").focus();
        }

        it("Should trigger onClose when Backspace button is pressed", async () => {
            renderChip();
            expect(onClose).not.toHaveBeenCalled();
            await userEvent.keyboard("[Backspace]");
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        it("Should trigger onClose when Delete button is pressed", async () => {
            renderChip();
            expect(onClose).not.toHaveBeenCalled();
            await userEvent.keyboard("[Delete]");
            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });
});
