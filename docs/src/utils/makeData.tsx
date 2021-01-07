import React from "react";
import { loremIpsum } from "lorem-ipsum";

function newPerson(): object {
    const age: number = Math.floor(Math.random() * 30);
    return {
        firstName: loremIpsum({ units: "words", count: 1 }),
        lastName: loremIpsum({ units: "words", count: 1 }),
        age,
        status: age % 2 === 0 ? "single" : "in relationship",
    };
}

function range(len: number): Array<number> {
    const arr: Array<number> = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
}

export default function makeData<T>(lens: Array<number>, useRowActionColumn?: boolean): T {
    const makeDataLevel: Function = (depth: number = 0): object | Function => {
        const len: number = lens[depth];
        return range(len).map((d: number) => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
                rowContentDetail: <p className="details"> {loremIpsum({ units: "sentences", count: 2 })} </p>,
            };
        });
    };

    return makeDataLevel();
}
