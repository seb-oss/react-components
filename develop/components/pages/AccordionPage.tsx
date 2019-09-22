import * as React from "react";
import { Accordion, AccrodionListItem } from "../../../src/Accordion/Accordion";
const Highlight = require("react-highlight").default;
const docMD: string = require("../../../src/Accordion/readme.md");

const plusIcon: JSX.Element = <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="640" height="640"><defs><path d="M585.08 342.54C593.39 342.54 600.1 335.82 600.1 327.51C600.1 326.01 600.1 313.99 600.1 312.49C600.1 304.18 593.39 297.46 585.08 297.46C568.91 297.46 488.06 297.46 342.54 297.46C342.49 151.99 342.46 71.18 342.45 55.01C342.45 46.7 335.73 39.99 327.42 39.99C325.92 39.99 313.9 39.99 312.4 39.99C304.09 39.99 297.37 46.7 297.37 55.01C297.38 71.18 297.41 151.99 297.46 297.46C151.99 297.51 71.18 297.54 55.01 297.55C46.7 297.55 39.99 304.27 39.99 312.58C39.99 314.08 39.99 326.1 39.99 327.6C39.99 335.91 46.7 342.63 55.01 342.63C71.18 342.62 151.99 342.59 297.46 342.54C297.46 488.06 297.46 568.91 297.46 585.08C297.46 593.39 304.18 600.1 312.49 600.1C313.99 600.1 326.01 600.1 327.51 600.1C335.82 600.1 342.54 593.39 342.54 585.08C342.54 568.91 342.54 488.06 342.54 342.54C488.06 342.54 568.91 342.54 585.08 342.54Z" id="e9WTWunf5M" /></defs><g><g><g><use xlinkHref="#e9WTWunf5M" /><g><use xlinkHref="#e9WTWunf5M" strokeWidth="1" /></g></g></g></g></svg>;
const angleDoubleRightIcon: JSX.Element = <svg name="angle-double-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17zm128-17l-117.8-116c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17L255.3 256 153.1 356.4c-4.7 4.7-4.7 12.3 0 17l7.1 7.1c4.7 4.7 12.3 4.7 17 0l117.8-116c4.6-4.7 4.6-12.3-.1-17z" /></svg>;

const AccordionPage: React.FunctionComponent = () => {
    return (
        <div className="route-template container">
            <div className="info-holder">

                <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div>

                <div className="info">
                    <h2>Output</h2>
                    <p>Here is a sample output</p>
                    <div className="result wide">
                        <Accordion list={accordionList} />
                    </div>

                    <p>Custom icon when expanded</p>
                    <div className="result wide">
                        <Accordion
                            list={accordionList}
                            iconRotation="deg-90"
                            customIconExpanded={plusIcon}
                        />
                    </div>

                    <p>Custom icon on the right</p>
                    <div className="result wide">
                        <Accordion
                            list={accordionList}
                            customIcon={angleDoubleRightIcon}
                            iconPosition="right"
                            iconRotation="deg-90"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

const accordionList: Array<AccrodionListItem> = [
    {
        header: "Accordion List Item 1",
        subHeaderText: "Accordion Sub Header",
        content: {
            title: "Tempor incididun",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus. Lectus mauris ultrices eros in cursus turpis massa tincidunt."
        }
    },
    {
        header: "Accordion List Item 2",
        content: [
            {
                title: "Excepteur sint",
                desc: "Vitae suscipit tellus mauris a diam maecenas sed. Feugiat in fermentum posuere urna nec tincidunt praesent semper." +
                    "Tellus id interdum velit laoreet id donec. Morbi enim nunc faucibus a pellentesque sit. Vitae congue mauris rhoncus aenean."
            },
            {
                title: "Duis aute",
                desc: "Eleifend donec pretium vulputate sapien nec sagittis. Malesuada fames ac turpis egestas." +
                    "Molestie ac feugiat sed lectus vestibulum mattis. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed."
            }
        ]
    },
    {
        header: "Accordion List Item 3",
        content: <>
            <p className="m-0">Ut nemo corporis inventore neque qui. Est quos facere et id praesentium ut in iusto qui. Labore vel est ab.</p>
            <a href="https://seb.se" target="_blank">Link to seb.se</a>
        </>
    }
];

export default AccordionPage;
