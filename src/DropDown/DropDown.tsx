import * as React from "react";
import "./dropdown-style.scss";

export interface DropDownItem {
    value: any;
    label: string;
    selected: boolean;
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
    const [currentFocused, setCurrentFocused] = React.useState(0);
    const [searchText, setSearchText] = React.useState("");
    const dropdownToggleRef = React.createRef<HTMLButtonElement>();
    const dropdownMenuRef = React.createRef<HTMLDivElement>();
    const searchRef = React.createRef<HTMLInputElement>();
    const selectedList = props.list.filter((e) => e.selected);
    const displayList = props.list.filter((e) => e.label.includes(searchText));
    const allSelected = selectedList.length === props.list.length;
    const shouldDisable = (props.disabled || !props.list.length);

    const listRefs = props.list.map(() => React.createRef<HTMLButtonElement>());

    // Adding event listener to listen to clicks outside the component on mount, removing on unmount
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        // document.addEventListener("keyup", (event) => console.log(event));
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
            if (props.multi && searchRef.current) {
                searchRef.current.focus();
            } else {
                focusCurrentItem();
            }
        }
        (currentFocused > 0) && setCurrentFocused(0);
    }, [open]);

    React.useEffect(() => {
        if (open) {
            focusCurrentItem();
        }
    }, [currentFocused]);

    const focusCurrentItem = () => {
        if (listRefs[currentFocused] && listRefs[currentFocused].current) {
            listRefs[currentFocused].current.focus();
        }
    };

    // The native event function that runs when a keyboard button is pressed
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        const target = event.target as HTMLDivElement;
        console.log("keyboard event of type: ", event.type, " with key: ", event.key, " and keyCode: ", event.keyCode, " happened on target: ", target);
        if (event.keyCode !== 9 && event.keyCode !== 16) { // NOT tab or shift + tab
            event.preventDefault();
            console.log("prevented default");
        } else { // tab or shift + tab
            open && setOpen(false);
        }

        if (open) {
            // console.log("currentFocused: ", currentFocused);
            if (event.keyCode === 40) { // down
                if (currentFocused < (props.list.length - 1)) {
                    setCurrentFocused(currentFocused + 1);
                }
            }
            if (event.keyCode === 38) { // doupwn
                if (currentFocused > 0) {
                    setCurrentFocused(currentFocused - 1);
                }
            }
            if (event.keyCode === 13 || event.keyCode === 32) { // enter or space
                dropdownRowSelected(props.list[currentFocused], currentFocused);
            }
            if (event.keyCode === 27) { // ecsape
                setOpen(false);
            }
        }

        // Only check for following targets
        switch (target.id) {
            case "clearButton":
                if (event.keyCode === 13 || event.keyCode === 32) { // enter or space
                    handleClear();
                }
                break;
            case "dropdownMenuButton":
                if (event.keyCode === 32) { // space
                    !open && setOpen(true);
                }
                break;
            default:
                break;
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
        !props.multi && setOpen(false);
    };

    // The native event function that runs when the select all item is clicked
    const handleClickSelectAll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        event.preventDefault();

        handleSelectAll();
    };

    // Function containing the select all button logic
    const handleSelectAll = (): void => {
        console.log("Select All logic running ...");
        const newList = props.list.map((item) => {
            return { ...item, selected: (allSelected) ? false : true };
        });
        props.onChange(newList, props.name);
    };

    // Function containing the select dropdown item logic
    const dropdownRowSelected = (item: DropDownItem, index: number): void => {
        console.log("Dropdown selected ...");
        if (!props.multi) {
            const newItem = { ...item, selected: props.clearable ? !item.selected : true };
            const cleanList = props.list.map((el) => {
                return { ...el, selected: false };
            });
            const newList = updateObjectInArray(cleanList, index, newItem);
            props.onChange(newList, props.name);
            setOpen(false);
        } else {
            const newItem = { ...item, selected: !item.selected };
            const newList = updateObjectInArray(props.list, index, newItem);
            props.onChange(newList, props.name);
        }
    };

    // The native event function that runs when the dropdown button is clicked
    const handleClickToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        console.log("Toggle clicked ...");
        setOpen(!open);
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
                    return selectedList[0].label;
                }
                return selectedList.length + " Selected"; // TODO should be like this example: 1st Item, 2nd Item... (+2)
            }
            return selectedList[0].label;
        }

        return (props.placeholder && props.placeholder.length) ? props.placeholder : "Select ...";
    };

    return (
        <div onKeyDown={handleKeyDown} className={`dropdown custom-dropdown${shouldDisable ? " disabled" : ""}${props.className ? " " + props.className : ""}`}>
            {props.label && <label className="dropdown-label">{props.label}</label>}

            <button
                disabled={shouldDisable}
                ref={dropdownToggleRef}
                className={`btn btn-secondary custom-dropdown-toggle${open ? " open" : ""}${props.more ? " more mx-right" : ""}`}
                type="button"
                id="dropdownMenuButton"
                onClick={handleClickToggle}
            >
                {!props.more ?
                    <>
                        <div className="title">
                            {getTitleLabel()}
                        </div>

                        <div className="right-items">
                            {((props.clearable || props.multi) && selectedList.length > 0) ?
                                <div id="clearButton" className="icon-holder" tabIndex={0} onClick={handleClickClear}>{timesIcon}</div>
                                : null}
                            <div className="icon-holder chevron">{chevronDownIcon}</div>
                        </div>
                    </> :
                    <div className="right-items"><div className="icon-holder">{moreIcon}</div></div>
                }
            </button>

            <div
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
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <div className="dropdown-divider blue" />
                    </>
                }

                {(props.multi && searchText.length === 0) &&
                    <>
                        <a
                            key={"select-all-anchor"}
                            className={`dropdown-item custom-dropdown-item multi${(allSelected) ? " selected" : ""}`}
                            href=""
                            onClick={handleClickSelectAll}
                        >
                            <div tabIndex={-1} className="custom-control">
                                <input
                                    tabIndex={-1}
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={"select-all"}
                                    name={"select-all"}
                                    defaultChecked={allSelected}
                                />
                                <label tabIndex={-1} className="custom-control-label" htmlFor={"select-all"}>Select All</label>
                            </div>
                        </a>
                        <div className="dropdown-divider" />
                    </>
                }

                {props.list.map((item, index) => {
                    if (displayList.includes(item)) {
                        // const uid = item.value.replace(" ", "_") + "-" + Math.floor(Math.random() * 10000) + (new Date()).getTime();
                        const uid = `${index}_${item.value}`;
                        return (
                            <button
                                tabIndex={0}
                                key={uid}
                                ref={listRefs[index]}
                                className={`dropdown-item custom-dropdown-item${item.selected ? " selected" : ""}${props.multi ? " multi" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    dropdownRowSelected(item, index);
                                }}
                            >
                                {props.multi ?
                                    <div tabIndex={-1} className="custom-control">
                                        <input
                                            tabIndex={-1}
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={uid}
                                            name={uid}
                                            defaultChecked={item.selected}
                                        />
                                        {item.label && <label tabIndex={-1} className="custom-control-label" htmlFor={uid}>{item.label}</label>}
                                    </div>
                                    : item.label && <div tabIndex={-1} className="label">{item.label}</div>}
                            </button>
                        );
                    }
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
