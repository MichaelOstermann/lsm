import type { LSM } from ".."
import { mergeState } from "./mergeState"
import { removeAnchors } from "./removeAnchors"
import { selectedPositions } from "./selectedPositions"

export function removeSelected<T>(lsm: LSM<T>, keys: T[]): LSM<T> {
    if (!keys.length) return lsm
    const selected = selectedPositions(lsm)
    keys = keys.filter(key => selected.has(key))
    if (!keys.length) return lsm
    const removed = new Set(keys)
    lsm = mergeState(lsm, { selected: lsm.selected.filter(key => !removed.has(key)) })
    return removeAnchors(lsm, keys)
}
