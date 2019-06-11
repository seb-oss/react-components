import * as React from "react";
import "./dropdown-style.scss";

export interface DropDownItem {
    value: any;
    label: string;
}

interface UniqueDropDownItem {
    id: string;
    dropdownItem: DropDownItem;
    selected: boolean;
}

interface DisplayDropDownItem extends UniqueDropDownItem {
    className: string;
}

export interface DropDownProps {
    /** a list of the currently selected dropdown item(s) */
    selectedValue: DropDownItem | Array<DropDownItem>;
    /** a list of all the dropdown items to display */
    list: Array<DropDownItem>;
    /** a callback function which will run everytime an item is selected or deselected. It contains the current element or list or element which are selected */
    onChange: (value: any) => void;
    /** optional name to be applied to the dropdown button button element. Default: "dropdownMenuButton" */
    name?: string;
    /** optional classname which will be appended to the list of classnames of the dropdown root element */
    className?: string;
    /** optional label to display above the dropdown */
    label?: string;
    /** optional text to display inside the toggle button when no item has been selected yet */
    placeholder?: string;
    /** optional error string to be displayed under the dropdown */
    error?: string;
    /** version of the dropdown with native `<select>` and `<option>` html elements which trigger the native dropdown on mobile phones */
    native?: boolean;
    /** display a search bar in the dropdown menu */
    searchable?: boolean;
    /** optional text to display inside the empty search bar. Default: "Search ..." */
    searchPlaceholder?: string;
    /** enable selecting more than one elements */
    multi?: boolean;
    /** should a clear(X) icon button appear on the menu when one or more items are selected */
    clearable?: boolean;
    /** disabled state of the component, default: `false` */
    disabled?: boolean;
    /** version of the dropdown with a "more" or "three dots" icon button as the menu trigger alligned to the right */
    more?: boolean;
}

const chevronDownIcon: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z" /></svg>;
const timesIcon: JSX.Element = <svg id="dropdown-times-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z" /></svg>;
const moreIcon: JSX.Element = <svg id="dropdown-more-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M192 256c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm88-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-240 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z" /></svg>;

export const DropDown: React.FunctionComponent<DropDownProps> = (props: DropDownProps): React.ReactElement<void> => {
    // COMPONENT INTERNAL STATE INIT ================================
    const [open, setOpen] = React.useState(false);
    const [shouldFocus, setShouldFocus] = React.useState(false);
    const [currentFocused, setCurrentFocused] = React.useState(-1);
    const [searchText, setSearchText] = React.useState("");

    // REFS ================================
    const dropdownToggleRef = React.createRef<HTMLDivElement>();
    const dropdownMenuRef = React.createRef<HTMLDivElement>();
    const searchRef = React.createRef<HTMLInputElement>();

    // EFFECTS ================================
    // Adding event listener to listen to clicks outside the component on mount, removing on unmount
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = (event) => {
        if ((dropdownToggleRef.current && !dropdownToggleRef.current.contains(event.target)) && (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target))) {
            setOpen(false);
        }
    };

    // As soon as the menu opens focus the search text input or the menu
    React.useEffect(() => {
        if (open) {
            handleFocus();
        } else {
            setSearchText("");
            if (currentFocused > -1) {
                setCurrentFocused(-1);
            }
        }
    }, [open]);

    React.useEffect(() => {
        if (open) {
            handleFocus();
        }
    }, [currentFocused, shouldFocus]);

    const handleFocus = (): void => {
        const focusSuccess = focusCurrentItem();
        if (!focusSuccess) {
            setInitialFocus();
        }
    };

    const focusCurrentItem = (): boolean => {
        if (shouldFocus && listRefs[currentFocused] && listRefs[currentFocused].current) {
            listRefs[currentFocused].current.focus();
            return true;
        }
        return null;
    };

    const setInitialFocus = () => {
        if (searchRef.current) {
            searchRef.current.focus();
        } else if (dropdownMenuRef.current) {
            dropdownMenuRef.current.focus();
        }
    };

    // EXTRA CONFIG ================================
    // Don't display anything if cannot evaluate the list
    const isListAnArray = Array.isArray(props.list);
    if (!props.list || !isListAnArray) {
        return null;
    }

    /** array of dropdown item elements with a unique id, the original dropdownItem and calculated selected property */
    const uniqueList: Array<UniqueDropDownItem> = props.list.filter((e) => (e && e.hasOwnProperty("value") && e.hasOwnProperty("label"))).map((e, i) => {
        const id = `${e.value}-${i}`;
        let selected = false;

        if (!props.multi) {
            if ((props.selectedValue as DropDownItem) && e.value === (props.selectedValue as DropDownItem).value) {
                selected = true;
            }
        } else {
            if ((props.selectedValue as Array<DropDownItem>) && (props.selectedValue as Array<DropDownItem>).find((el) => el.value === e.value)) {
                selected = true;
            }
        }
        return { dropdownItem: e, id, selected };
    });

    /** Array of dropdown item elements which should be displayed in the current render cycle */
    const displayList: Array<DisplayDropDownItem> = uniqueList.map((e, i) => {
        return {
            ...e,
            className: `dropdown-item custom-dropdown-item${props.multi ? " multi" : ""}${e.selected ? " selected" : ""}`,
        };
    }).filter((e) => e.dropdownItem.label.toLowerCase().includes(searchText.toLowerCase())); // filtering based on current search term

    // creating a list of only the currently selected items and a boolean which determines if all items are selected
    const selectedList: Array<DropDownItem> = uniqueList.filter((e) => e.selected).map((e) => e.dropdownItem);
    const allSelected = selectedList.length === uniqueList.length;

    // adding the select all row on top of the list for multi select option
    if (props.multi && searchText.length === 0) {
        displayList.unshift(
            {
                id: "select-all",
                dropdownItem: {
                    value: "select-all",
                    label: "Select All",
                },
                selected: allSelected,
                className: `dropdown-item select-all custom-dropdown-item multi${(allSelected) ? " selected" : ""}`,
            }
        );
    }

    // MISC ================================
    // show the component as disabled is disabled prop is true OR the list is empty
    const shouldDisable = (props.disabled || !uniqueList.length);
    /** list of refs for each element in the displayList array */
    const listRefs = displayList.map(() => React.createRef<HTMLButtonElement>());

    // NATIVE ONCLICK EVENTS ================================
    /** The native event function that runs when a keyboard button is pressed on dropdown toggle */
    const handleKeyDownToggle = (event: React.KeyboardEvent<any>): void => {
        const key = event.key.toLowerCase();

        switch (key) {
            case "tab":
                open && setOpen(false);
                break;
            case " ":
            case "enter":
                event.preventDefault();
                !open && setOpen(true);
                break;
            default:
                break;
        }
    };

    /** The native event function that runs when a keyboard button is pressed on dropdown menu */
    const handleKeyDownMenu = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (!shouldFocus) {
            setShouldFocus(true);
        }
        const key = event.key.toLowerCase();
        if (open) {
            switch (key) {
                case "tab":
                case "escape":
                    setOpen(false);
                    break;
                case "enter":
                    event.preventDefault();
                    if (props.multi && searchText.length === 0 && currentFocused === 0) {
                        handleSelectAll();
                    } else {
                        dropdownItemSelected(displayList[currentFocused].dropdownItem);
                    }
                    break;
                case "arrowdown":
                    event.preventDefault();
                    if (currentFocused < (displayList.length - 1)) {
                        setCurrentFocused(currentFocused + 1);
                    }
                    if (currentFocused === (displayList.length - 1)) {
                        setCurrentFocused(-1);
                    }
                    break;
                case "arrowup":
                    event.preventDefault();
                    if (currentFocused === -1) {
                        setCurrentFocused(displayList.length - 1);
                    }
                    if (currentFocused > 0) {
                        setCurrentFocused(currentFocused - 1);
                    }
                    if (currentFocused === 0) {
                        setCurrentFocused(-1);
                    }
                    break;

                default:
                    break;
            }
        }
    };

    /** The native event function that runs when the clean icon is clicked */
    const handleClickClear = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
        event.preventDefault();

        handleClear();
    };

    /** Function containing the clear button logic */
    const handleClear = (): void => {
        props.onChange(null);
        setOpen(false);
    };

    /** The native onchange event function that runs when the search input value changes */
    const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (currentFocused !== -1) {
            setCurrentFocused(-1);
        }
        setSearchText(event.target.value);
    };

    /** Function containing the select dropdown item logic */
    const dropdownItemSelected = (item: DropDownItem): void => {
        if (!props.multi) {
            const newItem = { ...item };
            props.onChange(newItem);
            setOpen(false);
        } else {
            const currentList = (props.selectedValue as Array<DropDownItem>) ? props.selectedValue as Array<DropDownItem> : [];
            const index = currentList.findIndex((e) => e.value === item.value);
            if (index === -1) {
                const newItem = { ...item };
                const newList = [...currentList, newItem];
                props.onChange(newList);
            } else {
                const newList = currentList.filter((e) => e.value !== item.value);
                props.onChange(newList);
            }
        }
    };

    /** The native event function that runs when the dropdown button is clicked */
    const handleClickToggle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        setOpen(!open);
    };

    /** Function containing the select all button logic */
    const handleSelectAll = (): void => {
        if (allSelected) {
            props.onChange([]);
        } else {
            props.onChange(props.list);
        }
    };

    // HELPERS ================================
    /** Returns the appropriate title for different situations and component types */
    const getTitleLabel = () => {
        if (uniqueList && uniqueList.length === 0) {
            return "Empty";
        }
        if (selectedList && selectedList.length > 0) {
            if (allSelected) {
                return `All selected (${selectedList.length})`;
            }
            if (props.multi) {
                if (selectedList.length === 1) {
                    return selectedList[0].label;
                }
                return selectedList.length + " Selected"; // TODO should be like this example: 1st Item, 2nd Item... (+2)
            }
            return (props.selectedValue as DropDownItem).label;
        }

        return (props.placeholder && props.placeholder.length) ? props.placeholder : "Select ...";
    };

    // Display the custom dropdown with native elements if prop is set to native
    if (!props.multi && props.native) {
        return (
            <>
                {props.label && <label className={`dropdown-label ${shouldDisable ? " disabled" : ""}`}>{props.label}</label>}
                <select
                    disabled={shouldDisable}
                    className={`form-control${shouldDisable ? " disabled" : ""}${props.className ? ` ${props.className}` : ""}`}
                    name={props.name}
                    value={props.selectedValue ? (props.selectedValue as DropDownItem).value : ""}
                    onChange={props.onChange}
                >
                    {props.list.map((item) =>
                        <option key={item.value} value={item.value} >
                            {item.label}
                        </option>
                    )}
                </select>
                {props.error && <div className="alert alert-danger">{props.error}</div>}
            </>
        );
    }

    return (
        <React.Fragment>
            <div className={`dropdown custom-dropdown${shouldDisable ? " disabled" : ""}${props.className ? " " + props.className : ""}`}>
                {props.label && <label className="dropdown-label">{props.label}</label>}

                <div
                    onKeyDown={shouldDisable ? null : handleKeyDownToggle}
                    ref={dropdownToggleRef}
                    className={`btn btn-secondary custom-dropdown-toggle${open ? " open" : ""}${props.more ? " more mx-right" : ""}${shouldDisable ? " disabled" : ""}`}
                    id="dropdownMenuButton"
                    aria-label={`Dropdown toggle: ${getTitleLabel()}`}
                    aria-haspopup={true}
                    aria-expanded={open}
                    tabIndex={shouldDisable ? -1 : 0}
                    onClick={shouldDisable ? null : handleClickToggle}
                >
                    {!props.more ?
                        <>
                            <div className="title">
                                {getTitleLabel()}
                            </div>

                            <div className="right-items">
                                {((props.clearable || props.multi) && selectedList.length > 0) ?
                                    <div id="clearButton" className="dropdown-icon-holder" onClick={shouldDisable ? null : handleClickClear}>{timesIcon}</div>
                                    : null}
                                <div className="dropdown-icon-holder chevron">{chevronDownIcon}</div>
                            </div>
                        </> :
                        <div className="right-items"><div className="dropdown-icon-holder">{moreIcon}</div></div>
                    }
                </div>

                <div
                    aria-labelledby="dropdownMenuButton"
                    onKeyDown={handleKeyDownMenu}
                    tabIndex={0}
                    ref={dropdownMenuRef}
                    className={`dropdown-menu custom-dropdown-menu${open ? " show" : ""}${props.more ? " dropdown-menu-right" : ""}`}
                >
                    {props.searchable &&
                        <>
                            <input
                                ref={searchRef}
                                type="search"
                                className="search-input"
                                name="search-input"
                                placeholder={props.searchPlaceholder || "Search ..."}
                                value={searchText}
                                onChange={handleOnChangeSearch}
                            />
                            <div className="dropdown-divider blue" />
                        </>
                    }

                    {displayList.map((item, index) => {
                        return (
                            <React.Fragment key={item.id}>
                                <button
                                    tabIndex={0}
                                    ref={listRefs[index]}
                                    className={`${item.className}${(currentFocused === index) ? " highlighted" : ""}`}
                                    onMouseMove={(e) => {
                                        if (currentFocused !== index) {
                                            setCurrentFocused(index);
                                        }
                                        if (shouldFocus === true) {
                                            setShouldFocus(false);
                                        }
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (shouldFocus === false) {
                                            setShouldFocus(true);
                                        }
                                        if (props.multi && searchText.length === 0 && index === 0) {
                                            handleSelectAll();
                                        } else {
                                            dropdownItemSelected(item.dropdownItem);
                                        }
                                    }}
                                >
                                    {props.multi ?
                                        <div tabIndex={-1} className="custom-control">
                                            <input
                                                tabIndex={-1}
                                                type="checkbox"
                                                className="custom-control-input"
                                                id={item.id}
                                                name={item.id}
                                                defaultChecked={item.selected}
                                            />
                                            {item.dropdownItem.label && <label tabIndex={-1} className="custom-control-label" htmlFor={item.id}>{item.dropdownItem.label}</label>}
                                        </div>
                                        : item.dropdownItem.label && <div tabIndex={-1} className="label">{item.dropdownItem.label}</div>}
                                </button>
                                {(props.multi && searchText.length === 0 && index === 0) && <div className="dropdown-divider" />}
                            </React.Fragment>
                        );
                    })}

                    {displayList.length === 0 &&
                        <a className={`dropdown-item custom-dropdown-item disabled`}>
                            <div className="label">No results</div>
                        </a>
                    }
                </div>
            </div>
            {props.error && <div className="alert alert-danger">{props.error}</div>}
        </React.Fragment>
    );
};
