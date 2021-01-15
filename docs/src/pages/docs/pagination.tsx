import React from "react";
import Docs from "@common/Docs";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { Pagination, Page, CustomNavs, PaginationProps } from "@sebgroup/react-components/Pagination";
import CPUIcon from "../../../static/icons/cpu.svg";
import GameControllerIcon from "../../../static/icons/game-controller.svg";
import ArrowFirstLeftIcon from "../../../static/icons/arrow-first-left.svg";
import ArrowLeftFillIcon from "../../../static/icons/arrow-left-fill.svg";
import ArrowRightFillIcon from "../../../static/icons/arrow-right-fill.svg";
import ArrowLastRightIcon from "../../../static/icons/arrow-last-right.svg";

const importString: string = require("!raw-loader!@sebgroup/react-components/Pagination/Pagination");
const code: string = `<Pagination value={page} onPageChange={setPage}>
    {[...Array(10)].map((_: undefined, i: number) => <Page href={\'"pages/\${i + 1}"\'}>{i + 1}</Page>)}
</Pagination>`;

const PaginationSizes: DynamicFormOption<PaginationProps["size"]>[] = [
    { key: "sm", label: "sm", value: "sm" },
    { key: "md", label: "md", value: "md" },
    { key: "lg", label: "lg", value: "lg" },
];
const customPaginations: React.ReactNode[] = [
    "Users",
    "Admins",
    "🛠",
    "🤷‍♀️",
    // prettier-ignore
    <b><i><u>Huh!</u></i></b>,
    <CPUIcon />,
    <GameControllerIcon />,
];
const customNavs: CustomNavs = {
    first: <ArrowFirstLeftIcon />,
    next: <ArrowLeftFillIcon />,
    previous: <ArrowRightFillIcon />,
    last: <ArrowLastRightIcon />,
};

const PaginationPage: React.FC = (): React.ReactElement<void> => {
    const [page, setPage] = React.useState<number>(0);

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "size", label: "Size", value: PaginationSizes[1], options: PaginationSizes, controlType: "Radio" },
                { key: "offset", min: 1, max: 10, value: 5, label: "Offset", controlType: "Stepper" },
                { key: "useDotNav", label: "Use dot navigation", value: false, controlType: "Checkbox" },
                { key: "showFirstAndLast", label: "Show first and last buttons", description: "Show buttons for the first and last page when available.", value: false, controlType: "Checkbox" },
                { key: "useCustomPages", label: "Use non numbered navigations", description: "You can pass anything as a pagination button. Get creative! 👨‍🎨", value: false, controlType: "Checkbox" },
                {
                    key: "useCustomNavs",
                    label: "Use custom navigation buttons",
                    description: "You can pass custom navigation content replacing the chevron icons used by default",
                    value: false,
                    controlType: "Checkbox",
                },
            ],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <Pagination
                        value={page}
                        onPageChange={setPage}
                        offset={controls.offset}
                        size={controls.size.value}
                        useDotNav={controls.useDotNav}
                        showFirstAndLast={controls.showFirstAndLast}
                        navs={controls.useCustomNavs ? customNavs : null}
                    >
                        {(controls.useCustomPages ? customPaginations : [...Array(10)]).map((_: undefined, i: number) => (
                            <Page key={i} href={`/pages/${i + 1}`}>
                                {controls.useCustomPages ? _ : i + 1}
                            </Page>
                        ))}
                    </Pagination>
                </div>
            }
            code={code}
            controls={renderControls()}
            note={
                <div>
                    <h4>Pagination offset</h4>
                    <p>
                        Pagination offset is the maximum number of pagination buttons to be shown at a time. For example, if you have 10 pages and you set the offset to 5 (default) then only 5
                        pagination buttons will be shown with an indicator that there are more pages to view. The offset <u>can only be an odd number</u> because when the user navigates between the
                        pages, the pagination needs to show the current page which usually gets centered inside the pagination component.
                    </p>

                    <br />

                    <h4>Numbered pagination</h4>
                    <p>
                        You can compose an numbered pagination easily using an array of numbers. However, we have exposed a helper component called <code>NumberedPagination</code>.
                    </p>
                </div>
            }
        />
    );
};

export default PaginationPage;
