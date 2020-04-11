import * as React from "react";
import { Accordion, AccrodionListItem, AccordionProps } from "../../../src/Accordion/Accordion";
import { DocPage } from "../../components/common/DocPage";

const plusCircleIcon: JSX.Element = (
    <svg width="64px" height="64px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(1.000000, 1.000000)" className="blue-svg" strokeWidth="2">
                <circle cx="31" cy="31" r="31" />
                <path d="M31,57 C16.6,57 5,45.4 5,31" />
                <path d="M31,5 C45.4,5 57,16.6 57,31" />
                <path d="M35,35 L44,35 L44,27 L35,27 L35,18 L28,18 L28,27 L19,27 L19,35 L28,35 L28,44 L35,44 L35,35 Z" />
            </g>
        </g>
    </svg>
);
const minusCircleIcon: JSX.Element = (
    <svg width="64px" height="64px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(1.000000, 1.000000)" className="blue-svg" strokeWidth="2">
                <g>
                    <circle cx="31" cy="31" r="31" />
                    <path d="M31,57 C16.6,57 5,45.4 5,31" />
                    <path d="M31,5 C45.4,5 57,16.6 57,31" />
                    <rect x="19" y="27" width="25" height="8" />
                </g>
            </g>
        </g>
    </svg>
);

const AccordionPage: React.FC = () => {
    return (
        <DocPage<AccordionProps>
            header="Accordion"
            description="Allows you to show and hide content"
            component={Accordion}
            specifications={{
                className: { type: "string", description: "A class name", content: null },
                customIcon: { type: "JSX.Element", description: "A custom icon", content: plusCircleIcon, defaultValue: null },
                customIconExpanded: { type: "JSX.Element", description: "A custom expanded icon", content: minusCircleIcon, defaultValue: null },
                iconPosition: { type: "string", description: "Positioning the icon", content: ["left", "right"] },
                iconRotation: { type: "string", description: "Setting the rotation of the icon toggles", content: ["deg-180", "deg-180-counter", "deg-90", "deg-90-counter"] },
                id: { type: "string", description: "The element id", content: null },
                list: { type: "Array<AccordionListItem>", description: "The list of accordion items to be displayed", defaultValue: accordionList },
                alternative: { type: "boolean", description: "An alternative version of the accordion", content: [false, true] },
                activeIndex: { type: "number", description: "Default active tab", defaultValue: null },
            }}
        />
    );
};

const accordionList: Array<AccrodionListItem> = [
    {
        header: "Accordion List Item 1",
        subHeaderText: "Accordion Sub Header",
        content: {
            title: "Tempor incididun",
            desc:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus. Lectus mauris ultrices eros in cursus turpis massa tincidunt.",
        },
    },
    {
        header: "Accordion List Item 2",
        content: [
            {
                title: "Excepteur sint",
                desc:
                    "Vitae suscipit tellus mauris a diam maecenas sed. Feugiat in fermentum posuere urna nec tincidunt praesent semper. Tellus id interdum velit laoreet id donec. Morbi enim nunc faucibus a pellentesque sit. Vitae congue mauris rhoncus aenean.",
            },
            {
                title: "Duis aute",
                desc:
                    "Eleifend donec pretium vulputate sapien nec sagittis. Malesuada fames ac turpis egestas. Molestie ac feugiat sed lectus vestibulum mattis. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed.",
            },
        ],
    },
    {
        header: "Accordion List Item 3",
        content: (
            <>
                <p className="m-0">Ut nemo corporis inventore neque qui. Est quos facere et id praesentium ut in iusto qui. Labore vel est ab.</p>
                <a href="https://seb.se" target="_blank">
                    Link to seb.se
                </a>
            </>
        ),
    },
];

export default AccordionPage;
