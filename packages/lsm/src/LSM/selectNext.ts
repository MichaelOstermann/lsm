import type { LSM } from "."
import { anchorIndex } from "./anchorIndex"
import { focusIndex } from "./focusIndex"
import { addSelected } from "./internals/addSelected"
import { isSelected } from "./isSelected"
import { normalize } from "./normalize"
import { unselect } from "./unselect"

/**
 * # selectNext
 *
 * ```ts
 * function LSM.selectNext<T>(lsm: LSM<T>): LSM<T>;
 * ```
 *
 * Extends the selection to include the next unselected item in the list.
 *
 * If the focus is before the anchor (selection is "upward"), this will unselect the focus instead of extending downward.
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
 * lsm = LSM.selectNext(lsm);
 * lsm.selected; // ["b", "c"]
 *
 * lsm = LSM.selectNext(lsm);
 * lsm.selected; // ["b", "c", "d"]
 * ```
 *
 */
export function selectNext<T>(lsm: LSM<T>): LSM<T> {
    const anchorPos = anchorIndex(lsm)
    const focusPos = focusIndex(lsm)
    if (anchorPos < 0 || focusPos < 0) return lsm

    if (focusPos < anchorPos)
        return unselect(lsm, lsm.selectables[focusPos]!)

    const selectable = lsm.selectables
        .slice(focusPos)
        .find(selectable => !isSelected(lsm, selectable))

    return selectable
        ? normalize(addSelected(lsm, [selectable]))
        : lsm
}
