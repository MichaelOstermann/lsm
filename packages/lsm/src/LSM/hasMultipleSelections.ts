import type { LSM } from "."

/**
 * # hasMultipleSelections
 *
 * ```ts
 * function LSM.hasMultipleSelections<T>(lsm: LSM<T>): boolean;
 * ```
 *
 * Returns `true` if more than one item is selected.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c"]);
 *
 * LSM.hasMultipleSelections(lsm); // false
 *
 * lsm = LSM.goTo(lsm, "a");
 * LSM.hasMultipleSelections(lsm); // false
 *
 * lsm = LSM.selectNext(lsm);
 * LSM.hasMultipleSelections(lsm); // true
 * ```
 *
 */
export function hasMultipleSelections<T>(lsm: LSM<T>): boolean {
    return lsm.selected.length > 1
}
