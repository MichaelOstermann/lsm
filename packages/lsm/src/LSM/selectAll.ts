import type { LSM } from "."
import { clear } from "./clear"
import { addSelected } from "./internals/addSelected"

/**
 * # selectAll
 *
 * ```ts
 * function LSM.selectAll<T>(lsm: LSM<T>): LSM<T>;
 * ```
 *
 * Selects all items in the selectables array.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c", "d", "e"]);
 * lsm = LSM.goTo(lsm, "b");
 *
 * lsm.selected; // ["b"]
 *
 * lsm = LSM.selectAll(lsm);
 * lsm.selected; // ["a", "b", "c", "d", "e"]
 * ```
 *
 */
export function selectAll<T>(lsm: LSM<T>): LSM<T> {
    if (lsm.selected.length === lsm.selectables.length) return lsm
    if (!lsm.selected.length) return lsm
    lsm = clear(lsm)
    lsm = addSelected(lsm, lsm.selectables)
    return lsm
}
