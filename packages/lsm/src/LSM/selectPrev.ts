import type { LSM } from "."
import { anchorIndex } from "./anchorIndex"
import { focusIndex } from "./focusIndex"
import { addSelected } from "./internals/addSelected"
import { isSelected } from "./isSelected"
import { normalize } from "./normalize"
import { unselect } from "./unselect"

/**
 * # selectPrev
 *
 * ```ts
 * function LSM.selectPrev<T>(lsm: LSM<T>): LSM<T>;
 * ```
 *
 * Extends the selection to include the previous unselected item in the list.
 *
 * If the focus is after the anchor (selection is "downward"), this will unselect the focus instead of extending upward.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c", "d", "e"]);
 * lsm = LSM.goTo(lsm, "d");
 *
 * lsm.selected; // ["d"]
 *
 * lsm = LSM.selectPrev(lsm);
 * lsm.selected; // ["c", "d"]
 *
 * lsm = LSM.selectPrev(lsm);
 * lsm.selected; // ["b", "c", "d"]
 * ```
 *
 */
export function selectPrev<T>(lsm: LSM<T>): LSM<T> {
    const anchorPos = anchorIndex(lsm)
    const focusPos = focusIndex(lsm)
    if (anchorPos < 0 || focusPos < 0) return lsm

    if (focusPos > anchorPos)
        return unselect(lsm, lsm.selectables[focusPos]!)

    const selectable = lsm.selectables
        .slice(0, focusPos + 1)
        .findLast(selectable => !isSelected(lsm, selectable))

    return selectable
        ? normalize(addSelected(lsm, [selectable]))
        : lsm
}
