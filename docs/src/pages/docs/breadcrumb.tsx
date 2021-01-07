import React from "react";
import Docs from "@common/Docs";
import { Breadcrumb, BreadcrumbItem } from "@sebgroup/react-components/Breadcrumb";
import { useDynamicForm } from "@hooks/useDynamicForm";

const homeIcon: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: "baseline" }}>
        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
    </svg>
);

const importString: string = require("!raw-loader!@sebgroup/react-components/Breadcrumb/Breadcrumb");
const importedFiles: Array<string> = [require("!raw-loader!@sebgroup/react-components/Breadcrumb/BreadcrumbItem")];
const code: string = `<Breadcrumb onNavigate={(e) => e.preventDefault(); /** Or do something else */}>
    <BreadcrumbItem>Home</BreadcrumbItem>
    <BreadcrumbItem>Users</BreadcrumbItem>
    <BreadcrumbItem>Edit</BreadcrumbItem>
</Breadcrumb>`;

const BreadcrumbPage: React.FC = () => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [{ key: "light", label: "light", description: "Enable light mode", controlType: "Checkbox" }],
        },
    ]);

    return (
        <Docs
            exampleTheme={controls.light ? "dark" : null}
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <Breadcrumb
                    onNavigate={(e) => {
                        e.preventDefault();
                        alert(`'${e.currentTarget.title}' clicked`);
                    }}
                    light={controls.light}
                >
                    <BreadcrumbItem title="Home">{homeIcon}</BreadcrumbItem>
                    <BreadcrumbItem title="Users">Users</BreadcrumbItem>
                    <BreadcrumbItem title="Edit">Edit</BreadcrumbItem>
                </Breadcrumb>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default BreadcrumbPage;
