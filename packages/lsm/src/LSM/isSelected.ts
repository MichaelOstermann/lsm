import type { LSM } from "."

/**
 * # isSelected
 *
 * ```ts
 * function LSM.isSelected<T>(lsm: LSM<T>, selectable: T): boolean;
 * ```
 *
 * Returns `true` if the item is currently selected.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c"]);
 * lsm = LSM.goTo(lsm, "b");
 *
 * LSM.isSelected(lsm, "a"); // false
 * LSM.isSelected(lsm, "b"); // true
 * LSM.isSelected(lsm, "c"); // false
 * ```
 *
 */
export function isSelected<T>(lsm: LSM<T>, selectable: T): boolean {
    return lsm.selected.includes(selectable)
}
