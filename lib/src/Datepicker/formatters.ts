export function padNumber(value: number, isYear: boolean = false): string {
    if (isNumber(value)) {
        return isYear ? `0000${value}`.substr(-4, 4) : `00${value}`.substr(-2, 2);
    } else {
        return "";
    }
}

export function toInteger(value: any): number {
    return parseInt(value, 10);
}

export function isNumber(...values: number[]): boolean {
    return values.every((val) => !isNaN(toInteger(val)));
}
