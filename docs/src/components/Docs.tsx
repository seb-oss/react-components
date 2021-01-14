import React from "react";
import { Tabs, TabItem } from "@sebgroup/react-components/Tabs";
import Layout from "./Layout";
import { Helmet } from "react-helmet";
import { APIExtractService } from "@utils/api-parser";
import DocsPlayground, { DocsPlaygroundProps } from "./DocsPlaygroud";
import DocsAPI from "./DocsAPIs";

export interface DocsProps extends DocsPlaygroundProps {
    mainFile: string;
    importedFiles?: Array<string>;
    note?: React.ReactNode;
}

const Docs: React.FC<DocsProps> = ({ mainFile, importedFiles, ...props }: DocsProps) => {
    const [apis, setApis] = React.useState<ApiSection>(null);
    const [activeTab, setActiveTab] = React.useState<number>(0);

    React.useEffect(() => {
        new APIExtractService()
            .initParse(mainFile, importedFiles)
            .then(async (res) => setApis(await res[0]))
            .catch(console.error);
    }, []);

    return (
        <Layout>
            <Helmet>
                <title>{apis?.name || ""} - SEB React Components</title>
            </Helmet>

            <div className="doc-page container">
                <h1>{apis?.name}</h1>
                <p>{apis?.description}</p>
                <Tabs className="doc-page-tabs" value={activeTab} onTabChange={setActiveTab}>
                    <TabItem>Playground</TabItem>
                    <TabItem>APIs</TabItem>
                    {props.note && <TabItem>Notes</TabItem>}
                </Tabs>
                {
                    /* prettier-ignore */ [
                    <DocsPlayground {...props} />,
                    <DocsAPI list={apis?.interfaces} />,
                    <div className="note">{props.note}</div>
                ][activeTab]
                }
            </div>
        </Layout>
    );
};

export default Docs;
