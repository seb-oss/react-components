import React from "react";
import { createPortal } from "react-dom";
import classnames from "classnames";
import { useCombinedRefs } from "../hooks/useCombinedRef";
import { CloseButton } from "../CloseButton";
import { CustomDropdownItem } from "./CustomDropdownItem";
import { randomId } from "@sebgroup/frontend-tools/randomId";
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

export function getValueOfMultipleSelect(select: HTMLSelectElement): string[] {
    return Array.from(select.options)
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
};

export const Dropdown: React.FC<DropdownProps> = React.forwardRef(({ wrapperProps = {}, text = {}, onMultipleChange, searchable, clearable, selectedLabel, ...props }: DropdownProps, ref) => {
    const [toggleId] = React.useState<string>(randomId("ddt-"));
    const [selectAllId] = React.useState<string>(randomId("sa-"));
    const [show, setShow] = React.useState<boolean>(false);
    const [allSelected, setAllSelected] = React.useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = React.useState<string>("");
    const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({});
    const [label, setLabel] = React.useState<string>();

    const selectRef = useCombinedRefs<HTMLSelectElement>(ref);
    const searchRef = React.useRef<HTMLInputElement>();
    const menuRef = React.useRef<HTMLDivElement>();
    const dropdownRef = React.useRef<HTMLDivElement>();

    const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(safeWindow?.navigator?.userAgent);

    const handleChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (props.multiple) {
                const current = Array.from(selectRef.current.options).find((option) => option.value == e.target.value);
                current.selected = !current.selected;
            } else {
                selectRef.current.value = e.target.value;
                setShow(false);
            }
            selectRef.current.dispatchEvent(new Event("change", { bubbles: true }));
            props.multiple && onMultipleChange && onMultipleChange(getValueOfMultipleSelect(selectRef.current));
        },
        [isMobile, props.multiple, onMultipleChange]
    );

    const selectAll = React.useCallback(
        (forceValue?: boolean | React.ChangeEvent<HTMLInputElement>) => {
            Array.from(selectRef.current.options).forEach((_, i) => {
                const option = selectRef.current.options.item(i);
                if (!option.disabled) {
                    option.selected = typeof forceValue === "boolean" ? forceValue : !allSelected;
                } else {
                    option.selected = false;
                }
            });
            typeof forceValue === "boolean" && (selectRef.current.value = "");
            selectRef.current.dispatchEvent(new Event("change", { bubbles: true }));
            props.multiple && onMultipleChange && onMultipleChange(getValueOfMultipleSelect(selectRef.current));
        },
        [allSelected, props.multiple]
    );

    const isAllSelected = (): boolean => {
        return Array.from(selectRef.current.options).every((_, i) => {
            const option = selectRef.current.options.item(i);
          return option.disabled ? true : option.selected
        });
    };

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

    const onChange = React.useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            props.multiple && onMultipleChange && onMultipleChange(getValueOfMultipleSelect(event.target));
            props.onChange && props.onChange(event);
        },
        [props.multiple, props.onChange, onMultipleChange]
    );

    /** TODO: Can be extracted to a component */
    const getOptions = () => {
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

    React.useEffect(() => {
        !isMobile && props.multiple && setAllSelected(isAllSelected());
    }, [props.value]);

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
                searchRef.current?.focus();
                document.addEventListener("click", detectBlur);
                window.addEventListener("wheel", handleScroll);
            } else {
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

    return (
        <div {...wrapperProps} className={classnames("rc custom-dropdown", wrapperProps.className)}>
            {!isMobile && (
                <div className={classnames("dropdown", { show, clearable })} ref={dropdownRef}>
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id={toggleId}
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        onClick={toggleMenu}
                        disabled={props.disabled}
                    >
                        <span>{label}</span>
                    </button>
                    {clearable && <CloseButton onClick={() => selectAll(false)} disabled={props.disabled} />}
                    {!safeDocument
                        ? null
                        : createPortal(
                              <div className={classnames("rc dropdown-menu", { show })} aria-labelledby={toggleId} ref={menuRef} style={{ ...menuStyle }}>
                                  {searchable && (
                                      <input
                                          className="form-control"
                                          type="search"
                                          placeholder={text.search || defaultText.search}
                                          value={searchKeyword}
                                          onChange={(e) => setSearchKeyword(e.target.value)}
                                          ref={searchRef}
                                      />
                                  )}
                                  {/* Select all button */}
                                  {props.multiple && !searchKeyword ? (
                                      React.Children.count(props.children) ? (
                                          <>
                                              <div className="custom-control custom-checkbox select-all">
                                                  <input id={selectAllId} name="inline" type="checkbox" className="custom-control-input" checked={allSelected} hidden onChange={selectAll} />
                                                  <label className="custom-control-label" htmlFor={selectAllId}>
                                                      {text.selectAll || defaultText.selectAll}
                                                  </label>
                                              </div>
                                              <div className="dropdown-divider" />
                                          </>
                                      ) : (
                                          text.emptyList || defaultText.emptyList
                                      )
                                  ) : null}

                                  {getOptions()}
                              </div>,
                              safeDocument.body
                          )}
                </div>
            )}
            <select {...props} ref={selectRef} onChange={onChange} className={classnames("custom-select", props.className)} hidden={!isMobile}>
                {/* select always picks the first item by default. Therefore the first needs to be initialized here */}
                {!props.value && (
                    <option disabled value="" hidden>
                        {props.placeholder}
                    </option>
                )}
                {React.Children.toArray(props.children).filter((Child: any) => ["option", "optgroup"].includes(Child.type))}
            </select>
            {clearable && isMobile && <CloseButton onClick={() => selectAll(false)} disabled={props.disabled} />}
        </div>
    );
});
