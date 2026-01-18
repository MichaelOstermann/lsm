import type { LSM } from "."
import { cached } from "./internals/cache"

const key = Symbol("anchor")

/**
 * # anchor
 *
 * ```ts
 * function LSM.anchor<T>(lsm: LSM<T>): T | undefined;
 * ```
 *
 * Returns the most recently used anchor in the selection.
 *
 * An anchor is the starting point of a selection range. When multiple anchors exist, this returns the one that was most recently added to the selection.
 *
 * Returns `undefined` if there are no selections.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * const lsm = LSM.create(["a", "b", "c", "d", "e"]);
 *
 * LSM.anchor(lsm); // undefined
 *
 * const selected = LSM.goTo(lsm, "c");
 * LSM.anchor(selected); // "c"
 * ```
 *
 */
export function anchor<T>(lsm: LSM<T>): T | undefined {
    return cached(lsm, key, () => {
        return Array
            .from(lsm.anchors)
            .sort((a, b) => lsm.selected.indexOf(a) - lsm.selected.indexOf(b))
            .at(-1)
    })
}
