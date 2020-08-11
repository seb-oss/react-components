import React from "react";
import { loremIpsum } from "lorem-ipsum";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";

function range(len: number): Array<number> {
  const arr: Array<number> = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

function newPerson(): object {
  const statusChance: number = Math.random();
  return {
    id: parseInt(randomId("").substr(8, 4), 10),
    firstName: loremIpsum({ units: "words", count: 1 }),
    lastName: loremIpsum({ units: "words", count: 1 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
          ? "complicated"
          : "single",
  };
};

export default function makeData<T>(lens: Array<number>): T {
  const makeDataLevel: Function = (depth: number = 0): object | Function => {
    const len: number = lens[depth]
    return range(len).map((d: number) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        rowContentDetail: <p className="details">
          {loremIpsum({ units: "sentences", count: 2 })}
        </p>
      }
    })
  }

  return makeDataLevel();
}
