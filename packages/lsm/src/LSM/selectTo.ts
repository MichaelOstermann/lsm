import type { LSM } from "."
import { anchorGroup } from "./anchorGroup"
import { anchorIndex } from "./anchorIndex"
import { addSelected } from "./internals/addSelected"
import { removeSelected } from "./internals/removeSelected"
import { normalize } from "./normalize"

/**
 * # selectTo
 *
 * ```ts
 * function LSM.selectTo<T>(lsm: LSM<T>, selectable: T): LSM<T>;
 * ```
 *
 * Extends the current anchor group's selection to include all items between the anchor and the specified item.
 *
 * Items outside the anchor-to-target range within the same group will be unselected.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c", "d", "e"]);
 * lsm = LSM.goTo(lsm, "b");
 *
 * lsm.selected; // ["b"]
 *
 * lsm = LSM.selectTo(lsm, "e");
 * lsm.selected; // ["b", "c", "d", "e"]
 *
 * lsm = LSM.selectTo(lsm, "c");
 * lsm.selected; // ["b", "c"]
 * ```
 *
 */
export function selectTo<T>(lsm: LSM<T>, selectable: T): LSM<T> {
    const group = anchorGroup(lsm)
    const anchorPos = anchorIndex(lsm)
    const focusPos = lsm.selected.indexOf(selectable)
    if (!group || anchorPos < 0 || focusPos < 0) return lsm

    const startPos = Math.min(anchorPos, focusPos)
    const endPos = Math.max(anchorPos, focusPos)

    const keys = lsm.selectables.slice(startPos, endPos + 1)
    if (focusPos < anchorPos) keys.reverse()

    lsm = removeSelected(lsm, group.filter(key => !keys.includes(key)))
    lsm = addSelected(lsm, keys)
    return normalize(lsm)
}
