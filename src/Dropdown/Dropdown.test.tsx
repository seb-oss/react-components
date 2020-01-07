import * as React from "react";
import { Dropdown, DropdownProps } from "./Dropdown";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

describe("Component: Dropdown", () => {
    let container: HTMLDivElement = null;
    let DEFAULT_PROPS: DropdownProps = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        DEFAULT_PROPS = {
            list: [
                { label: "A", value: "a" },
                { label: "B", value: "b" },
                { label: "C", value: "c" }
            ],
            onChange: jest.fn(),
            selectedValue: null
        };
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        DEFAULT_PROPS = null;
    });

    it("Should render", () => {
        act(() => {
            render(<Dropdown {...DEFAULT_PROPS} />, container);
        });

        expect(container).toBeTruthy();
        expect(container.querySelector(".custom-dropdown")).toBeTruthy();
        expect(container.querySelector(".custom-dropdown-toggle").classList.contains("open")).toBeFalsy();
    });

    it("Should pass custom class and id", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            className: "my-custom-class",
            id: "my-custom-id"
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        expect(container.querySelector(".custom-dropdown").classList.contains(props.className)).toBeTruthy();
        expect(container.querySelector(".custom-dropdown").getAttribute("id")).toEqual(props.id);
    });

    it("Should render label", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            label: "my-custom-label"
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });
        const target = container.querySelector(".dropdown-label");
        expect(target).toBeTruthy();
        expect(target.innerHTML).toBe(props.label);
    });

    it("Should render placeholder", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            placeholder: "my-custom-placeholder"
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        expect(container.querySelector(".title").innerHTML).toBe(props.placeholder);
    });

    it("Should open menu when clicked on trigger", () => {
        act(() => {
            render(<Dropdown {...DEFAULT_PROPS} />, container);
        });

        const toggle: Element = container.querySelector(".custom-dropdown-toggle");
        expect(toggle.classList.contains("open")).toBeFalsy();

        act(() => {
            toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(toggle.classList.contains("open")).toBeTruthy();
        const target: Element = container.querySelector(".custom-dropdown-menu");
        expect(target.classList.contains("show")).toBeTruthy();
    });

    it("Should display \"Empty\" and be disabled if list prop is an empty array", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            list: []
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const toggle: Element = container.querySelector(".custom-dropdown-toggle");
        expect(toggle.classList.contains("disabled")).toBeTruthy();
        expect(container.querySelector(".title").innerHTML).toBe("Empty");
    });

    it("Should display item label when one item is selected", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            selectedValue: { ...DEFAULT_PROPS.list[0] }
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        expect(container.querySelector(".title").innerHTML).toBe(DEFAULT_PROPS.list[0].label);
    });

    it("Should display correct label in multi mode for each scenario (1 selected, more than one but not all selected, all selected)", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            selectedValue: [{ ...DEFAULT_PROPS.list[0] }],
            multi: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const target = container.querySelector(".title");
        expect(target.innerHTML).toBe(DEFAULT_PROPS.list[0].label);
        const dropdownItems = container.querySelectorAll(".custom-dropdown-item");

        act(() => {
            dropdownItems.item(dropdownItems.length - 1).dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(props.onChange).toBeCalledTimes(1);

        act(() => {
            render(<Dropdown {...props} selectedValue={[{ ...DEFAULT_PROPS.list[0] }, { ...DEFAULT_PROPS.list[1] }]} />, container);
        });

        const target2 = container.querySelector(".title");
        expect(target2.innerHTML).toBe("2 Selected");

        act(() => {
            render(<Dropdown {...props} selectedValue={[...DEFAULT_PROPS.list]} />, container);
        });

        const target3 = container.querySelector(".title");
        expect(target3.innerHTML).toBe(`All selected (${DEFAULT_PROPS.list.length})`);
    });

    it("Should enable search when searchable prop set to true", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            searchable: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });
        const target = container.querySelector(".search-input");
        expect(target).toBeTruthy();
        expect(target.getAttribute("placeholder")).toBe("Search ...");
    });

    it("Should enable more button when set to true", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            more: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const toggle: Element = container.querySelector(".custom-dropdown-toggle");
        expect(toggle).toBeTruthy();
        expect(toggle.classList.contains("open")).toBeFalsy();

        act(() => {
            toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(toggle.classList.contains("open")).toBeTruthy();
        const menu: Element = container.querySelector(".custom-dropdown-menu");
        expect(menu.classList.contains("show")).toBeTruthy();
        expect(menu.classList.contains("dropdown-menu-right")).toBeTruthy();
    });

    it("Should enable search when searchable prop set to true", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            native: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const target = container.querySelector(".form-control");
        expect(target).toBeTruthy();
        expect(target.classList.contains("disabled")).toBeFalsy();
        expect(target.querySelectorAll("option").length).toBe(DEFAULT_PROPS.list.length);
    });

    it("Should display error is error prop set", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            error: "my-custom-error"
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const target = container.querySelector(".alert-danger");
        expect(target).toBeTruthy();
        expect(target.innerHTML).toBe(props.error);
    });

    it("Should disable component when disabled set to true", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            disabled: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const target = container.querySelector(".custom-dropdown");
        expect(target).toBeTruthy();
        expect(target.classList.contains("disabled")).toBeTruthy();
        expect(target.querySelector(".custom-dropdown-toggle").classList.contains("disabled")).toBeTruthy();
    });

    it("Should display clear button if at least one item is selected and clearable prop or multi prop is true", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            multi: true,
            selectedValue: [{ ...DEFAULT_PROPS.list[0] }]
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const target = container.querySelector(".dropdown-times-icon");
        expect(target).toBeTruthy();

        const newProps: DropdownProps = {
            ...DEFAULT_PROPS,
            clearable: true,
            selectedValue: { ...DEFAULT_PROPS.list[0] }
        };

        act(() => {
            render(<Dropdown {...newProps} />, container);
        });

        const target2 = container.querySelector(".dropdown-times-icon");
        expect(target2).toBeTruthy();
    });

    it("Should not display clear button if all items are unselected even when clearable prop set to true", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            clearable: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const target = container.querySelector(".dropdown-times-icon");
        expect(target).toBeFalsy();
    });
});
