import type { LSM } from "."

/**
 * # hasSelection
 *
 * ```ts
 * function LSM.hasSelection<T>(lsm: LSM<T>): boolean;
 * ```
 *
 * Returns `true` if at least one item is selected.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c"]);
 *
 * LSM.hasSelection(lsm); // false
 *
 * lsm = LSM.goTo(lsm, "a");
 * LSM.hasSelection(lsm); // true
 * ```
 *
 */
export function hasSelection<T>(lsm: LSM<T>): boolean {
    return lsm.selected.length > 0
}
