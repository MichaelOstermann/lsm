import type { LSM } from "."
import { groups } from "./groups"

/**
 * # isFirstSelectionInGroup
 *
 * ```ts
 * function LSM.isFirstSelectionInGroup<T>(lsm: LSM<T>, selectable: T): boolean;
 * ```
 *
 * Returns `true` if the item is the first selection in any contiguous group.
 *
 * Groups are determined by position in the selectables array, not selection order.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c", "d", "e"]);
 * lsm = LSM.goTo(lsm, "b");
 * lsm = LSM.selectNext(lsm);
 * lsm = LSM.select(lsm, "e");
 *
 * // Groups: [["b", "c"], ["e"]]
 *
 * LSM.isFirstSelectionInGroup(lsm, "b"); // true
 * LSM.isFirstSelectionInGroup(lsm, "c"); // false
 * LSM.isFirstSelectionInGroup(lsm, "e"); // true
 * ```
 *
 */
export function isFirstSelectionInGroup<T>(lsm: LSM<T>, selectable: T): boolean {
    return groups(lsm).some(group => group.at(0) === selectable)
}
