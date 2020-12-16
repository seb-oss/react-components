import React from "react";
import { Pagination, Page, PaginationProps } from ".";

export interface NumberedPagesProps extends PaginationProps {
    /** The number of the first item */
    start?: number;
    /** The number of the last item */
    end: number;
    /** A string mask representing the generic href syntax that include `$i` that would be replaced by the page number automatically */
    hrefMask?: string;
}

export const NumberedPagination: React.FC<NumberedPagesProps> = React.memo(({ start = 1, end, hrefMask, ...props }: NumberedPagesProps) => {
    const [pages, setPages] = React.useState<number[]>([]);

    React.useEffect(() => {
        const arr: number[] = [];

        if (typeof start === "number" && typeof end === "number") {
            for (let i: number = start || 1; i <= end; i++) {
                arr.push(i);
            }

            setPages(arr);
        }
    }, [start, end]);

    return (
        <Pagination {...props}>
            {pages.map((page: number, index: number) => (
                <Page key={index} href={hrefMask?.includes("$i") ? hrefMask.replace("$i", page.toString()) : null}>
                    {page}
                </Page>
            ))}
        </Pagination>
    );
});

export default NumberedPagination;
