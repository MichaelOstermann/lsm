import type { LSM } from "."
import { selectTo } from "./selectTo"

/**
 * # selectToBottom
 *
 * ```ts
 * function LSM.selectToBottom<T>(lsm: LSM<T>): LSM<T>;
 * ```
 *
 * Extends the current selection from the anchor to the last item in the list.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c", "d", "e"]);
 * lsm = LSM.goTo(lsm, "c");
 *
 * lsm.selected; // ["c"]
 *
 * lsm = LSM.selectToBottom(lsm);
 * lsm.selected; // ["c", "d", "e"]
 * ```
 *
 */
export function selectToBottom<T>(lsm: LSM<T>): LSM<T> {
    const selectable = lsm.selectables.at(-1)
    if (selectable === undefined) return lsm
    return selectTo(lsm, selectable)
}
