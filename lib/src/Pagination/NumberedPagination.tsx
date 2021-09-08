import React from "react";
import { Pagination, PaginationProps } from "./Pagination";
import { Page } from "./Page";

export interface NumberedPagesProps extends PaginationProps {
    /** The number of the first item */
    start?: number;
    /** The number of the last item */
    end: number;
    /** A string mask representing the generic href syntax that include `$i` that would be replaced by the page number automatically */
    hrefMask?: string;
}

export const NumberedPagination: React.FC<NumberedPagesProps> = React.memo(
    React.forwardRef(({ start = 1, end, hrefMask, ...props }: NumberedPagesProps, ref: React.ForwardedRef<HTMLElement>) => {
        const [pages, setPages] = React.useState<number[]>([]);

        React.useEffect(() => {
            const arr: number[] = [];

            for (let i: number = start; i <= end; i++) {
                arr.push(i);
            }

            setPages(arr);
        }, [start, end]);

        return (
            <Pagination {...props} ref={ref}>
                {pages.map((page: number, index: number) => (
                    <Page key={index} href={hrefMask?.includes("$i") ? hrefMask.replace("$i", page.toString()) : null}>
                        {page}
                    </Page>
                ))}
            </Pagination>
        );
    })
);

export default NumberedPagination;
