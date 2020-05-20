import React from "react";

type SlideUpDownProps = {
    /** The value that the transition will depend on to recalculate */
    triggerValue: any;
};

const SlideUpDown: React.FC<React.PropsWithChildren<SlideUpDownProps>> = (props: React.PropsWithChildren<SlideUpDownProps>) => {
    const myref: React.MutableRefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState<number>(0);

    React.useEffect(() => {
        const children: HTMLCollection = myref.current.children;
        let calculatedHeight: number = 0;
        for (let i = 0; i < children.length; i++) {
            calculatedHeight += children.item(i).scrollHeight;
        }
        setHeight(calculatedHeight);
    }, [props.triggerValue]);

    return (
        <div
            className="expand"
            ref={myref}
            style={{
                overflow: "hidden",
                height,
                opacity: height ? 1 : 0,
                transition: "height 200ms linear, opacity 400ms linear",
            }}
        >
            {props.children}
        </div>
    );
};

export { SlideUpDown };
