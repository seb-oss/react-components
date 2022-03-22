import Docs from "@common/Docs";
import { ErrorBoundary } from "@sebgroup/react-components/ErrorBoundary";
import { useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import React from "react";

const importString: string = require("!raw-loader!@sebgroup/react-components/ErrorBoundary/ErrorBoundary");
const code: string = `<ErrorBoundary errorView={<>error view</>}>
    <div>lorem ipsum</div>
</ErrorBoundary>`;

const ErrorBoundaryPage: React.FC = (): React.ReactElement<void> => {
    const {
        renderForm: renderControls,
        state: { controls },
    } = useDynamicForm([
        {
            key: "controls",
            items: [{ key: "hasError", label: "hasError", controlType: "Checkbox" }],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <ErrorBoundary errorView={<>error view</>}>{controls.hasError ? <div>{new Error()}</div> : <div>lorem ipsum</div>}</ErrorBoundary>
                </div>
            }
            code={code}
            controls={<>{renderControls()}</>}
        />
    );
};

export default ErrorBoundaryPage;
