import { DynamicFormOption } from "@hooks/useDynamicForm";

/** check if key selected from options */

type Control = {
    [T: string]: any;
};

export function checkDynamicFormSelectedKey<T>(key: string, controls: Control): T {
    return controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
}
