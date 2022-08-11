import { render, RenderResult, screen } from "@testing-library/react";
import React from "react";
import { RadioButton } from "./RadioButton";

describe("Component: RadioButton", () => {
    it("Should render", () => {
        render(<RadioButton />);
        expect(screen.getByRole("radio")).toBeInTheDocument();
    });

    it("Should pass custom class and id", () => {
        const className: string = "my-custom-radio";
        const wrapperClassname: string = "my-custom-wrapper";
        render(<RadioButton className={className} wrapperProps={{ className: wrapperClassname }} />);
        expect(screen.getByRole("radio")).toHaveClass(className);
        expect(screen.getByRole("radio").closest(".radio-button")).toHaveClass(wrapperClassname);
    });

    it("Should render with random id if id is not passed", () => {
        const { rerender }: RenderResult = render(<RadioButton>label</RadioButton>);
        expect(screen.getByRole("radio")).toHaveAttribute("id", expect.any(String));
        expect(screen.getByLabelText("label")).toBeInTheDocument();

        const id: string = "myId";
        rerender(<RadioButton id={id}>label</RadioButton>);
        expect(screen.getByRole("radio")).toHaveAttribute("id", id);
        expect(screen.getByLabelText("label")).toBeInTheDocument();
    });

    it("Should render and display label", () => {
        const label: string = "my label";
        render(<RadioButton>{label}</RadioButton>);
        expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
});
