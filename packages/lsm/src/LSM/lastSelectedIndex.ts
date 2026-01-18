import type { LSM } from "."

/**
 * # lastSelectedIndex
 *
 * ```ts
 * function LSM.lastSelectedIndex<T>(lsm: LSM<T>): number;
 * ```
 *
 * Returns the index of the most recently selected item within the selectables array.
 *
 * Returns `-1` if there is no selection.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c", "d", "e"]);
 *
 * LSM.lastSelectedIndex(lsm); // -1
 *
 * lsm = LSM.goTo(lsm, "b");
 * LSM.lastSelectedIndex(lsm); // 1
 *
 * lsm = LSM.selectNext(lsm);
 * LSM.lastSelectedIndex(lsm); // 2
 * ```
 *
 */
export function lastSelectedIndex<T>(lsm: LSM<T>): number {
    const key = lsm.selected.at(-1)
    if (key === undefined) return -1
    return lsm.selectables.indexOf(key)
}
