import type { LSM } from "."
import { groups } from "./groups"
import { addAnchors } from "./internals/addAnchors"
import { removeAnchors } from "./internals/removeAnchors"
import { removeSelected } from "./internals/removeSelected"

/**
 * # normalize
 *
 * ```ts
 * function LSM.normalize<T>(lsm: LSM<T>): LSM<T>;
 * ```
 *
 * Normalizes the selection state by:
 *
 * 1. Removing selections that are no longer in the selectables array
 * 2. Removing anchors that are no longer selected
 * 3. Ensuring each contiguous group has exactly one anchor at either the beginning or end
 *
 * This function is called automatically by most selection operations, but can be useful after manually modifying the selectables array via `setSelectables`.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c"]);
 * lsm = LSM.goTo(lsm, "b");
 *
 * // Remove "b" from selectables
 * lsm = LSM.setSelectables(lsm, ["a", "c"]);
 *
 * lsm.selected; // [] (normalized automatically)
 * ```
 *
 */
export function normalize<T>(lsm: LSM<T>): LSM<T> {
    // Remove invalid selections.
    const selectionsToRemove = lsm.selected.filter(key => !lsm.selectables.includes(key))
    lsm = removeSelected(lsm, selectionsToRemove)

    // Remove invalid anchors.
    const anchorsToRemove = Array.from(lsm.anchors).filter(key => !lsm.selected.includes(key))
    lsm = removeAnchors(lsm, anchorsToRemove)

    lsm = normalizeAnchors(lsm)
    return lsm
}

// Make sure that each group contains one anchor, either at the beginning or end.
function normalizeAnchors<T>(lsm: LSM<T>): LSM<T> {
    const anchorsToAdd: T[] = []
    const anchorsToRemove: T[] = []

    for (const group of groups(lsm)) {
        const anchors = group
            .filter(key => lsm.anchors.has(key))
            .sort((a, b) => lsm.selected.indexOf(a) - lsm.selected.indexOf(b))

        const mruAnchor = anchors.pop()

        if (!mruAnchor) {
            anchorsToAdd.push(group.at(0)!)
        }
        else if (mruAnchor !== group.at(0) && mruAnchor !== group.at(-1)) {
            anchorsToAdd.push(group.at(0)!)
            anchorsToRemove.push(mruAnchor)
            anchorsToRemove.push(...anchors)
        }
        else {
            anchorsToRemove.push(...anchors)
        }
    }

    lsm = addAnchors(lsm, anchorsToAdd)
    lsm = removeAnchors(lsm, anchorsToRemove)

    return lsm
}
