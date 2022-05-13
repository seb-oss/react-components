import { render, RenderResult, screen } from "@testing-library/react";
import React from "react";
import { Checkbox } from ".";

describe("Component: Checkbox", () => {
    it("Should render", () => {
        render(<Checkbox />);
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("Should render checkbox inline and render label", () => {
        const label: string = "Some label";
        render(<Checkbox inline>{label}</Checkbox>);
        expect(screen.getByRole("checkbox").closest(".checkbox")).toHaveClass("inline");
        expect(screen.getByRole("checkbox").closest(".custom-control")).toHaveClass("custom-control-inline");
        expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    it("Should pass wrapper props when passed", () => {
        const className: string = "my-custom-checkbox";
        const wrapperClassname: string = "my-custom-wrapper";
        render(<Checkbox className={className} wrapperProps={{ className: wrapperClassname }} />);
        expect(screen.getByRole("checkbox")).toHaveClass(className);
        expect(screen.getByRole("checkbox").closest(".checkbox")).toHaveClass(wrapperClassname);
    });

    it("Should render random id when there is a label and no id passed", () => {
        const id: string = "some-id";
        const { rerender }: RenderResult = render(<Checkbox />);
        expect(screen.getByRole("checkbox").getAttribute("id")).toBeNull();

        rerender(<Checkbox>some label</Checkbox>);
        expect(screen.getByRole("checkbox")).toHaveAttribute("id", expect.any(String));

        rerender(<Checkbox id={id}>some label</Checkbox>);
        expect(screen.getByRole("checkbox")).toHaveAttribute("id", id);
    });
});
