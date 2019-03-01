import * as React from "react";
import "./accordion-style.scss";

const angleRightIcon: JSX.Element = <svg name="angle-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" /></svg>;

export interface AccordionText {
    title?: string;
    desc?: string;
}

export interface AccrodionListItem {
    category: string;
    text?: AccordionText | Array<AccordionText>;
}

interface AccordionProps {
    list: Array<AccrodionListItem>;
    className?: string;
}

interface AccordionState {
    active: number;
}

export class Accordion extends React.Component<AccordionProps, AccordionState> {
    constructor(props: AccordionProps) {
        super(props);

        this.state = {
            active: null,
        };
    }

    toggle(i: number) {
        if (this.state.active === i) {
            this.setState({ active: null });
        } else {
            this.setState({ active: i });
        }
    }

    render() {
        return (
            <div className={"custom-accordion" + (this.props.className ? ` ${this.props.className}` : "")}>
                {this.props.list.map((item: AccrodionListItem, index: number) =>
                    <div className={"accordion-item" + (this.state.active === index ? " active" : "")} key={index}>
                        <div className="header-wrapper" onClick={() => { this.toggle(index); }}>
                            {angleRightIcon}
                            <div className="accordion-category">{item.category}</div>
                        </div>
                        <div className="content-wrapper">
                            {!(item.text instanceof Array) &&
                                <div className="text-wrapper">
                                    <div className="text-item">
                                        {item.text.title && <div className="accordion-title">{item.text.title}</div>}
                                        {item.text.desc && <div className="accordion-desc">{item.text.desc}</div>}
                                    </div>
                                </div>
                            }
                            {(item.text instanceof Array) &&
                                <div className="text-wrapper">
                                    {item.text.map((text: AccordionText, textIndex: number) =>
                                        <div className="text-item" key={textIndex}>
                                            {text.title && <div className="accordion-title">{text.title}</div>}
                                            {text.desc && <div className="accordion-desc">{text.desc}</div>}
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
