import type { LSM } from "."
import { anchor } from "./anchor"
import { groups } from "./groups"

/**
 * # anchorGroup
 *
 * ```ts
 * function LSM.anchorGroup<T>(lsm: LSM<T>): T[];
 * ```
 *
 * Returns the contiguous group of selections that contains the current anchor.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c", "d", "e"]);
 *
 * lsm = LSM.goTo(lsm, "b");
 * lsm = LSM.selectNext(lsm); // selects "b", "c"
 *
 * LSM.anchorGroup(lsm); // ["b", "c"]
 * ```
 *
 */
export function anchorGroup<T>(lsm: LSM<T>): T[] {
    const key = anchor(lsm)
    if (key === undefined) return []
    return groups(lsm).find(group => group.includes(key)) ?? []
}
