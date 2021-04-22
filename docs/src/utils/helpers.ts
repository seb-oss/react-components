/** check if key selected from options */

type Control = {
    [T: string]: any;
};

export function checkDynamicFormSelectedKey<T>(key: string, controls: Control): T {
    return controls.checkboxes?.find((item: string) => item === key);
}
