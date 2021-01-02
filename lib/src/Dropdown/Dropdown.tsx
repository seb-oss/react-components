import React from "react";
import { randomId } from "@sebgroup/frontend-tools";
import "./dropdown-style.scss";
import classnames from "classnames";

export type DropdownValue = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>["value"];

export interface DropdownItem {
    value: string;
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

export interface DropdownPlaceholders {
    searchText?: string;
    selectAllOptionText?: string;
    selectAllText?: string;
    emptyText?: string;
    noResultText?: string;
}

interface OverriddenNativeProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    onChange?: any;
}

export interface DropdownProps extends OverriddenNativeProps {
    onChange?: (value: DropdownValue) => void;
    className?: string;
    clearable?: boolean;
    disabled?: boolean;
    error?: string;
    label?: string;
    list: Array<DropdownItem>;
    more?: boolean;
    /** @deprecated use `multiple` instead */
    multi?: boolean;
    /** @deprecated use `value` instead @type DropdownValue */
    selectedValue?: DropdownItem | DropdownItem[];
    /** @deprecated The component will automatically switch to native for mobile devices */
    native?: boolean;
    placeholder?: string;
    searchable?: boolean;
    placeholders?: DropdownPlaceholders;
    /** @deprecated use placedholdersConfig.searchText instead */
    searchPlaceholder?: string;
    /** Div wrapper props. */
    wrapperProps?: JSX.IntrinsicElements["div"];
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

export const Dropdown: React.FC<DropdownProps> = ({
    clearable,
    disabled,
    error,
    label,
    list,
    more,
    multiple,
    onChange,
    placeholder,
    searchable,
    placeholders,
    searchPlaceholder,
    value,
    wrapperProps,
    ...props
}: DropdownProps) => {
    const selectedDisplayLength: number = 2;
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

    const isMobile = (): boolean => {
        if (typeof window !== "undefined" && !!window["navigator"] && !!window.navigator["userAgent"]) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window?.navigator?.userAgent) || false;
        } else {
            return false;
        }
    };

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
        setId(randomId(`dd-${props.id ? props.id : ""}`));
    }, [props.id]);

    React.useEffect(() => {
        if (value) {
            if (multiple && !Array.isArray(value)) {
                const val: string = value as string;
                onChange && onChange(val ? [val] : "");
            } else if (!multiple && Array.isArray(value) && value.length) {
                onChange && onChange(value[0]);
            }
        }
    }, [multiple, value]);

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
    const isListAnArray: boolean = Array.isArray(list);
    if (!list || !isListAnArray) {
        console.warn("Failed to load the dropdown component. Invalid list provided.", list);
        return null;
    }

    /** array of dropdown item elements with a unique id, the original dropdownItem and calculated selected property */
    const uniqueList: Array<UniqueDropdownItem> = list
        .filter((e: DropdownItem) => e && e.hasOwnProperty("value") && e.hasOwnProperty("label"))
        .map((e: DropdownItem, i: number) => {
            const uniqueListId: string = `${e.value}-${i}`;
            let selected: boolean = false;

            if (!multiple) {
                if (value !== undefined && e.value === value) {
                    selected = true;
                }
            } else {
                if (value !== undefined && Array.isArray(value) && (value as string[])?.find((el: any) => el === e.value)) {
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
                className: `dropdown-item custom-dropdown-item${multiple ? " multi" : ""}${e.selected ? " selected" : ""}`,
            };
        })
        .filter((e: UniqueDropdownItem) => e.dropdownItem.label.toLowerCase().includes(searchText.toLowerCase())); // filtering based on current search term

    // creating a list of only the currently selected items and a boolean which determines if all items are selected
    const selectedList: Array<DropdownItem> = uniqueList.filter((e: UniqueDropdownItem) => e.selected).map((e: UniqueDropdownItem) => e.dropdownItem);
    const allSelected: boolean = selectedList.length === uniqueList.length;

    // adding the select all row on top of the list for multi select option
    if (multiple && list.length > 1 && searchText.length === 0) {
        displayList.unshift({
            id: "select-all",
            dropdownItem: {
                value: "select-all",
                label: placeholders?.selectAllOptionText || "Select All",
            },
            selected: allSelected,
            className: `dropdown-item select-all custom-dropdown-item multi${allSelected ? " selected" : ""}`,
        });
    }

    // MISC ================================
    // show the component as disabled is disabled prop is true OR the list is empty
    const shouldDisable: boolean = disabled || !uniqueList.length;
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
                        if (multiple && searchText.length === 0 && currentFocused === 0) {
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
        onChange && onChange("");
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
        if (!multiple) {
            const newItem: DropdownItem = { ...item };
            onChange && onChange(newItem.value);
            setOpen(false);
        } else {
            const index: number = selectedList.findIndex((e: DropdownItem) => e.value === item.value);
            let newList: any[] = [];
            if (index === -1) {
                newList = [...((value as readonly string[]) || []), item.value];
            } else {
                newList = (value as readonly string[])?.filter((v: any) => v !== item.value) || [];
            }
            onChange && onChange([...newList]);
        }
    };

    /** The native event function that runs when the dropdown button is clicked */
    const handleClickToggle = (): void => {
        setOpen(!open);
    };

    /** Function containing the select all button logic */
    const handleSelectAll = (): void => {
        if (allSelected) {
            onChange && onChange([]);
        } else {
            onChange && onChange(list.map((e: DropdownItem) => e.value as string));
        }
    };

    // HELPERS ================================
    /** Returns the appropriate title for different situations and component types */
    const getTitleLabel = (): string => {
        if (uniqueList && uniqueList.length === 0) {
            return placeholders?.emptyText || "Empty";
        }
        if (selectedList && selectedList.length > 0) {
            if (multiple) {
                if (allSelected) {
                    return placeholders?.selectAllText || `All selected (${selectedList.length})`;
                }
                if (selectedList.length === 1) {
                    return selectedList[0].label;
                }
                const displayText: string = selectedList
                    .slice(0, selectedDisplayLength)
                    .map(({ label }: DropdownItem) => label)
                    .join(", ");
                return `${displayText}${selectedList.length > selectedDisplayLength ? `... (+${selectedList.slice(selectedDisplayLength).length})` : ""}`;
            }
            return value !== undefined ? list.filter((e: DropdownItem) => e.value === value)[0]?.label : null;
        }

        return placeholder && placeholder.length ? placeholder : "Select ...";
    };

    return (
        <div {...wrapperProps} className={classnames("dropdown custom-dropdown", { disabled: shouldDisable }, { "has-error": error }, wrapperProps?.className)}>
            {label && <label className={classnames("dropdown-label", { disabled: shouldDisable })}>{label}</label>}

            {isMobile() && (
                <select
                    {...props}
                    value={value || ""}
                    multiple={multiple}
                    disabled={shouldDisable}
                    className={classnames(`form-control custom-select custom-native-dropdown`, { disabled: shouldDisable }, props?.className)}
                    id={id}
                    onChange={(e) => {
                        onChange && onChange(multiple ? Array.from(e.target.selectedOptions, (option) => option.value) : e.target.value);
                    }}
                >
                    {list.map((item: DropdownItem, i: number) => (
                        <option key={i} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            )}

            {!isMobile() && (
                <div
                    onKeyDown={shouldDisable ? null : handleKeyDownToggle}
                    ref={dropdownToggleRef}
                    className={classnames(`btn btn-secondary custom-dropdown-toggle`, { open }, { more }, { "mx-right": more }, { disabled: shouldDisable }, props?.className)}
                    id={id}
                    aria-label={`Dropdown toggle: ${getTitleLabel()}`}
                    aria-haspopup={true}
                    aria-expanded={open}
                    tabIndex={shouldDisable ? -1 : 0}
                    onClick={shouldDisable ? null : handleClickToggle}
                >
                    {!more ? (
                        <>
                            <div className="title">{getTitleLabel()}</div>

                            <div className="right-items">
                                {(clearable || multiple) && selectedList.length > 0 ? (
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
            )}

            {!isMobile() && (
                <div
                    aria-labelledby={id}
                    onKeyDown={handleKeyDownMenu}
                    tabIndex={0}
                    ref={dropdownMenuRef}
                    className={`dropdown-menu custom-dropdown-menu${open ? " show" : ""}${more ? " dropdown-menu-right" : ""}`}
                >
                    {searchable && (
                        <>
                            <input
                                ref={searchRef}
                                type="search"
                                className="search-input"
                                name="search-input"
                                placeholder={placeholders?.searchText || "Search ..."}
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
                                    type="button"
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
                                        if (multiple && searchText.length === 0 && index === 0) {
                                            handleSelectAll();
                                        } else {
                                            dropdownItemSelected(item.dropdownItem);
                                        }
                                    }}
                                >
                                    {multiple ? (
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
                                {multiple && searchText.length === 0 && index === 0 && <div className="dropdown-divider" />}
                            </React.Fragment>
                        );
                    })}

                    {displayList.length === 0 && (
                        <a className={`dropdown-item custom-dropdown-item disabled`}>
                            <div className="label">{placeholders?.noResultText || "No results"}</div>
                        </a>
                    )}
                </div>
            )}
            {error && <div className="alert alert-danger custom-alert">{error}</div>}
        </div>
    );
};
