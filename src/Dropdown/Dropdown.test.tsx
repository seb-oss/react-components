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

    it("Should not render and warn if list is null or not an array", () => {
        act(() => {
            render(<Dropdown {...DEFAULT_PROPS} list={null} />, container);
        });

        expect(container).toBeTruthy();
        expect(container.querySelector(".custom-dropdown")).toBeFalsy();
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

        const target: Element = container.querySelector(".custom-dropdown");
        expect(target).toBeTruthy();
        expect(target.classList.contains(props.className)).toBeTruthy();
        expect(target.getAttribute("id")).toEqual(props.id);

        act(() => {
            render(<Dropdown {...props} native />, container);
        });

        const target2: Element = container.querySelector(".form-control");
        expect(target2).toBeTruthy();
        expect(target2.classList.contains(props.className)).toBeTruthy();
        expect(target2.getAttribute("id")).toEqual(props.id);
    });

    it("Should render label", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            label: "my-custom-label"
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const target: Element = container.querySelector(".dropdown-label");
        expect(target).toBeTruthy();
        expect(target.innerHTML).toBe(props.label);

        act(() => {
            render(<Dropdown {...props} native />, container);
        });

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

    it("Should open menu when clicked on trigger or pressing enter", () => {
        act(() => {
            render(<Dropdown {...DEFAULT_PROPS} />, container);
        });

        const toggle: Element = container.querySelector(".custom-dropdown-toggle");
        expect(toggle.classList.contains("open")).toBeFalsy();

        act(() => {
            toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(toggle.classList.contains("open")).toBeTruthy();
        const menu: Element = container.querySelector(".custom-dropdown-menu");
        expect(menu.classList.contains("show")).toBeTruthy();

        act(() => {
            toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(toggle.classList.contains("open")).toBeFalsy();
        expect(menu.classList.contains("show")).toBeFalsy();

        act(() => {
            toggle.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "enter" }));
        });

        expect(toggle.classList.contains("open")).toBeTruthy();
        expect(menu.classList.contains("show")).toBeTruthy();
    });

    it("Should close menu when clicking anywhere outside the dropdown component", () => {
        act(() => {
            render(<Dropdown {...DEFAULT_PROPS} label="my-label"/>, container);
        });

        const toggle: Element = container.querySelector(".custom-dropdown-toggle");
        expect(toggle.classList.contains("open")).toBeFalsy();

        act(() => {
            toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(toggle.classList.contains("open")).toBeTruthy();
        const menu: Element = container.querySelector(".custom-dropdown-menu");
        expect(menu.classList.contains("show")).toBeTruthy();

        const label: Element = container.querySelector(".dropdown-label");
        expect(label).toBeTruthy();
        expect(label.innerHTML).toBe("my-label");

        act(() => {
            container.dispatchEvent(new Event("mousedown", { bubbles: true }));
        });

        expect(toggle.classList.contains("open")).toBeFalsy();
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

        act(() => {
            render(<Dropdown {...props} native />, container);
        });

        expect(container.querySelector("select").value).toBe(DEFAULT_PROPS.list[0].value);
    });

    it("Should display correct label in multi mode for each scenario (none, 1 selected, more than one but not all selected and all selected)", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            multi: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const title: Element = container.querySelector(".title");
        expect(title.innerHTML).toBe("Select ...");
        const options: NodeListOf<Element> = container.querySelectorAll(".custom-dropdown-item:not(.select-all)");
        expect(options.length).toBe(3);

        act(() => {
            options.item(options.length - 1).dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(props.onChange).toBeCalledTimes(1);

        act(() => {
            render(<Dropdown {...props} selectedValue={[{ ...DEFAULT_PROPS.list[2] }]} />, container);
        });

        expect(title.innerHTML).toBe(props.list[2].label);

        act(() => {
            render(<Dropdown {...props} selectedValue={[{ ...DEFAULT_PROPS.list[0] }, { ...DEFAULT_PROPS.list[1] }]} />, container);
        });

        expect(title.innerHTML).toBe("2 Selected");

        act(() => {
            render(<Dropdown {...props} selectedValue={[...DEFAULT_PROPS.list]} />, container);
        });

        expect(title.innerHTML).toBe(`All selected (${DEFAULT_PROPS.list.length})`);
    });

    it("Should deselect an option when clicking on it again", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            selectedValue: [{ ...DEFAULT_PROPS.list[0] }],
            multi: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const options: NodeListOf<Element> = container.querySelectorAll(".custom-dropdown-item:not(.select-all)");
        expect(options.length).toBe(3);

        expect(options.item(0).classList.contains("selected")).toBeTruthy();
        expect(options.item(1).classList.contains("selected")).toBeFalsy();
        expect(options.item(2).classList.contains("selected")).toBeFalsy();

        act(() => {
            options.item(0).dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenCalledWith([]);
    });

    it("Should enable search when searchable prop set to true", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            searchable: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const searchInput: Element = container.querySelector(".search-input");
        expect(searchInput).toBeTruthy();
        expect(searchInput.getAttribute("placeholder")).toBe("Search ...");
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

        const target: Element = container.querySelector(".form-control");
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

        const alert: Element = container.querySelector(".alert-danger");
        expect(alert).toBeTruthy();
        expect(alert.innerHTML).toBe(props.error);

        act(() => {
            render(<Dropdown {...props} native />, container);
        });

        expect(alert).toBeTruthy();
        expect(alert.innerHTML).toBe(props.error);
    });

    it("Should disable component when disabled set to true", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            disabled: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const target: Element = container.querySelector(".custom-dropdown");
        expect(target).toBeTruthy();
        expect(target.classList.contains("disabled")).toBeTruthy();
        expect(target.querySelector(".custom-dropdown-toggle").classList.contains("disabled")).toBeTruthy();

        act(() => {
            render(<Dropdown {...props} native label="my-label" />, container);
        });

        const nativeTarget: Element = container.querySelector("select");
        expect(nativeTarget).toBeTruthy();
        expect(nativeTarget.classList.contains("disabled")).toBeTruthy();

        const label: Element = container.querySelector(".dropdown-label");
        expect(label).toBeTruthy();
        expect(label.classList.contains("disabled")).toBeTruthy();
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

        const closeButton: Element = container.querySelector(".dropdown-times-icon");
        expect(closeButton).toBeTruthy();

        const newProps: DropdownProps = {
            ...DEFAULT_PROPS,
            clearable: true,
            selectedValue: { ...DEFAULT_PROPS.list[0] }
        };

        act(() => {
            render(<Dropdown {...newProps} />, container);
        });

        expect(closeButton).toBeTruthy();
    });

    it("Should not display clear button if all items are unselected even when clearable prop set to true", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            clearable: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const closeButton: Element = container.querySelector(".dropdown-times-icon");
        expect(closeButton).toBeFalsy();
    });

    it("Should clear all items selected when clear button pressed", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            selectedValue: { ...DEFAULT_PROPS.list[0] },
            clearable: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const target: Element = container.querySelector(".right-items > .dropdown-icon-holder");
        expect(target).toBeTruthy();

        act(() => {
            target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(props.onChange).toBeCalledTimes(1);
        expect(props.onChange).toBeCalledWith(null);

        act(() => {
            render(<Dropdown {...props} selectedValue={null} />, container);
        });

        const target2: Element = container.querySelector(".right-items > .dropdown-icon-holder > .dropdown-times-icon");
        expect(target2).toBeFalsy();
    });

    it("Should select all items when select all button pressed", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            selectedValue: [{ ...DEFAULT_PROPS.list[0] }],
            multi: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const target: Element = container.querySelector("#select-all");
        expect(target).toBeTruthy();

        const selectedOptions: NodeListOf<Element> = container.querySelectorAll(".custom-dropdown-item.selected");
        expect(selectedOptions.length).toBe(1);

        act(() => {
            target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(props.onChange).toBeCalledTimes(1);
        expect(props.onChange).toBeCalledWith(props.list);

        act(() => {
            render(<Dropdown {...props} selectedValue={props.list} />, container);
        });

        const newSelectedOptions: NodeListOf<Element> = container.querySelectorAll(".custom-dropdown-item.selected");
        expect(newSelectedOptions.length).toBe(4);
    });

    it("Should toggle deselect all items when select all button is pressed and all items are already selected", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            selectedValue: [...DEFAULT_PROPS.list],
            multi: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const target: Element = container.querySelector("#select-all");
        expect(target).toBeTruthy();

        const selectedOptions: NodeListOf<Element> = container.querySelectorAll(".custom-dropdown-item.selected");
        expect(selectedOptions.length).toBe(4);

        act(() => {
            target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(props.onChange).toBeCalledTimes(1);
        expect(props.onChange).toBeCalledWith([]);

        act(() => {
            render(<Dropdown {...props} selectedValue={[]} />, container);
        });

        const newSelectedOptions: NodeListOf<Element> = container.querySelectorAll(".custom-dropdown-item.selected");
        expect(newSelectedOptions.length).toBe(0);
    });

    it("Should only display items that fit the search term when searchable is set to true", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            searchable: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const options: NodeListOf<Element> = container.querySelectorAll(".custom-dropdown-item");
        expect(options.length).toBe(3);

        const searchInput: HTMLInputElement = container.querySelector(".search-input");
        expect(searchInput.getAttribute("value")).toBe("");
        searchInput.setAttribute("value", "a");

        act(() => {
            searchInput.dispatchEvent(new Event("change", { bubbles: true }));
        });

        expect(searchInput.value).toBe("a");
        const newOptions: NodeListOf<Element> = container.querySelectorAll(".custom-dropdown-item");
        expect(newOptions.length).toBe(1);
    });

    it("Should focus and highlight the option on mouse enter", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const options: NodeListOf<Element> = container.querySelectorAll(".custom-dropdown-item");
        expect(options.length).toBe(3);

        options.forEach((option: Element) => {
            expect(option.classList.contains("highlighted")).toBeFalsy();
        });

        act(() => {
            options.item(0).dispatchEvent(new Event("mousemove", { bubbles: true }));
        });

        expect(options.item(0).classList.contains("highlighted")).toBeTruthy();
        expect(options.item(1).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(2).classList.contains("highlighted")).toBeFalsy();

        act(() => {
            options.item(1).dispatchEvent(new Event("mousemove", { bubbles: true }));
        });

        act(() => {
            options.item(1).dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        act(() => {
            options.item(1).dispatchEvent(new Event("mousemove", { bubbles: true }));
        });

        expect(options.item(0).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(1).classList.contains("highlighted")).toBeTruthy();
        expect(options.item(2).classList.contains("highlighted")).toBeFalsy();
    });

    it("Should navigate between options when keyboard up and down arrows are pressed", () => {
        act(() => {
            render(<Dropdown {...DEFAULT_PROPS} />, container);
        });

        const toggle: Element = container.querySelector(".custom-dropdown-toggle");
        expect(toggle).toBeTruthy();
        const options = container.querySelectorAll(".custom-dropdown-item");
        expect(options.length).toBe(3);

        act(() => {
            toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        const menu: Element = container.querySelector(".custom-dropdown-menu");
        expect(menu).toBeTruthy();
        expect(menu.classList.contains("show")).toBeTruthy();

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "arrowdown" }));
        });

        expect(options.item(0).classList.contains("highlighted")).toBeTruthy();
        expect(options.item(1).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(2).classList.contains("highlighted")).toBeFalsy();

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "arrowdown" }));
        });

        expect(options.item(0).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(1).classList.contains("highlighted")).toBeTruthy();
        expect(options.item(2).classList.contains("highlighted")).toBeFalsy();

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "arrowup" }));
        });

        expect(options.item(0).classList.contains("highlighted")).toBeTruthy();
        expect(options.item(1).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(2).classList.contains("highlighted")).toBeFalsy();

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "arrowup" }));
        });

        expect(options.item(0).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(1).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(2).classList.contains("highlighted")).toBeFalsy();

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "arrowup" }));
        });

        expect(options.item(0).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(1).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(2).classList.contains("highlighted")).toBeTruthy();

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "arrowdown" }));
        });

        expect(options.item(0).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(1).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(2).classList.contains("highlighted")).toBeFalsy();

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "arrowdown" }));
        });

        expect(options.item(0).classList.contains("highlighted")).toBeTruthy();
        expect(options.item(1).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(2).classList.contains("highlighted")).toBeFalsy();

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "enter" }));
        });

        expect(DEFAULT_PROPS.onChange).toHaveBeenCalledTimes(1);
        expect(DEFAULT_PROPS.onChange).toHaveBeenCalledWith(DEFAULT_PROPS.list[0]);
        expect(menu.classList.contains("show")).toBeFalsy();

        act(() => {
            toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(menu.classList.contains("show")).toBeTruthy();

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "escape" }));
        });

        expect(menu.classList.contains("show")).toBeFalsy();
    });

    it("Should navigate between options when keyboard up and down arrows are pressed in multi mode", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            multi: true
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const toggle: Element = container.querySelector(".custom-dropdown-toggle");
        expect(toggle).toBeTruthy();
        const options: NodeListOf<Element> = container.querySelectorAll(".custom-dropdown-item");
        expect(options.length).toBe(4);

        act(() => {
            toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        const menu: Element = container.querySelector(".custom-dropdown-menu");
        expect(menu).toBeTruthy();
        expect(menu.classList.contains("show")).toBeTruthy();

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "arrowdown" }));
        });

        expect(options.item(0).classList.contains("highlighted")).toBeTruthy();
        expect(options.item(0).classList.contains("select-all")).toBeTruthy();
        expect(options.item(1).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(2).classList.contains("highlighted")).toBeFalsy();
        expect(options.item(3).classList.contains("highlighted")).toBeFalsy();

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "enter" }));
        });

        expect(DEFAULT_PROPS.onChange).toHaveBeenCalledTimes(1);
        expect(DEFAULT_PROPS.onChange).toHaveBeenCalledWith(DEFAULT_PROPS.list);
        expect(menu.classList.contains("show")).toBeTruthy();
    });

    it("Should close and focus the next dom element when tab pressed", () => {
        act(() => {
            render(<Dropdown {...DEFAULT_PROPS} />, container);
        });

        const toggle: Element = container.querySelector(".custom-dropdown-toggle");
        expect(toggle).toBeTruthy();

        act(() => {
            toggle.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: " " }));
        });

        const menu: Element = container.querySelector(".custom-dropdown-menu");
        expect(menu).toBeTruthy();
        expect(menu.classList.contains("show")).toBeTruthy();

        expect(document.activeElement).toBe(menu);

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "a" }));
        });

        expect(menu.classList.contains("show")).toBeTruthy();

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "tab", shiftKey: true }));
        });

        expect(menu.classList.contains("show")).toBeFalsy();

        act(() => {
            toggle.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "tab" }));
        });

        act(() => {
            toggle.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "a" }));
        });

        act(() => {
            toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        act(() => {
            toggle.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        });

        act(() => {
            toggle.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "tab" }));
        });

        expect(menu.classList.contains("show")).toBeFalsy();
    });

    it("Should focus back on search if another items is highlighted and the user starts typing", () => {
        act(() => {
            render(<Dropdown {...DEFAULT_PROPS} searchable={true} />, container);
        });

        const toggle: Element = container.querySelector(".custom-dropdown-toggle");
        expect(toggle).toBeTruthy();

        act(() => {
            toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        const searchInput: Element = container.querySelector(".search-input");
        expect(searchInput).toBeTruthy();

        expect(document.activeElement).toBe(searchInput);

        const menu: Element = container.querySelector(".custom-dropdown-menu");
        expect(menu).toBeTruthy();
        expect(menu.classList.contains("show")).toBeTruthy();

        act(() => {
            menu.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "arrowdown" }));
        });

        const options: NodeListOf<Element> = container.querySelectorAll(".custom-dropdown-item:not(.search-input)");
        expect(options.length).toBe(3);
        expect(options.item(0).classList.contains("highlighted")).toBeTruthy();
        expect(document.activeElement).toBe(options.item(0));

        searchInput.setAttribute("value", "A");

        act(() => {
            searchInput.dispatchEvent(new Event("change", { bubbles: true }));
        });

        expect(document.activeElement).toBe(searchInput);
    });

    it("Should display clear button but make it not clickable if disabled and clearable are both set and at least one item is selected", () => {
        const props: DropdownProps = {
            ...DEFAULT_PROPS,
            clearable: true,
            disabled: true,
            selectedValue: { ...DEFAULT_PROPS.list[0] }
        };

        act(() => {
            render(<Dropdown {...props} />, container);
        });

        const clearButton: Element = container.querySelector(".right-items > .dropdown-icon-holder:not(.chevron");
        expect(clearButton).toBeTruthy();
        expect(clearButton.getAttribute("onclick")).toBeFalsy();
    });
});
