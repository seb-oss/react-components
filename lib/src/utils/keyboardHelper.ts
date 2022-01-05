export enum Key {
    ArrowDown = "ArrowDown",
    ArrowUp = "ArrowUp",
    ArrowLeft = "ArrowLeft",
    ArrowRight = "ArrowRight",
    Escape = "Escape",
    End = "End",
    Enter = "Enter",
    Home = "Home",
    PageDown = "PageDown",
    PageUp = "PageUp",
    Space = " ",
    Tab = "Tab",
    Delete = "Delete",
}

/**
 * Detect if a modifier key is pressed along with the current key event.
 *
 * @param {object} event - Keyboard event
 * @returns true if key pressed is combined with modifier key, false otherwise
 */
export function hasModifierKey({ altKey, ctrlKey, metaKey, shiftKey }: React.KeyboardEvent) {
    return altKey || ctrlKey || metaKey || shiftKey;
}
