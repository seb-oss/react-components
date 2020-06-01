import React from "react";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import "./dropdown-style.scss";

export interface DropdownItem<T = any> {
    value: T;
    label: string;
}

interface UniqueDropdownItem {
    id: string;
    dropdownItem: DropdownItem;
    selected: boolean;
}

interface DisplayDropdownItem extends UniqueDropdownItem {
    className: string;
}

export type DropdownChangeEvent = DropdownItem | Array<DropdownItem> | React.ChangeEvent<HTMLSelectElement>;

export interface DropdownProps {
    className?: string;
    clearable?: boolean;
    disabled?: boolean;
    error?: string;
    id?: string;
    label?: string;
    list: Array<DropdownItem>;
    more?: boolean;
    multi?: boolean;
    name?: string;
    native?: boolean;
    onChange: (event: DropdownChangeEvent) => void;
    placeholder?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
    selectedValue: DropdownItem | Array<DropdownItem>;
}

const chevronDownIcon: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z" />
    </svg>
);
const timesIcon: JSX.Element = (
    <svg className="dropdown-times-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z" />
    </svg>
);
const moreIcon: JSX.Element = (
    <svg className="dropdown-more-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M192 256c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm88-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-240 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z" />
    </svg>
);

const Dropdown: React.FunctionComponent<DropdownProps> = (props: DropdownProps): React.ReactElement<void> => {
    // COMPONENT INTERNAL STATE INIT ================================
    const [open, setOpen] = React.useState<boolean>(false);
    const [shouldFocus, setShouldFocus] = React.useState<boolean>(false);
    const [currentFocused, setCurrentFocused] = React.useState<number>(-1);
    const [searchText, setSearchText] = React.useState<string>("");
    const [id, setId] = React.useState<string>("");

    // REFS ================================
    const dropdownToggleRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const dropdownMenuRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const searchRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    // EFFECTS ================================
    // Adding event listener to listen to clicks outside the component on mount, removing on unmount
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = (event): void => {
        if (dropdownToggleRef.current && !dropdownToggleRef.current.contains(event.target) && dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    // As soon as the menu opens focus the search text input or the menu
    React.useEffect((): void => {
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

    React.useEffect(() => {
        setId(randomId("dd-"));
    }, []);

    const handleFocus = (): void => {
        const focusSuccess: boolean = focusCurrentItem();
        if (!focusSuccess) {
            setInitialFocus();
        }
    };

    const focusCurrentItem = (): boolean => {
        if (shouldFocus && listRefs[currentFocused] && listRefs[currentFocused].current) {
            listRefs[currentFocused].current.focus();
            return true;
        }
        return false;
    };

    const setInitialFocus = (): void => {
        if (searchRef.current) {
            searchRef.current.focus();
        } else if (dropdownMenuRef.current) {
            dropdownMenuRef.current.focus();
        }
    };

    // EXTRA CONFIG ================================
    // Don't display anything if cannot evaluate the list
    const isListAnArray: boolean = Array.isArray(props.list);
    if (!props.list || !isListAnArray) {
        console.warn("Failed to load the dropdown component. Invalid list provided.", props.list);
        return null;
    }

    /** array of dropdown item elements with a unique id, the original dropdownItem and calculated selected property */
    const uniqueList: Array<UniqueDropdownItem> = props.list
        .filter((e: DropdownItem) => e && e.hasOwnProperty("value") && e.hasOwnProperty("label"))
        .map((e: DropdownItem, i: number) => {
            const uniqueListId: string = `${e.value}-${i}`;
            let selected: boolean = false;

            if (!props.multi) {
                if ((props.selectedValue as DropdownItem) && e.value === (props.selectedValue as DropdownItem).value) {
                    selected = true;
                }
            } else {
                if ((props.selectedValue as Array<DropdownItem>) && (props.selectedValue as Array<DropdownItem>).find((el: DropdownItem) => el.value === e.value)) {
                    selected = true;
                }
            }
            return { dropdownItem: e, id: uniqueListId, selected };
        });

    /** Array of dropdown item elements which should be displayed in the current render cycle */
    const displayList: Array<DisplayDropdownItem> = uniqueList
        .map((e: UniqueDropdownItem) => {
            return {
                ...e,
                className: `dropdown-item custom-dropdown-item${props.multi ? " multi" : ""}${e.selected ? " selected" : ""}`,
            };
        })
        .filter((e: UniqueDropdownItem) => e.dropdownItem.label.toLowerCase().includes(searchText.toLowerCase())); // filtering based on current search term

    // creating a list of only the currently selected items and a boolean which determines if all items are selected
    const selectedList: Array<DropdownItem> = uniqueList.filter((e: UniqueDropdownItem) => e.selected).map((e: UniqueDropdownItem) => e.dropdownItem);
    const allSelected: boolean = selectedList.length === uniqueList.length;

    // adding the select all row on top of the list for multi select option
    if (props.multi && searchText.length === 0) {
        displayList.unshift({
            id: "select-all",
            dropdownItem: {
                value: "select-all",
                label: "Select All",
            },
            selected: allSelected,
            className: `dropdown-item select-all custom-dropdown-item multi${allSelected ? " selected" : ""}`,
        });
    }

    // MISC ================================
    // show the component as disabled is disabled prop is true OR the list is empty
    const shouldDisable: boolean = props.disabled || !uniqueList.length;
    /** list of refs for each element in the displayList array */
    const listRefs: Array<React.RefObject<HTMLButtonElement>> = displayList.map(() => React.createRef<HTMLButtonElement>());

    // NATIVE ONCLICK EVENTS ================================
    /** The native event function that runs when a keyboard button is pressed on dropdown toggle */
    const handleKeyDownToggle = (event: React.KeyboardEvent<any>): void => {
        const key: string = event.key.toLowerCase();

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
        const key: string = event.key.toLowerCase();
        if (open) {
            switch (key) {
                case "tab":
                case "escape":
                    setOpen(false);
                    break;
                case "enter":
                    event.preventDefault();
                    if (currentFocused !== -1) {
                        if (props.multi && searchText.length === 0 && currentFocused === 0) {
                            handleSelectAll();
                        } else {
                            dropdownItemSelected(displayList[currentFocused].dropdownItem);
                        }
                    }
                    break;
                case "arrowdown":
                    event.preventDefault();
                    if (currentFocused < displayList.length - 1) {
                        setCurrentFocused(currentFocused + 1);
                    }
                    if (currentFocused === displayList.length - 1) {
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
    const dropdownItemSelected = (item: DropdownItem): void => {
        if (!props.multi) {
            const newItem: DropdownItem = { ...item };
            props.onChange(newItem);
            setOpen(false);
        } else {
            const currentList: Array<DropdownItem> = (props.selectedValue as Array<DropdownItem>) ? (props.selectedValue as Array<DropdownItem>) : [];
            const index: number = currentList.findIndex((e: DropdownItem) => e.value === item.value);
            if (index === -1) {
                const newItem: DropdownItem = { ...item };
                const newList: Array<DropdownItem> = [...currentList, newItem];
                props.onChange(newList);
            } else {
                const newList: Array<DropdownItem> = currentList.filter((e: DropdownItem) => e.value !== item.value);
                props.onChange(newList);
            }
        }
    };

    /** The native event function that runs when the dropdown button is clicked */
    const handleClickToggle = (): void => {
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
            return (props.selectedValue as DropdownItem).label;
        }

        return props.placeholder && props.placeholder.length ? props.placeholder : "Select ...";
    };

    // Display the custom dropdown with native elements if prop is set to native
    if (props.native) {
        return (
            <div className={`custom-native-dropdown` + (props.error ? " has-error" : "")}>
                {props.label && <label className={`dropdown-label ${shouldDisable ? " disabled" : ""}`}>{props.label}</label>}
                <select
                    disabled={shouldDisable}
                    className={`form-control custom-select custom-native-dropdown${shouldDisable ? " disabled" : ""}${props.className ? ` ${props.className}` : ""}`}
                    name={props.name}
                    value={props.selectedValue ? (props.selectedValue as DropdownItem).value : ""}
                    onChange={props.onChange}
                    id={props.id}
                    placeholder={props.placeholder || null}
                    multiple={!!props.multi}
                >
                    {props.list.map((item: DropdownItem) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                {props.error && <div className="alert alert-danger custom-alert">{props.error}</div>}
            </div>
        );
    }

    return (
        <div className={`dropdown custom-dropdown${shouldDisable ? " disabled" : ""}${props.error ? " has-error" : ""}${props.className ? " " + props.className : ""}`} id={props.id}>
            {props.label && <label className="dropdown-label">{props.label}</label>}

            <div
                onKeyDown={shouldDisable ? null : handleKeyDownToggle}
                ref={dropdownToggleRef}
                className={`btn btn-secondary custom-dropdown-toggle${open ? " open" : ""}${props.more ? " more mx-right" : ""}${shouldDisable ? " disabled" : ""}`}
                id={id}
                aria-label={`Dropdown toggle: ${getTitleLabel()}`}
                aria-haspopup={true}
                aria-expanded={open}
                tabIndex={shouldDisable ? -1 : 0}
                onClick={shouldDisable ? null : handleClickToggle}
            >
                {!props.more ? (
                    <>
                        <div className="title">{getTitleLabel()}</div>

                        <div className="right-items">
                            {(props.clearable || props.multi) && selectedList.length > 0 ? (
                                <div className="dropdown-icon-holder" onClick={shouldDisable ? null : handleClickClear}>
                                    {timesIcon}
                                </div>
                            ) : null}
                            <div className="dropdown-icon-holder chevron">{chevronDownIcon}</div>
                        </div>
                    </>
                ) : (
                    <div className="right-items">
                        <div className="dropdown-icon-holder">{moreIcon}</div>
                    </div>
                )}
            </div>

            <div
                aria-labelledby={id}
                onKeyDown={handleKeyDownMenu}
                tabIndex={0}
                ref={dropdownMenuRef}
                className={`dropdown-menu custom-dropdown-menu${open ? " show" : ""}${props.more ? " dropdown-menu-right" : ""}`}
            >
                {props.searchable && (
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
                )}

                {displayList.map((item: DisplayDropdownItem, index: number) => {
                    return (
                        <React.Fragment key={item.id}>
                            <button
                                tabIndex={0}
                                ref={listRefs[index]}
                                className={`${item.className}${currentFocused === index ? " highlighted" : ""}`}
                                onMouseMove={() => {
                                    if (currentFocused !== index) {
                                        setCurrentFocused(index);
                                    }
                                    if (shouldFocus === true) {
                                        setShouldFocus(false);
                                    }
                                }}
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
                                {props.multi ? (
                                    <div tabIndex={-1} className="custom-control">
                                        <input tabIndex={-1} type="checkbox" className="custom-control-input" id={item.id} name={item.id} defaultChecked={item.selected} />
                                        {item.dropdownItem.label && (
                                            <label tabIndex={-1} className="custom-control-label" htmlFor={item.id}>
                                                {item.dropdownItem.label}
                                            </label>
                                        )}
                                    </div>
                                ) : (
                                    item.dropdownItem.label && (
                                        <div tabIndex={-1} className="label">
                                            {item.dropdownItem.label}
                                        </div>
                                    )
                                )}
                            </button>
                            {props.multi && searchText.length === 0 && index === 0 && <div className="dropdown-divider" />}
                        </React.Fragment>
                    );
                })}

                {displayList.length === 0 && (
                    <a className={`dropdown-item custom-dropdown-item disabled`}>
                        <div className="label">No results</div>
                    </a>
                )}
            </div>
            {props.error && <div className="alert alert-danger custom-alert">{props.error}</div>}
        </div>
    );
};

export { Dropdown };
