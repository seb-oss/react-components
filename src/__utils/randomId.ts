/**
 * Generates random ID
 * @param {string} seed The seed to be injected at the front of the generated random ID
 * @returns {string} The generated random ID
 */
export function randomId(seed: string): string {
    return seed + String((Math.random() * 1000) + (new Date()).getTime());
}
