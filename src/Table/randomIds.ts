export function randomId(seed: string): string {
    return seed + String((Math.random() * 1000) + (new Date()).getTime());
}
