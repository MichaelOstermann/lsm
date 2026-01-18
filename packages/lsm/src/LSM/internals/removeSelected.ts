import type { LSM } from ".."
import { mergeState } from "./mergeState"
import { removeAnchors } from "./removeAnchors"

export function removeSelected<T>(lsm: LSM<T>, keys: T[]): LSM<T> {
    keys = keys.filter(key => lsm.selected.includes(key))
    if (!keys.length) return lsm
    lsm = mergeState(lsm, { selected: lsm.selected.filter(key => !keys.includes(key)) })
    return removeAnchors(lsm, keys)
}
