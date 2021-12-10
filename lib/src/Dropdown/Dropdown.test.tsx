import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { Dropdown, DropdownProps, DropdownText, getValueOfMultipleSelect } from ".";
import { Key } from "../utils/keyboardHelper";

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
    let container: HTMLDivElement = null;

    function toggleDropdown(): void {
        act(() => Simulate.click(container.querySelector(".dropdown-toggle")));
    }

    function assertDropdownMenuVisibility(visible: boolean): void {
        expect(document.querySelector(".dropdown-menu").classList.contains("show")).toBe(visible);
    }

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render correction", () => {
        act(() => {
            render(<Dropdown />, container);
        });

        expect(container.firstElementChild).not.toBeNull();
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("custom-dropdown")).toBeTruthy();
        expect(container.firstElementChild.firstElementChild.classList.contains("dropdown")).toBeTruthy();
        expect(container.querySelector("button.dropdown-toggle")).not.toBeNull();
        expect(container.querySelector("select.custom-select")).not.toBeNull();
        expect(container.querySelector("select.custom-select").hasAttribute("hidden")).toBeTruthy();
    });

    it("Should allow passing a custom classname", () => {
        const className: string = "myClassName";
        const wrapperClassName: string = "myWrapperClassName";

        act(() => {
            render(<Dropdown className={className} wrapperProps={{ className: wrapperClassName }} />, container);
        });

        expect(container.firstElementChild.classList.contains(wrapperClassName)).toBeTruthy();
        expect(container.querySelector("select").classList.contains(className)).toBeTruthy();
    });

    it("Should render options inside", () => {
        act(() => {
            render(<Dropdown>{testOptions}</Dropdown>, container);
        });

        // 4 options + first empty option that is injected
        expect(container.querySelector("select").options).toHaveLength(5);
        expect(document.body.querySelector(".dropdown-menu")).not.toBeNull();
        expect(document.body.querySelectorAll(".custom-control")).toHaveLength(4);
    });

    it("Should render grouped options inside", () => {
        const optgroupLabel: string = "myLabel";
        act(() => {
            render(
                <Dropdown>
                    <optgroup label={optgroupLabel}>{testOptions}</optgroup>
                </Dropdown>,
                container
            );
        });

        expect(container.querySelector("select").options).toHaveLength(5);
        expect(container.querySelector("select").querySelector("optgroup")).not.toBeNull();
        expect(document.body.querySelector("label.optgroup-label")).not.toBeNull();
        expect(document.body.querySelector("label.optgroup-label").textContent).toEqual(optgroupLabel);
    });

    it("Should render the placeholder as the first element in the select", () => {
        const placeholder: string = "My placeholder";
        act(() => {
            render(<Dropdown placeholder={placeholder}>{testOptions}</Dropdown>, container);
        });
        expect(container.querySelector("select").options.item(0).textContent).toEqual(placeholder);
        expect(container.querySelector("button.dropdown-toggle").firstElementChild.tagName.toLowerCase()).toEqual("span");
        expect(container.querySelector("button.dropdown-toggle").firstElementChild.textContent).toEqual(placeholder);
    });

    it("Should support disabled options", () => {
        const placeholder: string = "My placeholder";
        act(() => {
            render(<Dropdown placeholder={placeholder}>{testOptions}</Dropdown>, container);
        });
        expect(container.querySelector("select").options.item(4).disabled).toBeTruthy();
    });

    it("Should ignore disabled elements when determining if all elements are selected", () => {
        const placeholder: string = "My placeholder";
        act(() => {
            render(
                <Dropdown multiple value={["1", "2", "3"]} placeholder={placeholder}>
                    {testOptions}
                </Dropdown>,
                container
            );
        });
        expect(document.body.querySelector<HTMLInputElement>(".select-all .custom-control-input").checked).toBeTruthy();
    });

    it("Should allow padding a dropdown divider", () => {
        act(() => {
            render(
                <Dropdown>
                    {testOptions}
                    <div className="dropdown-divider" />
                </Dropdown>,
                container
            );
        });

        expect(document.body.querySelector(".dropdown-divider")).not.toBeNull();
    });

    it("Should render with a search field when searchable is enabled", () => {
        act(() => {
            render(<Dropdown searchable>{testOptions}</Dropdown>, container);
        });

        const searchField = document.body.querySelector("input[type=text]");

        expect(searchField).not.toBeNull();
        expect(document.body.querySelectorAll(".custom-control")).toHaveLength(4);

        act(() => Simulate.change(searchField, { target: { value: "second" } as any }));

        expect(document.body.querySelectorAll(".custom-control")).toHaveLength(1);

        // if the searchable prop is changed back to false
        act(() => {
            render(<Dropdown>{testOptions}</Dropdown>, container);
        });

        // The search field should be reset to empty string
        // so all the elements should be visible again
        expect(document.body.querySelectorAll(".custom-control")).toHaveLength(4);
    });

    it("Should allow the value to be cleared when clearable is enabled", () => {
        const onChange: jest.Mock = jest.fn();
        act(() => {
            render(
                <Dropdown onChange={onChange} value="2" clearable>
                    {testOptions}
                </Dropdown>,
                container
            );
        });

        expect(container.querySelector("select").value).toEqual("2");
        expect(container.querySelector("select").selectedIndex).toEqual(1);
        // Only one rendered at a time. The other one renders when it's native
        expect(document.querySelectorAll(".close-btn")).toHaveLength(1);

        act(() => Simulate.click(document.querySelector(".close-btn")));

        expect(onChange).toBeCalled();
    });

    describe("Should render with default texts and allow passing custom texts", () => {
        const defaultText: Required<DropdownText> = { selectAll: "Select all", emptyList: "List is empty", noResult: "No result", search: "Search..." };

        function runTest(title: string, text?: Required<DropdownText>): void {
            test(title, () => {
                act(() => {
                    render(<Dropdown text={text} searchable multiple />, container);
                });
                expect(document.body.querySelector(".dropdown-menu > p").textContent).toEqual((text || defaultText).emptyList);
                expect(document.body.querySelector("input[type=text]").getAttribute("placeholder")).toEqual((text || defaultText).search);

                act(() => {
                    render(
                        <Dropdown text={text} searchable multiple>
                            {testOptions}
                        </Dropdown>,
                        container
                    );
                });
                expect(document.body.querySelector(".select-all .custom-control-label").textContent).toEqual(defaultText.selectAll);

                act(() => Simulate.change(document.body.querySelector("input[type=text]"), { target: { value: "unknowntext" } as any }));
                expect(document.body.querySelector(".dropdown-menu > p").textContent).toEqual((text || defaultText).noResult);
            });
        }

        runTest("Default text");
        runTest("Custom text", { selectAll: "Select all", emptyList: "List is empty", noResult: "No result", search: "Search..." });
    });

    it("Should render as multiple", () => {
        act(() => {
            render(<Dropdown multiple>{testOptions}</Dropdown>, container);
        });

        expect(container.querySelector("select").multiple).toBe(true);
    });

    it("Should render custom static label", () => {
        const hardcodedLabel: string = "Always show this text";
        act(() => {
            render(
                <Dropdown selectedLabel={hardcodedLabel} multiple>
                    {testOptions}
                </Dropdown>,
                container
            );
        });

        expect(container.querySelector(".rc.custom-dropdown > .dropdown > .btn.dropdown-toggle > span").textContent).toBe(hardcodedLabel);
    });

    it("Should render custom label for selected element", () => {
        const customLabels: { [k: string]: string } = {
            1: "One",
            2: "Two",
            3: "Three",
        };

        const getLabel = (value: string) => {
            return customLabels[value];
        };

        act(() => {
            render(
                <Dropdown selectedLabel={getLabel} value="3">
                    {testOptions}
                </Dropdown>,
                container
            );
        });

        expect(container.querySelector(".rc.custom-dropdown > .dropdown > .btn.dropdown-toggle > span").textContent).toBe(customLabels["3"]);
    });

    it("Should render custom label and separator for selected elements", () => {
        const customLabels: { [k: string]: string } = {
            1: "One",
            2: "Two",
            3: "Three",
        };

        const getLabel = (value: string[]) => {
            return value.map((e) => customLabels[e]).join(" + ");
        };

        act(() => {
            render(
                <Dropdown selectedLabel={getLabel} multiple value={["1", "2"]}>
                    {testOptions}
                </Dropdown>,
                container
            );
        });

        expect(container.querySelector(".rc.custom-dropdown > .dropdown > .btn.dropdown-toggle > span").textContent).toBe("One + Two");
    });

    it("Should render native only when used in a mobile device", () => {
        const userAgent: string = window.navigator.userAgent;
        const onChange: jest.Mock = jest.fn();
        Object.defineProperty(window.navigator, "userAgent", { value: "iPhone" });

        act(() => {
            render(
                <Dropdown value="2" onChange={onChange} clearable>
                    {testOptions}
                </Dropdown>,
                container
            );
        });

        expect(container.querySelector("select").hasAttribute("hidden")).toBeFalsy();
        expect(container.querySelector(".dropdown")).toBeNull();
        expect(container.querySelectorAll(".custom-dropdown .close-btn")).toHaveLength(1);

        act(() => Simulate.click(container.querySelector(".close-btn")));

        expect(onChange).toBeCalled();

        Object.defineProperty(window.navigator, "userAgent", { value: userAgent });
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

    it("Should toggle dropdown menu when the dropdown toggle is clicked", () => {
        act(() => {
            render(<Dropdown multiple>{testOptions}</Dropdown>, container);
        });
        assertDropdownMenuVisibility(false);
        toggleDropdown();
        assertDropdownMenuVisibility(true);
        toggleDropdown();
        assertDropdownMenuVisibility(false);
    });

    describe("Keyboard support", () => {
        function renderDropDown(props?: Partial<DropdownProps>): void {
            act(() => {
                render(<Dropdown {...props}>{testOptions}</Dropdown>, container);
            });
        }

        function pressKey(key: string): void {
            act(() => Simulate.keyDown(document.activeElement, { key }));
        }

        function searchKeyword(keyword: string): void {
            act(() => Simulate.change(document.querySelector("input[type=text]"), { target: { value: keyword } as any }));
        }

        function assertDropdownValue(value: string): void {
            expect(container.querySelector<HTMLSelectElement>(".custom-select").value).toEqual(value);
        }

        function assertFocusedLabel(label: string): void {
            const focusedLabel: string = document.querySelector<HTMLLabelElement>(".custom-control.focused label")?.innerHTML;
            if (label) {
                expect(focusedLabel).toEqual(label);
            } else {
                expect(focusedLabel).toBeUndefined();
            }
        }

        function assertSearchKeyword(keyword: string): void {
            expect(document.querySelector<HTMLInputElement>("input[type=text]").value).toEqual(keyword);
        }

        it("Should dismiss dropdown menu when escape button is pressed", () => {
            renderDropDown();
            toggleDropdown();
            assertDropdownMenuVisibility(true);
            pressKey(Key.Escape);
            assertDropdownMenuVisibility(false);
        });

        it("Should dismiss dropdown menu when tab button is pressed", () => {
            renderDropDown();
            toggleDropdown();
            assertDropdownMenuVisibility(true);
            pressKey(Key.Tab);
            assertDropdownMenuVisibility(false);
        });

        it("Should focused on next option when down arrow button is pressed", () => {
            renderDropDown();
            toggleDropdown();
            assertFocusedLabel("First");
            pressKey(Key.ArrowDown);
            assertFocusedLabel("Second");
            pressKey(Key.ArrowDown);
            assertFocusedLabel("Third");
        });

        it("Should focused on previous option when up arrow button is pressed", () => {
            renderDropDown();
            toggleDropdown();
            assertFocusedLabel("First");
            pressKey(Key.ArrowUp);
            assertFocusedLabel("Disabled");
            pressKey(Key.ArrowUp);
            assertFocusedLabel("Third");
        });

        it("Should focused on first option when home button is pressed", () => {
            renderDropDown();
            toggleDropdown();
            assertFocusedLabel("First");
            pressKey(Key.ArrowDown);
            assertFocusedLabel("Second");
            pressKey(Key.Home);
            assertFocusedLabel("First");
        });

        it("Should focused on last option when end button is pressed", () => {
            renderDropDown();
            toggleDropdown();
            assertFocusedLabel("First");
            pressKey(Key.End);
            assertFocusedLabel("Disabled");
        });

        it("Should focused on relevant option when alphanumeric character button is pressed", () => {
            renderDropDown();
            toggleDropdown();
            // TODO: add assertion when printable characters keyboard support is added
            pressKey("A");
        });

        it("Should toggle focused option and dismiss dropdown menu when enter button is pressed", () => {
            renderDropDown();
            toggleDropdown();
            assertDropdownValue("1");
            pressKey(Key.ArrowDown);
            pressKey(Key.Enter);
            assertDropdownValue("2");
            assertDropdownMenuVisibility(false);
        });

        it("Should toggle focused option and dismiss dropdown menu when space button is pressed", () => {
            renderDropDown();
            toggleDropdown();
            assertDropdownValue("1");
            pressKey(Key.ArrowDown);
            pressKey(Key.Space);
            assertDropdownValue("2");
            assertDropdownMenuVisibility(false);
        });

        it("Should toggle focused option and retain dropdown menu when space button is pressed on multiple dropdown", () => {
            renderDropDown({ multiple: true });
            toggleDropdown();
            assertDropdownValue("");
            pressKey(Key.Space);
            assertDropdownValue("1");
            assertDropdownMenuVisibility(true);
        });

        it("Should erased searchable keyword and dimiss dropdown menu when escape button is pressed on searchable dropdown", () => {
            renderDropDown({ searchable: true });
            toggleDropdown();
            assertSearchKeyword("");
            searchKeyword("i");
            assertSearchKeyword("i");
            pressKey(Key.Escape);
            assertSearchKeyword("");
            assertDropdownMenuVisibility(false);
        });

        it("Should not toggle option when space button is pressed on searchable dropdown", () => {
            renderDropDown({ searchable: true });
            toggleDropdown();
            assertFocusedLabel(undefined);
            pressKey(Key.Space);
            assertFocusedLabel(undefined);
        });
    });
});
