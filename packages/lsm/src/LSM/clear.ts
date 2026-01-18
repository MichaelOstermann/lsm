import type { LSM } from "."

/**
 * # clear
 *
 * ```ts
 * function LSM.clear<T>(lsm: LSM<T>): LSM<T>;
 * ```
 *
 * Clears all selections and anchors.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c"]);
 * lsm = LSM.goTo(lsm, "b");
 *
 * lsm.selected; // ["b"]
 *
 * lsm = LSM.clear(lsm);
 * lsm.selected; // []
 * ```
 *
 */
export function clear<T>(lsm: LSM<T>): LSM<T> {
    if (lsm.selected.length === 0) return lsm
    return { ...lsm, anchors: new Set(), cache: {}, selected: [] }
}
