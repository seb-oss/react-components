import React from "react";
import classnames from "classnames";
import { Page, PageProps } from "./Page";
import "./pagination.scss";

const ChevronLeftIcon: JSX.Element = (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </svg>
);
const ChevronDoubleLeftIcon: JSX.Element = (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
        <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </svg>
);

export interface CustomNavs {
    next?: React.ReactNode;
    previous?: React.ReactNode;
    last?: React.ReactNode;
    first?: React.ReactNode;
}

export type PaginationSize = "sm" | "md" | "lg";

export type PaginationProps = JSX.IntrinsicElements["nav"] & {
    /** Override navigation buttons */
    navs?: CustomNavs;
    /** The maximum number of pagination buttons to show. Default is 10 */
    offset?: number;
    /** On value change handler */
    onPageChange?: (index: number) => void;
    /** The size of the buttons. Available sizes: "sm", "md", "lg". Default is "md" */
    size?: PaginationSize;
    /** Use dot-navigation */
    useDotNav?: boolean;
    /** Shows first and last buttons  */
    showFirstAndLast?: boolean;
    /** The index of the current page. The index is based on the children rendered starting from 0. */
    value?: number;
};

const Pagination = ({ navs = {}, offset = 5, onPageChange, size = "md", useDotNav, showFirstAndLast: useFirstAndLast, value = 0, ...props }: PaginationProps) => {
    const total: number = React.Children.count(props.children);
    const indexOfLastItem: number = total - 1;
    const disablePrev: boolean = total < 2 || value === 0;
    const disableNext: boolean = total < 2 || value === indexOfLastItem;

    const renderPages = (): React.ReactElement[] => {
        const childrenArray: React.ReactElement[] =
            React.Children.map(props.children, (Child: React.ReactElement<PageProps>, i: number) =>
                React.isValidElement<PageProps>(Child)
                    ? React.cloneElement<any>(Child, {
                          "data-active": value === i,
                          "data-index-number": i,
                          key: i,
                          onClick: (e: React.MouseEvent<HTMLLIElement>) => {
                              onPageChange && onPageChange(parseInt(e.currentTarget.dataset.indexNumber, 10));
                          },
                      })
                    : Child
            ) || [];

        if (offset) {
            /** The distance between the current value and the offset from the left. Example: ...👉|3|4|👈|(5)|6|7|... */
            const offsetToValue: number = value - Math.floor(offset / 2);
            /** The distance between the current value and the offset from the right. Example: ...|3|4|(5)|👉|6|7|👈... */
            const valueToOffset: number = value + Math.floor(offset / 2);

            let offsetFrom: number = offsetToValue;
            let offsetTo: number = valueToOffset;

            if (offsetToValue < 0) {
                offsetTo += 0 - offsetToValue;
                offsetTo = offsetTo > indexOfLastItem ? indexOfLastItem : offsetTo;
            }
            if (valueToOffset > indexOfLastItem) {
                offsetFrom -= valueToOffset - indexOfLastItem;
                offsetFrom = offsetFrom < 0 ? 0 : offsetFrom;
            }

            let filteredArray: React.ReactElement[] = childrenArray.filter((_: any, i: number) => i >= offsetFrom && i <= offsetTo);

            if (!useDotNav) {
                if (parseInt(filteredArray[0]?.props["data-index-number"], 10) > 0) {
                    filteredArray = [
                        <Page className="pre-ellipsis" key="pre-ellipsis" data-disabled href={props.children[0]?.props?.href}>
                            ...
                        </Page>,
                        ...filteredArray,
                    ];
                }
                if (parseInt(filteredArray[filteredArray.length - 1]?.props["data-index-number"], 10) < indexOfLastItem) {
                    filteredArray.push(
                        <Page className="post-ellipsis" key="post-ellipsis" data-index-number={indexOfLastItem} data-disabled>
                            ...
                        </Page>
                    );
                }
            }
            return filteredArray;
        } else {
            return childrenArray;
        }
    };

    const filteredPages = renderPages();

    const showFirst: boolean = (useFirstAndLast && !useDotNav) || (useDotNav && !disablePrev && filteredPages[0].props["data-index-number"] != 0);
    const showLast: boolean = (useFirstAndLast && !useDotNav) || (useDotNav && !disableNext && filteredPages[filteredPages.length - 1].props["data-index-number"] != indexOfLastItem);
    const disableFirst: boolean = disablePrev || filteredPages[0].key !== "pre-ellipsis";
    const disableLast: boolean = disableNext || filteredPages[filteredPages.length - 1].key !== "post-ellipsis";

    return (
        <nav {...props} className={classnames("rc", props.className)}>
            <ul className={classnames("pagination", { [`pagination-${size}`]: size, dotnav: useDotNav })}>
                {props.children && (
                    <>
                        {showFirst && (
                            <Page className="first-nav" onClick={() => !disableFirst && onPageChange(0)} data-disabled={disableFirst} href={props.children[0]?.props?.href}>
                                {navs?.first || ChevronDoubleLeftIcon}
                            </Page>
                        )}
                        {!useDotNav && (
                            <Page className="previous-nav" onClick={() => !disablePrev && onPageChange(value - 1)} data-disabled={disablePrev} href={props.children[value - 1]?.props?.href}>
                                {navs?.previous || ChevronLeftIcon}
                            </Page>
                        )}

                        {filteredPages}

                        {!useDotNav && (
                            <Page className="next-nav" onClick={() => !disableNext && onPageChange(value + 1)} data-disabled={disableNext} href={props.children[value + 1]?.props?.href}>
                                {navs?.next || React.cloneElement(ChevronLeftIcon, { className: "h-flipped" })}
                            </Page>
                        )}
                        {showLast && (
                            <Page className="last-nav" onClick={() => !disableLast && onPageChange(indexOfLastItem)} data-disabled={disableLast} href={props.children[indexOfLastItem]?.props?.href}>
                                {navs?.last || React.cloneElement(ChevronDoubleLeftIcon, { className: "h-flipped" })}
                            </Page>
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
};

Pagination.Item = Page;

export { Pagination };
