import type { LSM } from "."
import { cached } from "./internals/cache"

const key = Symbol("groups")

/**
 * # groups
 *
 * ```ts
 * function LSM.groups<T>(lsm: LSM<T>): T[][];
 * ```
 *
 * Returns the current selections organized into contiguous groups.
 *
 * Each group is an array of consecutive selections, sorted by their position in the selectables array.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c", "d", "e"]);
 *
 * // Select "a", "b" as one group
 * lsm = LSM.goTo(lsm, "a");
 * lsm = LSM.selectNext(lsm);
 *
 * // Add "d", "e" as another group
 * lsm = LSM.select(lsm, "d");
 * lsm = LSM.selectNext(lsm);
 *
 * LSM.groups(lsm); // [["a", "b"], ["d", "e"]]
 * ```
 *
 */
export function groups<T>(lsm: LSM<T>): T[][] {
    return cached(lsm, key, () => {
        const positions = lsm.selectables.reduce((acc, key, idx) => {
            return acc.set(key, idx)
        }, new Map<T, number>())

        return lsm.selected
            .toSorted((a, b) => positions.get(a)! - positions.get(b)!)
            .reduce((groups, key) => {
                const group = groups.at(-1)

                if (group && positions.get(group.at(-1)!) === positions.get(key)! - 1) {
                    group.push(key)
                    return groups
                }

                groups.push([key])
                return groups
            }, [] as T[][])
    })
}
