import * as React from "react";
import "./dropdown-style.scss";

// INFO: Hook to be used only for debugging! It should be deleted when component is finished!!
// function useWhyDidYouUpdate(name, props) {
//     // Get a mutable ref object where we can store props ...
//     // ... for comparison next time this hook runs.
//     const previousProps = React.useRef();

//     React.useEffect(() => {
//         const current = previousProps.current as any;
//         if (current) {
//             // Get all keys from previous and current props
//             const allKeys = Object.keys({ ...current, ...props });
//             // Use this object to keep track of changed props
//             const changesObj = {};
//             // Iterate through keys
//             allKeys.forEach((key) => {
//                 // If previous is different from current
//                 if (current[key] !== props[key]) {
//                     // Add to changesObj
//                     changesObj[key] = {
//                         from: current[key],
//                         to: props[key]
//                     };
//                 }
//             });

//             // If changesObj not empty then output to console
//             if (Object.keys(changesObj).length) {
//                 console.log("[why-did-you-update]", name, changesObj);
//             }
//         }

//         // Finally update previousProps with current props for next hook call
//         previousProps.current = props;
//     });
// }

export interface DropDownItem {
    value: any;
    label: string;
    selected: boolean;
}

interface UniqueDropDownItem {
    id: string;
    dropdownItem: DropDownItem;
}

interface DisplayDropDownItem extends UniqueDropDownItem {
    originalIndex?: number;
    className: string;
}

export interface DropDownProps {
    list: Array<DropDownItem>;
    onChange: (list: Array<DropDownItem>, name: string) => void;
    name?: string;
    className?: string;
    label?: string;
    placeholder?: string;
    searchable?: boolean;
    multi?: boolean;
    clearable?: boolean;
    disabled?: boolean;
    more?: boolean;
}

const chevronDownIcon: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z" /></svg>;
const timesIcon: JSX.Element = <svg id="dropdown-times-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z" /></svg>;
const moreIcon: JSX.Element = <svg id="dropdown-more-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M192 256c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm88-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-240 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z" /></svg>;
// helper function for updating object in array
function updateObjectInArray<T extends object>(array: Array<T>, index: number, item: T): Array<T> {
    return array.map((v, k) => {
        if (k !== index) {
            return v;
        }

        return { ...v, ...item };
    }) as Array<T>;
}

export const DropDown: React.FunctionComponent<DropDownProps> = (props: DropDownProps): React.ReactElement<void> => {
    const [open, setOpen] = React.useState(false);
    const [currentFocused, setCurrentFocused] = React.useState(-1);
    // const [selectedItems, setSelectedItems] = React.useState<Array<string>>([]);
    const [searchText, setSearchText] = React.useState("");
    const dropdownToggleRef = React.createRef<HTMLButtonElement>();
    const dropdownMenuRef = React.createRef<HTMLDivElement>();
    const searchRef = React.createRef<HTMLInputElement>();
    const uniqueList: Array<UniqueDropDownItem> = props.list.map((e, i) => {
        const id = e.value.replace(" ", "_") + `${i}`;
        return { dropdownItem: e, id };
    });
    const selectedList = uniqueList.filter((e) => e.dropdownItem.selected);
    const allSelected = selectedList.length === uniqueList.length;
    const shouldDisable = (props.disabled || !uniqueList.length);

    const displayList: Array<DisplayDropDownItem> = uniqueList.map((e, i) => {
        return {
            ...e,
            className: `dropdown-item custom-dropdown-item${props.multi ? " multi" : ""}${e.dropdownItem.selected ? " selected" : ""}`,
            originalIndex: i
        };
    }).filter((e) => e.dropdownItem.label.includes(searchText));

    if (props.multi && searchText.length === 0) {
        displayList.unshift(
            {
                id: "select-all",
                dropdownItem: {
                    value: "select-all",
                    label: "Select All",
                    selected: allSelected
                },
                className: `dropdown-item select-all custom-dropdown-item multi${(allSelected) ? " selected" : ""}`,
            }
        );
    }

    const listRefs = displayList.map(() => React.createRef<HTMLButtonElement>());

    // useWhyDidYouUpdate("DROPDOWN COMPONENT", {
    //     props,
    //     open,
    //     currentFocused,
    //     searchText,
    //     uniqueList
    // });

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

    // As soon as the menu opens focus the search text input
    React.useEffect(() => {
        if (open) {
            handleFocus();
        } else {
            if (currentFocused > -1) {
                setCurrentFocused(-1);
            }
        }
    }, [open]);

    React.useEffect(() => {
        if (open) {
            handleFocus();
        }
    }, [currentFocused]);

    const handleFocus = (): void => {
        const focusSuccess = focusCurrentItem();
        if (focusSuccess) {
            // console.log("focused on current item");
        } else {
            setInitialFocus();
        }
    };

    const focusCurrentItem = (): boolean => {
        if (listRefs[currentFocused] && listRefs[currentFocused].current) {
            listRefs[currentFocused].current.focus();
            return true;
        }
        return null;
    };

    const setInitialFocus = () => {
        if (props.multi && searchRef.current) {
            searchRef.current.focus();
        } else if (dropdownMenuRef.current) {
            dropdownMenuRef.current.focus();
        }
    };

    // The native event function that runs when a keyboard button is pressed on dropdown toggle
    const handleKeyDownToggle = (event: React.KeyboardEvent<any>): void => {
        const target = event.target as HTMLElement;
        // console.log("keyboard event of type: ", event.type, " with key: ", event.key, " and keyCode: ", event.keyCode, " happened on target: ", target);
        if (event.keyCode !== 9 && event.keyCode !== 16) { // NOT tab or shift + tab
            event.preventDefault();
        } else { // tab or shift + tab
            open && setOpen(false);
        }

        if (event.keyCode === 13 || event.keyCode === 32) { // enter or space
            !open && setOpen(true);
        }
    };

    // The native event function that runs when a keyboard button is pressed on dropdown menu
    const handleKeyDownMenu = (event: React.KeyboardEvent<any>): void => {
        const target = event.target as HTMLElement;
        console.log("keyboard event of type: ", event.type, " with key: ", event.key, " and keyCode: ", event.keyCode, " happened on target: ", target);

        if (open) {
            if (event.keyCode === 9 || event.keyCode === 16 || event.keyCode === 27) { // tab or shift + tab or escape
                setOpen(false);
            }
            if (event.keyCode === 13 || event.keyCode === 32) { // enter or space
                if ((target as HTMLButtonElement).classList.contains("dropdown-item")) {
                    event.preventDefault();
                    if ((target as HTMLButtonElement).classList.contains("select-all")) {
                        handleSelectAll();
                    } else {
                        dropdownItemSelected(displayList[currentFocused]);
                    }
                }
            }

            if (event.keyCode === 40) { // down
                event.preventDefault();
                if (currentFocused < (displayList.length - 1)) {
                    setCurrentFocused(currentFocused + 1);
                }
                if (currentFocused === (displayList.length - 1)) {
                    setCurrentFocused(-1);
                }
            }
            if (event.keyCode === 38) { // up
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
            }
        }
    };

    // The native event function that runs when the clean icon is clicked
    const handleClickClear = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
        event.preventDefault();

        handleClear();
    };

    // Function containing the clear button logic
    const handleClear = (): void => {
        console.log("Clear logic running ...");
        const newList = props.list.map((item) => {
            return { ...item, selected: false };
        });
        props.onChange(newList, props.name);
        setOpen(false);
    };

    // The native onchange event function that runs when the search input value changes
    const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (currentFocused !== -1) {
            setCurrentFocused(-1);
        }
        setSearchText(event.target.value);
    };

    // Function containing the select dropdown item logic
    const dropdownItemSelected = (item: DisplayDropDownItem): void => {
        const index = item.originalIndex;
        if (index === -1) {
            console.warn("Can't find selected item index in the dropdown list");
            return;
        }
        console.log("Dropdown selected ...", item, index);
        if (!props.multi) {
            const newItem = { ...item.dropdownItem, selected: props.clearable ? !item.dropdownItem.selected : true };
            const cleanList = props.list.map((el) => {
                return { ...el, selected: false };
            });
            const newList = updateObjectInArray(cleanList, index, newItem);
            props.onChange(newList, props.name);
            setOpen(false);
        } else {
            const newItem = { ...item.dropdownItem, selected: !item.dropdownItem.selected };
            const newList = updateObjectInArray(props.list, index, newItem);
            props.onChange(newList, props.name);
        }
    };

    // The native event function that runs when the dropdown button is clicked
    const handleClickToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        console.log("Toggle clicked ...");
        setOpen(!open);
    };

    // Function containing the select all button logic
    const handleSelectAll = (): void => {
        console.log("Select All logic running ...");
        const newList = props.list.map((item) => {
            return { ...item, selected: (allSelected) ? false : true };
        });
        props.onChange(newList, props.name);
    };

    // Returns the appropriate title for different situations and component types
    const getTitleLabel = () => {
        if (props.list && props.list.length === 0) {
            return "Empty";
        }
        if (selectedList.length > 0) {
            if (selectedList.length === props.list.length) {
                return `All selected (${selectedList.length})`;
            }
            if (props.multi) {
                if (selectedList.length === 1) {
                    return selectedList[0].dropdownItem.label;
                }
                return selectedList.length + " Selected"; // TODO should be like this example: 1st Item, 2nd Item... (+2)
            }
            return selectedList[0].dropdownItem.label;
        }

        return (props.placeholder && props.placeholder.length) ? props.placeholder : "Select ...";
    };

    return (
        <div className={`dropdown custom-dropdown${shouldDisable ? " disabled" : ""}${props.className ? " " + props.className : ""}`}>
            {props.label && <label className="dropdown-label">{props.label}</label>}

            <button
                onKeyDown={handleKeyDownToggle}
                disabled={shouldDisable}
                ref={dropdownToggleRef}
                className={`btn btn-secondary custom-dropdown-toggle${open ? " open" : ""}${props.more ? " more mx-right" : ""}`}
                type="button"
                id="dropdownMenuButton"
                name="dropdownMenuButton"
                onClick={handleClickToggle}
            >
                {!props.more ?
                    <>
                        <div className="title">
                            {getTitleLabel()}
                        </div>

                        <div className="right-items">
                            {((props.clearable || props.multi) && selectedList.length > 0) ?
                                <div id="clearButton" className="icon-holder" onClick={handleClickClear}>{timesIcon}</div>
                                : null}
                            <div className="icon-holder chevron">{chevronDownIcon}</div>
                        </div>
                    </> :
                    <div className="right-items"><div className="icon-holder">{moreIcon}</div></div>
                }
            </button>

            <div
                onKeyDown={handleKeyDownMenu}
                tabIndex={0}
                ref={dropdownMenuRef}
                className={`dropdown-menu custom-dropdown-menu${open ? " show" : ""}${props.more ? " dropdown-menu-right" : ""}`}
            >
                {props.searchable &&
                    <>
                        <input
                            ref={searchRef}
                            type="text"
                            className="search-input"
                            name="search-input"
                            placeholder="Search ..."
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
                                className={item.className}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentFocused(index);
                                    if (props.multi) {
                                        if (index === 0) {
                                            handleSelectAll();
                                        }
                                    }
                                    dropdownItemSelected(item);
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
                                            defaultChecked={item.dropdownItem.selected}
                                        />
                                        {item.dropdownItem.label && <label tabIndex={-1} className="custom-control-label" htmlFor={item.id}>{item.dropdownItem.label}</label>}
                                    </div>
                                    : item.dropdownItem.label && <div tabIndex={-1} className="label">{item.dropdownItem.label}</div>}
                            </button>
                            {(props.multi && index === 0) && <div className="dropdown-divider" />}
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
    );
};
