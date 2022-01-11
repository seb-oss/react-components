import React from "react";
import { hasModifierKey } from "./keyboardHelper";

describe("Keyboard Helper", () => {
    function mockKeyDownEvent(e: Partial<KeyboardEvent>): React.KeyboardEvent {
        return new KeyboardEvent("keydown", { ...e, key: "A" }) as any;
    }

    it("Should return truthy value when modifier key is pressed", () => {
        expect(hasModifierKey(mockKeyDownEvent({ altKey: true }))).toBeTruthy();
        expect(hasModifierKey(mockKeyDownEvent({ ctrlKey: true }))).toBeTruthy();
        expect(hasModifierKey(mockKeyDownEvent({ metaKey: true }))).toBeTruthy();
        expect(hasModifierKey(mockKeyDownEvent({ shiftKey: true }))).toBeTruthy();
    });

    it("Should return falsy value when modifier key is not pressed", () => {
        expect(hasModifierKey(mockKeyDownEvent({ key: "B" }))).toBeFalsy();
    });
});
