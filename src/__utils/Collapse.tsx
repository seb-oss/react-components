import React from "react";

export type CollapseProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Collapse: React.FC<CollapseProps> = React.memo((props: CollapseProps) => {
    const collapseRef: React.MutableRefObject<HTMLDivElement> = React.useRef<HTMLDivElement>();
    const [height, setHeight] = React.useState<number>(0);

    React.useEffect(() => {
        if (collapseRef && props["data-toggle"] !== undefined) {
            setHeight(JSON.parse(props["data-toggle"]) ? collapseRef.current.scrollHeight : 0);
        }
    }, [props.children, props["data-toggle"], collapseRef]);

    return (
        <div {...props} ref={collapseRef} style={{ height, opacity: height ? 1 : 0 }}>
            {props.children}
        </div>
    );
});
