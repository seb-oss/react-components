import * as React from "react";
import "./accordion-style.scss";

const chevronUpIcon: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M4.465 366.475l7.07 7.071c4.686 4.686 12.284 4.686 16.971 0L224 178.053l195.494 195.493c4.686 4.686 12.284 4.686 16.971 0l7.07-7.071c4.686-4.686 4.686-12.284 0-16.97l-211.05-211.051c-4.686-4.686-12.284-4.686-16.971 0L4.465 349.505c-4.687 4.686-4.687 12.284 0 16.97z"/></svg>;

export interface AccordionText {
    title?: string;
    desc?: string;
}

export interface AccrodionListItem {
    category: string;
    subHeaderText?: string;
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
                        <div className={`header-wrapper${item.subHeaderText ? " with-sub-header" : ""}`} onClick={() => { this.toggle(index); }}>
                            {chevronUpIcon}
                            <div className={"accordion-header"}>{item.category}</div>
                            {item.subHeaderText && <div className="accordion-sub-header">{item.subHeaderText}</div>}
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
