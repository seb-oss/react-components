import { randomId } from "@sebgroup/frontend-tools/randomId";
import classnames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import { CloseButton } from "../CloseButton";
import { FeedbackIndicator, Indicator } from "../FeedbackIndicator/FeedbackIndicator";
import { Key } from "../utils/keyboardHelper";
import { CustomDropdownItem } from "./CustomDropdownItem";
import "./dropdown.scss";

export interface DropdownText {
    selectAll?: string;
    noResult?: string;
    emptyList?: string;
    search?: string;
}

const defaultText: Required<DropdownText> = {
    selectAll: "Select all",
    emptyList: "List is empty",
    noResult: "No result",
    search: "Search...",
};

export function getValueOfMultipleSelect(selectOptions: Array<HTMLOptionElement>): string[] {
    return Array.from(selectOptions)
        .filter((option) => option.selected)
        .map((option) => option.value);
}

// This solution is meant to fix Gatsby build which complains that document and window doesn't exist in server-side rendering
const safeDocument: Document | null = typeof document !== "undefined" ? document : null;
const safeWindow: Window | null = typeof window !== "undefined" ? window : null;

export type DropdownProps = Omit<JSX.IntrinsicElements["select"], "value"> & {
    /** Props for the select's wrapper (div) */
    wrapperProps?: JSX.IntrinsicElements["div"];
    /** The value of the dropdown */
    value?: string | string[];
    /** An event triggered when a select of type multiple is changed returning an array of the selected values */
    onMultipleChange?: (selected: string[]) => void;
    /** Allows searching throw the dropdown */
    searchable?: boolean;
    /** Allows clearing the dropdown with a clear button */
    clearable?: boolean;
    /** Allows setting custom label to be displayed for selected item */
    selectedLabel?: string | ((value: string | string[]) => string | string[]);
    /** Custom texts to be dispalyed in different parts of the dropdown */
    text?: DropdownText;
    /** Indicator for error, warning or success */
    indicator?: Indicator;
};

export const Dropdown: React.FC<DropdownProps> = React.forwardRef(
    ({ wrapperProps = {}, text = {}, onMultipleChange, searchable, clearable, selectedLabel, indicator, ...props }: DropdownProps, ref) => {
        const [toggleId] = React.useState<string>(randomId("ddt-"));
        const [selectAllId] = React.useState<string>(randomId("sa-"));
        const [show, setShow] = React.useState<boolean>(false);
        const [allSelected, setAllSelected] = React.useState<boolean>(false);
        const [searchKeyword, setSearchKeyword] = React.useState<string>("");
        const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({});
        const [label, setLabel] = React.useState<string>();
        const [selectRef, setSelectRef] = React.useState<HTMLSelectElement>(null);
        const [selectRefOptions, setSelectRefOptions] = React.useState<Array<HTMLOptionElement>>([]);
        // focused index should be defaulted to the first valued option (not `select-all` option) if dropdown is not searchable
        const [focusedIndex, setFocusedIndex] = React.useState<number>(searchable ? -1 : props.multiple ? 1 : 0);
        const buttonRef = React.useRef<HTMLButtonElement>();
        const dropdownRef = React.useRef<HTMLDivElement>();
        const menuRef = React.useRef<HTMLUListElement>();
        const searchRef = React.useRef<HTMLInputElement>();

        const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(safeWindow?.navigator?.userAgent);

        const changeValue = React.useCallback(
            (value: string) => {
                if (props.multiple) {
                    const current = selectRefOptions.find((option) => option.value === value);
                    current.selected = !current.selected;
                } else {
                    selectRef.value = value;
                    setShow(false);
                }
                selectRef.dispatchEvent(new Event("change", { bubbles: true }));
                props.multiple && onMultipleChange && onMultipleChange(getValueOfMultipleSelect(selectRefOptions));
            },
            [props.multiple, selectRef, selectRefOptions, onMultipleChange]
        );

        const getOptionsRef = React.useCallback(() => Array.from(menuRef.current?.querySelectorAll<HTMLLIElement>(".custom-control") || []), [searchKeyword]);

        const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => changeValue(e.target.value), [changeValue]);

        const selectAll = React.useCallback(
            (forceValue?: boolean | React.ChangeEvent<HTMLInputElement>) => {
                selectRefOptions.forEach((option: HTMLOptionElement) => {
                    if (!option.disabled) {
                        option.selected = typeof forceValue === "boolean" ? forceValue : !allSelected;
                    } else {
                        option.selected = false;
                    }
                });
                typeof forceValue === "boolean" && (selectRef.value = "");
                selectRef.dispatchEvent(new Event("change", { bubbles: true }));
                props.multiple && onMultipleChange && onMultipleChange(getValueOfMultipleSelect(selectRefOptions));
            },
            [allSelected, props.multiple, selectRefOptions, selectRef]
        );

        const isAllSelected = React.useCallback((): boolean => {
            return selectRefOptions.every((option: HTMLOptionElement) => {
                return option.disabled ? true : option.selected;
            });
        }, [selectRefOptions]);

        const toggleMenu = React.useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                if (show) {
                    setShow(false);
                } else {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const top: number = rect.top + rect.height;
                    const left: number = rect.left;
                    const bottom: number = window.innerHeight - rect.y + 4;
                    const minWidth: number = rect.width;
                    if (window.innerHeight - top < 200) {
                        setMenuStyle({ minWidth, bottom, left, maxHeight: rect.y - 10 });
                    } else {
                        setMenuStyle({ minWidth, top, left, maxHeight: window.innerHeight - top - 12 });
                    }
                    setShow(true);
                }
            },
            [show]
        );

        const toggleOption = React.useCallback(
            (e: React.KeyboardEvent) => {
                const optionRef: HTMLLIElement = getOptionsRef()[focusedIndex];

                if (optionRef) {
                    e.preventDefault();
                    optionRef.classList.contains("select-all") ? selectAll() : changeValue(optionRef.querySelector("input")?.value);
                }
            },
            [focusedIndex, changeValue, getOptionsRef, selectAll]
        );

        const onChange = React.useCallback(
            (event: React.ChangeEvent<HTMLSelectElement>) => {
                props.multiple && onMultipleChange && onMultipleChange(getValueOfMultipleSelect(Array.from(event.target.options)));
                props.onChange && props.onChange(event);
            },
            [props.multiple, props.onChange, onMultipleChange]
        );

        const onDropDownKeyDown = React.useCallback(
            (e: React.KeyboardEvent) => {
                const optionsRef: Array<HTMLLIElement> = getOptionsRef();

                switch (e.key) {
                    case Key.Escape:
                        setShow(false);
                        break;
                    case Key.ArrowDown:
                    case Key.ArrowUp:
                        e.preventDefault();
                        const direction: number = e.key === Key.ArrowDown ? 1 : -1;
                        setFocusedIndex((focusedIndex) => (focusedIndex + direction + optionsRef.length) % optionsRef.length);
                        break;
                    case Key.Home:
                        setFocusedIndex(0);
                        break;
                    case Key.End:
                        setFocusedIndex(optionsRef.length - 1);
                        break;
                    case Key.Enter:
                        toggleOption(e);
                        setShow(false);
                        break;
                    case Key.Space:
                        !searchable && toggleOption(e);
                        !props.multiple && setShow(false);
                        break;
                    case Key.Tab:
                        e.preventDefault();
                        setShow(false);
                        break;
                    default:
                        if (!searchable) {
                            // TODO: printable characters keyboard support @see https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
                        }
                        break;
                }
            },
            [props.multiple, searchable, getOptionsRef, toggleOption]
        );

        const onSearchInputKeyDown = React.useCallback((e: React.KeyboardEvent) => {
            switch (e.key) {
                case Key.Escape:
                    e.stopPropagation();
                    setSearchKeyword("");
                    setShow(false);
                    break;
                case Key.Space:
                    e.stopPropagation();
                    break;
            }
        }, []);

        /** TODO: Can be extracted to a component */
        const getOptions = () => {
            /**
             * running index should exclude the `select-all` option as it is not part of this function scope,
             * hence the initial value for it should be determine if the `select-all` option is visible on screen.
             *
             * `select-all` option is only visible when search keyword is empty or multiple flag is true
             */
            let runningIndex: number = searchKeyword.length > 0 || !props.multiple ? 0 : 1;
            const list = React.Children.map(props.children, (Child) => {
                if (!React.isValidElement(Child)) {
                    return Child;
                } else {
                    const type: string = (Child.type as any)?.name || Child.type;
                    const filteredBySearch = (element: React.ReactElement<any>): boolean => {
                        if (searchKeyword) {
                            if (React.isValidElement<any>(element)) {
                                const keyword: string = searchKeyword.toLowerCase().trim();
                                const text: string = String(element.props?.children).toLowerCase().trim();
                                return text.indexOf(keyword) < 0;
                            } else {
                                return true;
                            }
                        }
                        return false;
                    };
                    /** Radio buttons should be grouped with a name */
                    const name: string = props.multiple ? null : toggleId;
                    switch (type) {
                        case "option":
                            return filteredBySearch(Child) ? null : (
                                <CustomDropdownItem
                                    {...Child.props}
                                    multiple={props.multiple}
                                    name={name}
                                    value={Child.props.value}
                                    checked={Array.isArray(props.value) ? props.value.includes(Child.props.value) : props.value == Child.props.value}
                                    focused={focusedIndex === runningIndex++}
                                    onChange={handleChange}
                                >
                                    {Child.props.children}
                                </CustomDropdownItem>
                            );
                        case "optgroup":
                            const label = <label className="optgroup-label">{Child.props?.label}</label>;
                            return [
                                searchKeyword ? null : label,
                                ...React.Children.toArray(Child.props.children).map((groupChild: React.ReactElement<any>) => {
                                    return filteredBySearch(groupChild) ? null : (
                                        <CustomDropdownItem
                                            {...groupChild.props}
                                            multiple={props.multiple}
                                            name={name}
                                            value={groupChild.props.value}
                                            checked={Array.isArray(props.value) ? props.value.includes(groupChild.props.value) : props.value == groupChild.props.value}
                                            focused={focusedIndex === runningIndex++}
                                            onChange={handleChange}
                                        >
                                            {groupChild.props.children}
                                        </CustomDropdownItem>
                                    );
                                }),
                            ];
                        default:
                            return searchKeyword ? null : Child;
                    }
                }
            });
            return list?.length ? list : searchKeyword ? <p>{text.noResult || defaultText.noResult}</p> : <p>{text.emptyList || defaultText.emptyList}</p>;
        };

        const measuredSelectRef = React.useCallback((node: HTMLSelectElement) => {
            if (typeof ref === "function") {
                // to pass ref back to parents
                ref(node);
            } else if (!!ref) {
                (ref as any).current = node;
            }
            if (node !== null) {
                setSelectRef(node);
            }
        }, []);

        React.useEffect(() => {
            !isMobile && props.multiple && setAllSelected(isAllSelected());
        }, [props.value, props.multiple, isAllSelected]);

        React.useEffect(() => {
            !searchable && setSearchKeyword("");
        }, [searchable]);

        React.useEffect(() => {
            if (!!selectRef) {
                setSelectRefOptions(Array.from(selectRef.options));
            }
        }, [selectRef]);

        React.useEffect(() => {
            if (!isMobile) {
                const detectBlur = (event: MouseEvent) => {
                    if (!dropdownRef.current.contains(event.target as any) && !menuRef.current.contains(event.target as any)) {
                        setShow(false);
                    }
                };

                const handleScroll = (event: WheelEvent): void => {
                    if (!menuRef.current.contains(event.target as any)) {
                        setShow(false);
                    }
                };

                if (show) {
                    (searchable ? searchRef : menuRef).current?.focus();
                    const selectedOption = menuRef.current?.querySelector<HTMLLIElement>(".custom-control.selected");
                    selectedOption && setFocusedIndex(getOptionsRef().indexOf(selectedOption));
                    document.addEventListener("click", detectBlur);
                    window.addEventListener("wheel", handleScroll);
                } else {
                    buttonRef.current?.focus();
                    document.removeEventListener("click", detectBlur);
                    window.removeEventListener("wheel", handleScroll);
                }

                return () => {
                    document.removeEventListener("click", detectBlur);
                    window.removeEventListener("wheel", handleScroll);
                };
            }
        }, [show]);

        React.useEffect(() => {
            if (selectedLabel && typeof selectedLabel === "string") {
                !isMobile && setLabel(selectedLabel || props.placeholder);
            } else if (selectedLabel && typeof selectedLabel === "function") {
                const newLabel: string | string[] = selectedLabel(props.value);
                !isMobile && setLabel((Array.isArray(newLabel) ? newLabel.join(", ") : newLabel) || props.placeholder);
            } else {
                !isMobile && setLabel((Array.isArray(props.value) ? props.value.join(", ") : props.value) || props.placeholder);
            }
        }, [props.value, props.placeholder, selectedLabel]);

        React.useEffect(() => {
            // scroll the focused item into view
            getOptionsRef()?.[focusedIndex]?.scrollIntoView(false);
        }, [focusedIndex, getOptionsRef]);

        return (
            <div {...wrapperProps} className={classnames("rc custom-dropdown", wrapperProps.className)}>
                {!isMobile && (
                    <div className={classnames("dropdown", { show, clearable })} ref={dropdownRef}>
                        <FeedbackIndicator type={indicator?.type} message={null}>
                            <button
                                ref={buttonRef}
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id={toggleId}
                                data-toggle="dropdown"
                                aria-expanded={show || null}
                                aria-haspopup="listbox"
                                aria-labelledby={`${props["aria-labelledby"] ? `${props["aria-labelledby"]} ` : ""}${toggleId}`}
                                onClick={toggleMenu}
                                disabled={props.disabled}
                            >
                                <span>{label}</span>
                            </button>
                        </FeedbackIndicator>
                        {clearable && <CloseButton onClick={() => selectAll(false)} disabled={props.disabled} />}
                        {!safeDocument
                            ? null
                            : createPortal(
                                  <ul
                                      ref={menuRef}
                                      className={classnames("rc dropdown-menu", { show })}
                                      role="listbox"
                                      aria-labelledby={props["aria-labelledby"]}
                                      aria-activedescendant={getOptionsRef()[focusedIndex]?.querySelector<HTMLInputElement>("input").id}
                                      style={{ ...menuStyle }}
                                      tabIndex={-1}
                                      onKeyDown={onDropDownKeyDown}
                                  >
                                      {searchable && (
                                          <input
                                              className="form-control"
                                              type="search"
                                              placeholder={text.search || defaultText.search}
                                              value={searchKeyword}
                                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
                                              onKeyDown={onSearchInputKeyDown}
                                              ref={searchRef}
                                          />
                                      )}
                                      {/* Select all button */}
                                      {props.multiple && !searchKeyword ? (
                                          React.Children.count(props.children) ? (
                                              <>
                                                  <li className={classnames("custom-control custom-checkbox select-all", { focused: focusedIndex === 0 })}>
                                                      <input id={selectAllId} name="inline" type="checkbox" className="custom-control-input" checked={allSelected} hidden onChange={selectAll} />
                                                      <label className="custom-control-label" htmlFor={selectAllId}>
                                                          {text.selectAll || defaultText.selectAll}
                                                      </label>
                                                  </li>
                                                  <div className="dropdown-divider" />
                                              </>
                                          ) : (
                                              text.emptyList || defaultText.emptyList
                                          )
                                      ) : null}

                                      {getOptions()}
                                  </ul>,
                                  safeDocument.body
                              )}
                    </div>
                )}
                <FeedbackIndicator type={indicator?.type} message={indicator?.message}>
                    <select {...props} ref={measuredSelectRef} onChange={onChange} className={classnames("custom-select", props.className)} hidden={!isMobile}>
                        {/* select always picks the first item by default. Therefore the first needs to be initialized here */}
                        {!props.value && (
                            <option disabled value="" hidden>
                                {props.placeholder}
                            </option>
                        )}
                        {React.Children.toArray(props.children).filter((Child: any) => ["option", "optgroup"].includes(Child.type))}
                    </select>
                </FeedbackIndicator>

                {clearable && isMobile && <CloseButton onClick={() => selectAll(false)} disabled={props.disabled} />}
            </div>
        );
    }
);
