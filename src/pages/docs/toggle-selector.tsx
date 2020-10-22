import React from "react";
import Docs from "components/Docs";
import { ToggleSelector, ToggleSelectorItem } from "@sebgroup/react-components/ToggleSelector";
import { useDynamicForm } from "hooks/useDynamicForm";

const userIcon: React.ReactElement = (
    <svg width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170">
        <path d="M149.1,165h-6V132.3c0-18.8-14.2-34.8-32.5-36.8l-24,15.9a3,3,0,0,1-3.3,0L59.2,95.5C41,97.7,26.9,113.6,26.9,132.3V165h-6V132.3c0-22.5,16.7-40.9,38.8-42.9a3,3,0,0,1,1.9.5L85,105.3l23.2-15.4a3,3,0,0,1,1.9-.5c21.9,1.8,39,20.7,39,42.9Z" />
        <path d="M85,86.4A31.7,31.7,0,0,1,53.4,54.8V36.6a31.6,31.6,0,1,1,63.3,0V54.8A31.7,31.7,0,0,1,85,86.4Zm0-75.5A25.7,25.7,0,0,0,59.4,36.6V54.8a25.6,25.6,0,0,0,51.3,0V36.6A25.7,25.7,0,0,0,85,10.9Z" />
    </svg>
);

const ToggleSelectorPage: React.FC = (): React.ReactElement<void> => {
    const [radioListSelected, setRadioListSelected] = React.useState<string>("");

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [],
        },
    ]);
    const list: Array<ToggleSelectorItem> = [
        {
            label: "very longgg longg long aslfjlask jfldsjf lakjflajs kfjlaskjflksj lkfjlskjas jflaskjf laksdjf lsjdfljslfjlsdj flkasdj fd j kjflkdas jlfjslkjfls ksjlkfdjf ljskjflsjflskjf ",
            value: "test",
            icon: userIcon,
        },
        { label: "test1", value: "test1" },
        { label: "test2", value: "test2", disabled: true, icon: userIcon },
    ];
    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/ToggleSelector/ToggleSelector"), []);
    const code: string = React.useMemo(() => "", []);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100">
                    <ToggleSelector name="tests" list={list} value={[]} onChange={(e) => console.log(e)} multiple />
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default ToggleSelectorPage;
