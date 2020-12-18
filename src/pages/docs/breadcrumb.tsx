import React from "react";
import Docs from "components/Docs";
import { Breadcrumb, BreadcrumbItem } from "@sebgroup/react-components/Breadcrumb";

const userIcon: React.ReactElement = (
    <div className="d-flex align-items-center">
        <svg width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170">
            <path d="M149.1,165h-6V132.3c0-18.8-14.2-34.8-32.5-36.8l-24,15.9a3,3,0,0,1-3.3,0L59.2,95.5C41,97.7,26.9,113.6,26.9,132.3V165h-6V132.3c0-22.5,16.7-40.9,38.8-42.9a3,3,0,0,1,1.9.5L85,105.3l23.2-15.4a3,3,0,0,1,1.9-.5c21.9,1.8,39,20.7,39,42.9Z" />
            <path d="M85,86.4A31.7,31.7,0,0,1,53.4,54.8V36.6a31.6,31.6,0,1,1,63.3,0V54.8A31.7,31.7,0,0,1,85,86.4Zm0-75.5A25.7,25.7,0,0,0,59.4,36.6V54.8a25.6,25.6,0,0,0,51.3,0V36.6A25.7,25.7,0,0,0,85,10.9Z" />
        </svg>
        <span className="ml-1"> Account </span>
    </div>
);

const BreadcrumbPage: React.FC = () => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Breadcrumb/Breadcrumb");
    const importedFiles: Array<string> = [require("!raw-loader!@sebgroup/react-components/Breadcrumb/BreadcrumbItem")];
    const code: string = `<Breadcrumb>
    {
        ["Home", "Articles", "react-components", "about"]
            .map((title: string, key) =>
                <BreadcrumbItem key={key}>{title}</BreadcrumbItem>)
    }
</Breadcrumb>`;

    // const breadcrumbList: Array<BreadcrumbItemProps> = [<BreadcrumbItem>Hello</BreadcrumbItem>, "Articles", "react-components", "about"];
    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div>
                    <Breadcrumb>
                        {["Home", "Articles", "react-components", "about"].map((title: string, key) => (
                            <BreadcrumbItem onClick={() => alert(`Clicked on ${title}`)} key={key}>
                                {title}
                            </BreadcrumbItem>
                        ))}
                    </Breadcrumb>

                    <Breadcrumb>
                        <BreadcrumbItem onClick={() => alert(`Clicked on user account with custom icon`)}>{userIcon}</BreadcrumbItem>
                        <BreadcrumbItem>Details</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            }
            code={code}
            controls={<div></div>}
        />
    );
};

export default BreadcrumbPage;
