import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Dropdown } from ".";
import { Key } from "../utils";
import { DropdownProps, DropdownText, getValueOfMultipleSelect } from "./Dropdown";

const testOptions: React.ReactElement[] = [
    <option key={1} value="1">
        First
    </option>,
    <option key={2} value="2">
        Second
    </option>,
    <option key={3} value="3">
        Third
    </option>,
    <option key={4} value="4" disabled>
        Disabled
    </option>,
];

describe("Component: Dropdown", () => {
    function assertDropdownMenuVisibility(visible: boolean): void {
        const dropdownMenu: HTMLElement = screen.getByRole("listbox");
        if (visible) {
            expect(dropdownMenu).toHaveClass("show");
        } else {
            expect(dropdownMenu).not.toHaveClass("show");
        }
    }

    function isOptionTag(element: HTMLElement): element is HTMLOptionElement {
        return element.tagName === "OPTION";
    }

    function getHiddenOptions(): Array<HTMLOptionElement> {
        return screen.getAllByRole("option", { hidden: true }).filter<HTMLOptionElement>(isOptionTag);
    }

    function getVisibleOptions(): Array<HTMLOptionElement> {
        return screen.getAllByRole("option");
    }

    async function searchKeyword(keyword: string): Promise<void> {
        const searchField: HTMLInputElement = screen.getByRole("combobox");
        await userEvent.type(searchField, keyword);
    }

    async function toggleDropdown(): Promise<void> {
        await userEvent.click(screen.getByRole("button"));
    }

    it("Should render correction", () => {
        render(<Dropdown wrapperProps={{ role: "region" }} />);
        expect(screen.getByRole("region")).toHaveClass("rc", "custom-dropdown");
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByRole("combobox", { hidden: true })).toBeInTheDocument();
    });

    it("Should allow passing a custom classname", () => {
        const className: string = "myClassName";
        const wrapperClassName: string = "myWrapperClassName";
        render(<Dropdown className={className} wrapperProps={{ className: wrapperClassName, role: "region" }} />);
        expect(screen.getByRole("region")).toHaveClass(wrapperClassName);
        expect(screen.getByRole("combobox", { hidden: true })).toHaveClass(className);
    });

    it("Should render options inside", () => {
        render(<Dropdown>{testOptions}</Dropdown>);
        expect(screen.getByRole("listbox")).toBeInTheDocument();
        // 4 options + first empty option that is injected
        const hiddenOptions: Array<HTMLOptionElement> = getHiddenOptions();
        expect(hiddenOptions).toHaveLength(5);
        const visibleOptions: Array<HTMLOptionElement> = getVisibleOptions();
        expect(visibleOptions).toHaveLength(4);
        visibleOptions.forEach((optionElement: HTMLOptionElement) => expect(optionElement).toHaveClass("custom-control"));
    });

    it("Should render grouped options inside", () => {
        const optgroupLabel: string = "myLabel";
        render(
            <Dropdown>
                <optgroup label={optgroupLabel}>{testOptions}</optgroup>
            </Dropdown>
        );
        expect(getHiddenOptions()).toHaveLength(5);
        expect(screen.getByText(optgroupLabel));
    });

    it("Should render the placeholder as the first element in the select", () => {
        const placeholder: string = "My placeholder";
        render(<Dropdown placeholder={placeholder}>{testOptions}</Dropdown>);
        expect(getHiddenOptions()[0]).toHaveTextContent(placeholder);
        expect(screen.getByRole("button")).toHaveTextContent(placeholder);
    });

    it("Should support disabled options", () => {
        const placeholder: string = "My placeholder";
        render(<Dropdown placeholder={placeholder}>{testOptions}</Dropdown>);
        expect(getHiddenOptions()[4]).toBeDisabled();
    });

    it("Should ignore disabled elements when determining if all elements are selected", () => {
        const placeholder: string = "My placeholder";
        const selectAll: string = "Select all";
        render(
            <Dropdown multiple value={["1", "2", "3"]} placeholder={placeholder} text={{ selectAll }}>
                {testOptions}
            </Dropdown>
        );
        expect(screen.getByLabelText(selectAll)).toBeChecked();
    });

    it("Should allow padding a dropdown divider", () => {
        render(
            <Dropdown>
                {testOptions}
                <div className="dropdown-divider" role="separator" />
            </Dropdown>
        );
        expect(screen.getByRole("separator")).toBeInTheDocument();
    });

    it("Should render with a search field when searchable is enabled", async () => {
        const { rerender }: RenderResult = render(<Dropdown searchable>{testOptions}</Dropdown>);
        expect(getVisibleOptions()).toHaveLength(4);
        await searchKeyword("second");
        expect(getVisibleOptions()).toHaveLength(1);

        // if the searchable prop is changed back to false
        rerender(<Dropdown>{testOptions}</Dropdown>);
        // The search field should be reset to empty string
        // so all the elements should be visible again
        expect(getVisibleOptions()).toHaveLength(4);
    });

    it("Should allow the value to be cleared when clearable is enabled", async () => {
        const onChange: jest.Mock = jest.fn();
        render(
            <Dropdown onChange={onChange} value="2" clearable>
                {testOptions}
            </Dropdown>
        );
        const combobox: HTMLSelectElement = screen.getByRole("combobox", { hidden: true });
        expect(combobox).toHaveValue("2");
        expect(combobox.selectedIndex).toEqual(1);
        // Only one rendered at a time. The other one renders when it's native
        const [, closeBtn]: Array<HTMLButtonElement> = screen.getAllByRole("button");
        expect(closeBtn).toHaveClass("close-btn");
        expect(onChange).not.toBeCalled();
        await userEvent.click(closeBtn);
        expect(onChange).toBeCalled();
    });

    describe("Should render with default texts and allow passing custom texts", () => {
        const defaultText: Required<DropdownText> = { selectAll: "Select all", emptyList: "List is empty", noResult: "No result", search: "Search..." };

        function runTest(title: string, text?: Required<DropdownText>): void {
            test(title, async () => {
                const { rerender }: RenderResult = render(<Dropdown text={text} searchable multiple />);
                expect(screen.getAllByText((text || defaultText).emptyList)).toHaveLength(2);
                expect(screen.getByPlaceholderText((text || defaultText).search)).toBeInTheDocument();

                rerender(
                    <Dropdown text={text} searchable multiple>
                        {testOptions}
                    </Dropdown>
                );
                expect(screen.getByText((text || defaultText).selectAll)).toBeInTheDocument();
                await searchKeyword("unknowntext");
                expect(screen.getByText((text || defaultText).noResult)).toBeInTheDocument();
            });
        }

        runTest("Default text");
        runTest("Custom text", { selectAll: "Custom - Select all", emptyList: "Custom - List is empty", noResult: "Custom - No result", search: "Custom - Search..." });
    });

    it("Should render as multiple", () => {
        const { rerender }: RenderResult = render(<Dropdown>{testOptions}</Dropdown>);
        expect(screen.getByRole("combobox", { hidden: true })).not.toHaveAttribute("multiple");

        rerender(<Dropdown multiple>{testOptions}</Dropdown>);
        const [combobox]: Array<HTMLElement> = screen.getAllByRole("listbox", { hidden: true });
        expect(combobox as HTMLSelectElement).toHaveAttribute("multiple");
    });

    it("Should render custom static label", () => {
        const hardcodedLabel: string = "Always show this text";
        render(
            <Dropdown selectedLabel={hardcodedLabel} multiple>
                {testOptions}
            </Dropdown>
        );
        expect(screen.getByText(hardcodedLabel)).toBeInTheDocument();
    });

    it("Should render custom label for selected element", () => {
        const customLabels: { [k: string]: string } = {
            1: "One",
            2: "Two",
            3: "Three",
        };
        render(
            <Dropdown selectedLabel={(value: string) => customLabels[value]} value="3">
                {testOptions}
            </Dropdown>
        );
        expect(screen.getByText(customLabels[3])).toBeInTheDocument();
    });

    it("Should render custom label and separator for selected elements", () => {
        const customLabels: { [k: string]: string } = {
            1: "One",
            2: "Two",
            3: "Three",
        };
        render(
            <Dropdown selectedLabel={(value: string[]) => value.map((e) => customLabels[e]).join(" + ")} multiple value={["1", "2"]}>
                {testOptions}
            </Dropdown>
        );
        expect(screen.getByText(`${customLabels[1]} + ${customLabels[2]}`)).toBeInTheDocument();
    });

    describe("Util: getValueOfMultipleSelect", () => {
        it("Should correctly calculates the selected values in a select element", () => {
            const select: HTMLSelectElement = document.createElement("select");
            select.multiple = true;
            [...Array(3)].forEach((_: undefined, i: number) => {
                const option: HTMLOptionElement = document.createElement("option");
                option.value = String(i + 1);
                if (i > 0) {
                    option.selected = true;
                }
                select.append(option);
            });
            expect(getValueOfMultipleSelect(Array.from(select.options))).toEqual(["2", "3"]);
        });
    });

    it("Should toggle dropdown menu when the dropdown toggle is clicked", async () => {
        render(<Dropdown multiple>{testOptions}</Dropdown>);
        assertDropdownMenuVisibility(false);
        await toggleDropdown();
        assertDropdownMenuVisibility(true);
        await toggleDropdown();
        assertDropdownMenuVisibility(false);
    });

    describe("Keyboard support", () => {
        function renderDropDown(props?: Partial<DropdownProps>): void {
            render(<Dropdown {...props}>{testOptions}</Dropdown>);
        }

        async function pressKey(key: Key): Promise<void> {
            await userEvent.keyboard(`{${key}}`);
        }

        function assertDropdownValue(value: string): void {
            expect(screen.getByRole("combobox", { hidden: true })).toHaveValue(value);
        }

        function assertMultipleDropdownValue(value: string): void {
            const [combobox]: Array<HTMLSelectElement> = screen.getAllByRole("listbox", { hidden: true });
            expect(combobox.value).toEqual(value);
        }

        function assertFocusedLabel(label: string): void {
            const focusedLabel: string = getVisibleOptions()
                .filter((element: HTMLElement) => element.classList.contains("focused"))
                .shift()
                ?.querySelector("label")?.innerHTML;

            if (label) {
                expect(focusedLabel).toEqual(label);
            } else {
                expect(focusedLabel).toBeUndefined();
            }
        }

        function assertSearchKeyword(keyword: string): void {
            expect(screen.getByRole("combobox")).toHaveValue(keyword);
        }

        it("Should dismiss dropdown menu when escape button is pressed", async () => {
            renderDropDown();
            await toggleDropdown();
            assertDropdownMenuVisibility(true);
            await pressKey(Key.Escape);
            assertDropdownMenuVisibility(false);
        });

        it("Should dismiss dropdown menu when tab button is pressed", async () => {
            renderDropDown();
            await toggleDropdown();
            assertDropdownMenuVisibility(true);
            await pressKey(Key.Tab);
            assertDropdownMenuVisibility(false);
        });

        it("Should focused on next option when down arrow button is pressed", async () => {
            renderDropDown();
            await toggleDropdown();
            assertFocusedLabel("First");
            await pressKey(Key.ArrowDown);
            assertFocusedLabel("Second");
            await pressKey(Key.ArrowDown);
            assertFocusedLabel("Third");
        });

        it("Should focused on previous option when up arrow button is pressed", async () => {
            renderDropDown();
            await toggleDropdown();
            assertFocusedLabel("First");
            await pressKey(Key.ArrowUp);
            assertFocusedLabel("Disabled");
            await pressKey(Key.ArrowUp);
            assertFocusedLabel("Third");
        });

        it("Should focused on first option when home button is pressed", async () => {
            renderDropDown();
            await toggleDropdown();
            assertFocusedLabel("First");
            await pressKey(Key.ArrowDown);
            assertFocusedLabel("Second");
            await pressKey(Key.Home);
            assertFocusedLabel("First");
        });

        it("Should focused on last option when end button is pressed", async () => {
            renderDropDown();
            await toggleDropdown();
            assertFocusedLabel("First");
            await pressKey(Key.End);
            assertFocusedLabel("Disabled");
        });

        it("Should focused on relevant option when alphanumeric character button is pressed", async () => {
            renderDropDown();
            await toggleDropdown();
            // TODO: add assertion when printable characters keyboard support is added
            await pressKey("A" as Key);
        });

        it("Should toggle focused option and dismiss dropdown menu when enter button is pressed", async () => {
            renderDropDown();
            await toggleDropdown();
            assertDropdownValue("1");
            await pressKey(Key.ArrowDown);
            await pressKey(Key.Enter);
            assertDropdownValue("2");
            assertDropdownMenuVisibility(false);
        });

        it("Should toggle focused option and dismiss dropdown menu when space button is pressed", async () => {
            renderDropDown();
            await toggleDropdown();
            assertDropdownValue("1");
            await pressKey(Key.ArrowDown);
            await pressKey(Key.Space);
            assertDropdownValue("2");
            assertDropdownMenuVisibility(false);
        });

        it("Should toggle focused option and retain dropdown menu when space button is pressed on multiple dropdown", async () => {
            renderDropDown({ multiple: true });
            await toggleDropdown();
            assertMultipleDropdownValue("");
            await pressKey(Key.Space);
            assertMultipleDropdownValue("1");
            assertDropdownMenuVisibility(true);
        });

        it("Should erased searchable keyword and dimiss dropdown menu when escape button is pressed on searchable dropdown", async () => {
            renderDropDown({ searchable: true });
            await toggleDropdown();
            assertSearchKeyword("");
            await searchKeyword("i");
            assertSearchKeyword("i");
            await pressKey(Key.Escape);
            assertSearchKeyword("");
            assertDropdownMenuVisibility(false);
        });

        it("Should not toggle option when space button is pressed on searchable dropdown", async () => {
            renderDropDown({ searchable: true });
            await toggleDropdown();
            assertFocusedLabel(undefined);
            // await pressKey(Key.Space);
            // assertFocusedLabel(undefined);
        });
    });
});
