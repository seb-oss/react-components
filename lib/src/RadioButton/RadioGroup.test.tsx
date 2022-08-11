import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { RadioButton, RadioGroup } from ".";

const radios: React.ReactElement[] = [
    <RadioButton key={1} value="Yes">
        Yes
    </RadioButton>,
    <RadioButton key={2} value="No">
        No
    </RadioButton>,
];

describe("Component: RadioGroup", () => {
    it("Should render", () => {
        render(<RadioGroup name="test">{radios}</RadioGroup>);
        expect(screen.getByRole("group")).toBeInTheDocument();
        expect(screen.getAllByRole("radio")).toHaveLength(radios.length);
    });

    it("Should allow passing a custom classname", () => {
        const className: string = "myclassname";
        render(<RadioGroup name="test" className={className} />);
        expect(screen.getByRole("group")).toHaveClass(className);
    });

    it("Should capture onChange events from individual radio buttons and emit it as one event", async () => {
        const onChange: jest.Mock = jest.fn();
        render(
            <RadioGroup name="test" onChange={onChange}>
                {radios}
            </RadioGroup>
        );
        const radioInputs: Array<HTMLInputElement> = screen.getAllByRole<HTMLInputElement>("radio");
        await userEvent.click(radioInputs[1]);
        expect(onChange).toBeCalledTimes(1);
    });

    it("Should render any non radio button components", () => {
        render(
            <RadioGroup name="test">
                {radios}
                test
            </RadioGroup>
        );
        expect(screen.getByText("test")).toBeInTheDocument();
    });

    it("Should render component with label", () => {
        const label: string = "Element label";
        render(
            <RadioGroup label={label} name="test">
                {radios}
            </RadioGroup>
        );
        expect(screen.getByText(label)).toBeInTheDocument();
    });
});
