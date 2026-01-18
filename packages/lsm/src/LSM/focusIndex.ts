import type { LSM } from "."
import { focus } from "./focus"

/**
 * # focusIndex
 *
 * ```ts
 * function LSM.focusIndex<T>(lsm: LSM<T>): number;
 * ```
 *
 * Returns the index of the current focus within the selectables array.
 *
 * Returns `-1` if there is no focus.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c", "d", "e"]);
 * lsm = LSM.goTo(lsm, "b");
 * lsm = LSM.selectNext(lsm);
 *
 * LSM.focusIndex(lsm); // 2 (index of "c")
 * ```
 *
 */
export function focusIndex<T>(lsm: LSM<T>): number {
    const key = focus(lsm)
    if (key === undefined) return -1
    return lsm.selectables.indexOf(key)
}
