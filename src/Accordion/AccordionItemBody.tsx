import React from "react";
import { isPrimitive } from "@sebgroup/frontend-tools/dist/isPrimitive";

type AccordionItemBodyProps = React.PropsWithChildren<{
    /** Toggle value, whether it should be expanded or collapsed */
    toggle: boolean;
}>;

const AccordionItemBody: React.FC<AccordionItemBodyProps> = React.memo((props: AccordionItemBodyProps) => {
    const collapseRef: React.MutableRefObject<HTMLDivElement> = React.useRef<HTMLDivElement>();
    const [height, setHeight] = React.useState<number>(0);

    React.useEffect(() => {
        collapseRef && setHeight(props.toggle ? collapseRef.current.scrollHeight : 0);
    }, [props.children, props.toggle, collapseRef, setHeight]);

    return (
        <div className="card-body" ref={collapseRef} style={{ height, opacity: height ? 1 : 0 }}>
            <div className="content">{React.isValidElement(props.children) || isPrimitive(props.children) ? props.children : null}</div>
        </div>
    );
});

export { AccordionItemBody };
