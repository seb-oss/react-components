import React from "react";
import Docs from "components/Docs";
import { ProgressBar } from "@sebgroup/react-components/ProgressBar";
import { useDynamicForm } from "hooks/useDynamicForm";

const ProgressBarPage: React.FC = (): React.ReactElement<void> => {
    const [progress, setProgress] = React.useState<number>(1);
    const timer: React.MutableRefObject<NodeJS.Timeout | number> = React.useRef<NodeJS.Timeout | number>();

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "showProgress",
                    label: "Show progress",
                    order: 40,
                    controlType: "Checkbox",
                    value: false,
                },
            ],
        },
    ]);

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/ProgressBar/ProgressBar"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/ProgressBar/ProgressBar")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./progressbar").default, []);

    const incrementValue = React.useCallback(() => {}, [progress]);

    React.useEffect(() => {
        timer.current = setInterval((): void => {
            if (progress < 100) {
                setProgress(progress + 1);
            } else {
                clearInterval(timer.current as number);
            }
        }, 100);
        return () => {
            timer.current && clearInterval(timer.current as number);
        };
    }, [timer?.current]);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <ProgressBar showProgress={controls.showProgress} value={progress} />
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default ProgressBarPage;
