import { randomId } from "./randomId";

describe("Util: randomId", () => {
    it("Should generate randomId with seed", () => {
        const seed: string = "myseed-";
        const generated: string = randomId(seed);
        const generated2: string = randomId(seed);
        expect(generated.indexOf(seed)).toEqual(0);
        expect(generated).not.toEqual(generated2);
    });
});
