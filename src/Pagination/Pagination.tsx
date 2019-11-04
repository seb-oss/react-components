import * as React from "react";
import "./pagination-style.scss";

const angleDoubleLeftIcon: JSX.Element = <svg name="angle-double-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M153.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L192.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L153 264.5c-4.6-4.7-4.6-12.3.1-17zm-128 17l117.8 116c4.7 4.7 12.3 4.7 17 0l7.1-7.1c4.7-4.7 4.7-12.3 0-17L64.7 256l102.2-100.4c4.7-4.7 4.7-12.3 0-17l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L25 247.5c-4.6 4.7-4.6 12.3.1 17z" /></svg>;
const angleLeftIcon: JSX.Element = <svg name="angle-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z" /></svg>;
const angleRightIcon: JSX.Element = <svg name="angle-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" /></svg>;
const angleDoubleRightIcon: JSX.Element = <svg name="angle-double-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17zm128-17l-117.8-116c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17L255.3 256 153.1 356.4c-4.7 4.7-4.7 12.3 0 17l7.1 7.1c4.7 4.7 12.3 4.7 17 0l117.8-116c4.6-4.7 4.6-12.3-.1-17z" /></svg>;

export interface PaginationProps {
    className?: string;
    firstText?: string;
    id?: string;
    lastText?: string;
    nextText?: string;
    offset?: number;
    pagingLength?: number;
    onChange?: (value: number) => void;
    previousText?: string;
    size: number;
    useDotNav?: boolean;
    useFirstAndLast?: boolean;
    useTextNav?: boolean;
    value: number;
}

export const Pagination: React.FunctionComponent<PaginationProps> = React.memo((props: PaginationProps): React.ReactElement<void> => {

    const [list, setList] = React.useState<Array<number>>([]);
    const [pagingSize, setPagingSize] = React.useState<number>(0);

    React.useEffect(() => {
        const initialOffset: number = props.offset ? props.offset : 10;
        setPagingSize(Math.ceil(props.size / initialOffset));
    }, [props.offset, props.pagingLength, props.size]);

    React.useEffect(() => {
        const intialLength: number = props.pagingLength ? props.pagingLength : 5;
        getList(props.value, intialLength);
    }, [pagingSize, props.value]);

    /**
     * Generates an array of the pages that needs to be displayed
     * It depends on the size, offset, and the current value
     * @param {number} value The current value. The current page.
     * @param {number} size The size of the pagination or length of items
     * @param {number} offset The number of items to show per page
     * @returns {Array<number>} An array of the pages that needs to be displayed
     */
    function getList(value: number, length: number): void {
        const genList: Array<number> = [];
        // generate the array
        for (let i = 1; i <= pagingSize; i++) {
            genList.push(i);
        }

        // the median value is what you use to obtain the centre of the page or equilibrium
        const medianValue = Math.ceil(length / 2);
        let start: number = 0;
        let end: number = pagingSize;

        /**
         * If The expected length is lessthan the size of the page, Do the
         * conversion/calculations.
         * 1. If the current value is less than the first centre, then its in the first page. Set start equal the size of the page - the length.
         * 2. if the current value subtract the median or the centre value is greater than minus 1, set start to value - the medianValue.
         * 3. the end is always start of the page plus the length regardless.
         */

        if (length < pagingSize) {
            if ((pagingSize - value) < medianValue) {
                start = (pagingSize - length);
            } else if ((value - medianValue) > -1) {
                start = (value - medianValue);
            }

            end = start + length;
        }

        setList(genList.slice(start, end));
    }

    return (
        <div className={"pagination-wrapper" + (props.className ? ` ${props.className}` : "")} id={props.id}>
            <nav className="custom-pagination">
                {!props.useDotNav &&
                    <ul className={"pagination"}>
                        {(props.value !== 1 && props.useFirstAndLast) &&
                            <li className="page-item" onClick={() => props.onChange(1)}>
                                <button className="page-link" title={props.firstText}>
                                    <span className="nav-action">
                                        {props.useTextNav ? (props.firstText ? props.firstText : "First") : angleDoubleLeftIcon}
                                    </span>
                                    <span className="sr-only">{props.firstText || "First"}</span>
                                </button>
                            </li>
                        }
                        {(props.value !== 1) &&
                            <li className="page-item" onClick={() => props.onChange(props.value - 1)}>
                                <button className="page-link" title={props.previousText}>
                                    <span className="nav-action">
                                        {props.useTextNav ? (props.previousText ? props.previousText : "Previous") : angleLeftIcon}
                                    </span>
                                    <span className="sr-only">{props.previousText || "Previous"}</span>
                                </button>
                            </li>
                        }
                        {list.map((num) => {
                            return (
                                <li
                                    className={"page-item" + (props.value === num ? " active" : "")}
                                    key={num}
                                    onClick={() => props.onChange(num)}
                                    value={num}
                                >
                                    <button className={"page-link" + (props.value === num ? " active" : "")}>
                                        <span className="nav-num">{num}</span>
                                        <span className="sr-only">
                                            {num}
                                        </span>
                                    </button>
                                </li>
                            );
                        })
                        }

                        {(props.value !== pagingSize) &&
                            <li className="page-item" onClick={() => props.onChange(props.value + 1)}>
                                <button className="page-link" title={props.nextText}>
                                    <span className="nav-action">
                                        {props.useTextNav ? (props.nextText ? props.nextText : "Next") : angleRightIcon}
                                    </span>
                                    <span className="sr-only">{props.nextText || "Next"}</span>
                                </button>
                            </li>
                        }

                        {(props.value !== pagingSize && props.useFirstAndLast) &&
                            <li className="page-item" onClick={() => props.onChange(pagingSize)}>
                                <button className="page-link" title="{props.lastText}">
                                    <span className="nav-action">
                                        {props.useTextNav ? (props.lastText ? props.lastText : "Last") : angleDoubleRightIcon}
                                    </span>
                                    <span className="sr-only">{props.lastText || "Last"}</span>
                                </button>
                            </li>
                        }

                    </ul>
                }
                {props.useDotNav &&
                    <ul className={"pagination dotnav"}>
                        {list.map((num) => {
                            return (
                                <li
                                    className={"page-item" + (props.value === num ? " active" : "")}
                                    key={num}
                                    onClick={() => props.onChange(num)}
                                    value={num}
                                >
                                    <span className={"page-dot-link" + (props.value === num ? " active" : "")} />
                                </li>
                            );
                        })}
                    </ul>
                }
            </nav>
        </div>
    );
});
