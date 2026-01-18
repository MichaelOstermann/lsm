import type { LSM } from "."
import { goTo } from "./goTo"

/**
 * # goToBottom
 *
 * ```ts
 * function LSM.goToBottom<T>(lsm: LSM<T>): LSM<T>;
 * ```
 *
 * Clears the current selection and selects the last item in the list.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c", "d", "e"]);
 *
 * lsm = LSM.goToBottom(lsm);
 * lsm.selected; // ["e"]
 * ```
 *
 */
export function goToBottom<T>(lsm: LSM<T>): LSM<T> {
    const selectable = lsm.selectables.at(-1)
    if (selectable === undefined) return lsm
    return goTo(lsm, selectable)
}
