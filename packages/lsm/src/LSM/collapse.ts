import type { LSM } from "."
import { anchor } from "./anchor"
import { goTo } from "./goTo"

/**
 * # collapse
 *
 * ```ts
 * function LSM.collapse<T>(lsm: LSM<T>): LSM<T>;
 * ```
 *
 * Collapses the selection to only the current anchor.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c", "d", "e"]);
 * lsm = LSM.goTo(lsm, "b");
 * lsm = LSM.selectNext(lsm);
 * lsm = LSM.selectNext(lsm);
 *
 * lsm.selected; // ["b", "c", "d"]
 *
 * lsm = LSM.collapse(lsm);
 * lsm.selected; // ["b"]
 * ```
 *
 */
export function collapse<T>(lsm: LSM<T>): LSM<T> {
    const key = anchor(lsm)
    if (key === undefined) return lsm
    return goTo(lsm, key)
}
