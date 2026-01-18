import type { LSM } from "."

/**
 * # isLastSelection
 *
 * ```ts
 * function LSM.isLastSelection<T>(lsm: LSM<T>, selectable: T): boolean;
 * ```
 *
 * Returns `true` if the item is the last in the selection order.
 *
 * The selection order reflects the order in which items were selected, not their position in the selectables array.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c"]);
 * lsm = LSM.goTo(lsm, "b");
 * lsm = LSM.select(lsm, "a");
 *
 * LSM.isLastSelection(lsm, "a"); // true
 * LSM.isLastSelection(lsm, "b"); // false
 * ```
 *
 */
export function isLastSelection<T>(lsm: LSM<T>, selectable: T): boolean {
    return lsm.selected.at(-1) === selectable
}
