import React from "react";
import Docs from "@common/Docs";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { Pagination, Page, CustomNavs } from "@sebgroup/react-components/Pagination";

const StarSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
);

const PaginationPage: React.FC = (): React.ReactElement<void> => {
    const [page, setPage] = React.useState<number>(0);

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/Pagination/Pagination"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/Pagination/Pagination")], []);
    const code: string = `<Pagination value={page} onPageChange={setPage}>
    {[...Array(10)].map((_: undefined, i: number) => <Page href={\'"pages/\${i + 1}"\'}>{i + 1}</Page>)}
</Pagination>`;
    const PaginationSizes: DynamicFormOption[] = [
        { key: "sm", label: "Small", value: "sm" },
        { key: "md", label: "Medium", value: "md" },
        { key: "lg", label: "Large", value: "lg" },
    ];
    const customPaginations: React.ReactNode[] = [
        "Users",
        "Admins",
        "🛠",
        "🤷‍♀️",
        <b>
            <i>
                <u>Huh!</u>
            </i>
        </b>,
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path
                fillRule="evenodd"
                d="M5.5.5a.5.5 0 0 0-1 0V2A2.5 2.5 0 0 0 2 4.5H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2A2.5 2.5 0 0 0 4.5 14v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14a2.5 2.5 0 0 0 2.5-2.5h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14A2.5 2.5 0 0 0 11.5 2V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5zm1 4.5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3zm0 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
            />
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path
                fillRule="evenodd"
                d="M11.119 2.693c.904.19 1.75.495 2.235.98.407.408.779 1.05 1.094 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.815-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773a11.307 11.307 0 0 1-.739-.809c-.126-.147-.25-.291-.368-.422-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.422-.243.283-.494.576-.739.81-.398.378-.877.705-1.513.772a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772.486-.485 1.331-.79 2.235-.98.932-.196 2.03-.292 3.119-.292 1.089 0 2.187.096 3.119.292zm-6.032.979c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.505C4.861 9.97 5.978 9.026 8 9.026s3.139.943 3.965 1.855c.164.182.307.35.44.505.214.25.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"
            />
            <path d="M11.5 6.026a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-7-2.5h1v3h-1v-3z" />
            <path d="M3.5 6.526h3v1h-3v-1zM3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .258.966l-1.932.518a.5.5 0 0 1-.612-.354zm9.976 0a.5.5 0 0 0-.353-.613l-1.932-.518a.5.5 0 1 0-.259.966l1.932.518a.5.5 0 0 0 .612-.354z" />
        </svg>,
    ];
    const customNavs: CustomNavs = {
        first: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path
                    fillRule="evenodd"
                    d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"
                />
            </svg>
        ),
        next: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
        ),
        previous: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
        ),
        last: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path
                    fillRule="evenodd"
                    d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"
                />
            </svg>
        ),
    };
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "size",
                    label: "Size",
                    value: PaginationSizes[1],
                    options: PaginationSizes,
                    controlType: "Radio",
                },
                {
                    key: "offset",
                    min: 1,
                    max: 10,
                    value: 5,
                    label: "Offset",
                    controlType: "Stepper",
                },
                {
                    key: "useDotNav",
                    label: "Use dot navigation",
                    value: false,
                    controlType: "Checkbox",
                },
                {
                    key: "showFirstAndLast",
                    label: "Show first and last buttons",
                    description: "Show buttons for the first and last page when available.",
                    value: false,
                    controlType: "Checkbox",
                },
                {
                    key: "useCustomPages",
                    label: "Use non numbered navigations",
                    description: "You can pass anything as a pagination button. Get creative! 👨‍🎨",
                    value: false,
                    controlType: "Checkbox",
                },
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
            importedFiles={importedFiles}
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
                </div>
            }
        />
    );
};

export default PaginationPage;
