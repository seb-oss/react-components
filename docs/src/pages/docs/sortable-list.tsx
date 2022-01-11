import React from "react";
import Docs from "@common/Docs";
import { SortableList } from "@sebgroup/react-components/SortableList";
import { useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import { SortableItem } from "@sebgroup/react-components/SortableList/SortableItem";
import { Checkbox } from "@sebgroup/react-components/Checkbox";

const importString: string = require("!raw-loader!@sebgroup/react-components/SortableList/SortableList");
const code: string = `<SortableList>
    <SortableItem uniqueKey="item1">item 1</SortableItem>
    <SortableItem uniqueKey="item2">item 2</SortableItem>
    <SortableItem uniqueKey="item3" disabled>item 3</SortableItem>
</SortableList>`;

type Example = {
    label: string;
    value: string;
    checked: boolean;
    disabled?: boolean;
};

const SortableListPage: React.FC = (): React.ReactElement<void> => {
    const [value, setValue] = React.useState<number>(null);
    const [array, setArray] = React.useState<Example[]>([
        {
            label: "Name",
            value: "1",
            checked: false,
        },
        {
            label: "Age",
            value: "2",
            checked: false,
        },
        {
            label: "Company",
            value: "3",
            checked: false,
        },
        {
            label: "Address",
            value: "4",
            checked: false,
        },
    ]);

    const {
        renderForm: renderControls,
        state: { controls },
    } = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "disabled", label: "disabled", controlType: "Checkbox" },
                { key: "disabledItem", label: "disable one random item", controlType: "Checkbox" },
                { key: "simple", label: "simple usage", controlType: "Checkbox" },
            ],
        },
    ]);

    React.useEffect(() => {
        setValue(controls.disabledItem ? Math.floor(Math.random() * (array.length - 1 - 0 + 1)) + 0 : null);
    }, [controls.disabledItem]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100 d-flex justify-content-center">
                    <SortableList
                        disabled={!!controls.disabled}
                        onSort={(list: string[]) => setArray((oldArray: Example[]) => oldArray.sort((a: Example, b: Example) => list.indexOf(a.value) - list.indexOf(b.value)))}
                    >
                        {array.map((item: Example, index: number) => (
                            <SortableItem key={index} uniqueKey={item.value} disabled={index === value}>
                                {controls.simple ? (
                                    item.label
                                ) : (
                                    <Checkbox
                                        name="test"
                                        value={item.value}
                                        checked={item.checked}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setArray((oldArray: Example[]) =>
                                                oldArray.map((checkbox: Example) => ({
                                                    ...checkbox,
                                                    checked: item.value === checkbox.value ? event.target.checked : checkbox.checked,
                                                }))
                                            );
                                        }}
                                    >
                                        {item.label}
                                    </Checkbox>
                                )}
                            </SortableItem>
                        ))}
                    </SortableList>
                </div>
            }
            code={code}
            controls={<>{renderControls()}</>}
        />
    );
};

export default SortableListPage;
