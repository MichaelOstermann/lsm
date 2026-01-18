import type { LSM } from "."
import { selectTo } from "./selectTo"

/**
 * # selectToTop
 *
 * ```ts
 * function LSM.selectToTop<T>(lsm: LSM<T>): LSM<T>;
 * ```
 *
 * Extends the current selection from the anchor to the first item in the list.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c", "d", "e"]);
 * lsm = LSM.goTo(lsm, "c");
 *
 * lsm.selected; // ["c"]
 *
 * lsm = LSM.selectToTop(lsm);
 * lsm.selected; // ["a", "b", "c"]
 * ```
 *
 */
export function selectToTop<T>(lsm: LSM<T>): LSM<T> {
    const selectable = lsm.selectables.at(0)
    if (selectable === undefined) return lsm
    return selectTo(lsm, selectable)
}
