import type { LSM } from "."
import { clear } from "./clear"
import { addAnchors } from "./internals/addAnchors"
import { addSelected } from "./internals/addSelected"
import { normalize } from "./normalize"

/**
 * # goTo
 *
 * ```ts
 * function LSM.goTo<T>(lsm: LSM<T>, selectable: T): LSM<T>;
 * ```
 *
 * Clears the current selection and selects a single item.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c", "d", "e"]);
 *
 * lsm = LSM.goTo(lsm, "c");
 * lsm.selected; // ["c"]
 *
 * lsm = LSM.goTo(lsm, "a");
 * lsm.selected; // ["a"]
 * ```
 *
 */
export function goTo<T>(lsm: LSM<T>, selectable: T): LSM<T> {
    if (lsm.selected.length === 1 && lsm.selected.includes(selectable)) return lsm
    lsm = clear(lsm)
    lsm = addSelected(lsm, [selectable])
    lsm = addAnchors(lsm, [selectable])
    return normalize(lsm)
}
