export function padNumber(value: number, isYear: boolean = false): string {
    if (value != null && value != undefined && isNumber(value)) {
        const minimumIntegerDigits: number = isYear ? 4 : 2;
        return value.toLocaleString("en", { minimumIntegerDigits, useGrouping: false });
    } else {
        return "";
    }
}

export function isNumber(...values: number[]): boolean {
    return values.every((val) => !isNaN(val));
}
