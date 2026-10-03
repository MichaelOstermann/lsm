import type { LSM } from "../"
import { arraysShallowEqual } from "./arraysShallowEqual"
import { mergeState } from "./mergeState"

export function addSelected<T>(lsm: LSM<T>, keys: readonly T[]): LSM<T> {
    const slice = lsm.selected.slice(-keys.length)
    if (arraysShallowEqual(slice, keys)) return lsm
    const added = new Set(keys)
    return mergeState(lsm, {
        selected: lsm.selected.filter(k => !added.has(k)).concat(keys),
    })
}
