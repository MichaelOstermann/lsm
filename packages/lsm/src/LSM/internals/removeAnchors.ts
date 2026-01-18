import type { LSM } from ".."
import { mergeState } from "./mergeState"

export function removeAnchors<T>(lsm: LSM<T>, keys: T[]): LSM<T> {
    keys = keys.filter(key => lsm.anchors.has(key))
    if (!keys.length) return lsm
    const anchors = new Set(lsm.anchors)
    keys.forEach(key => anchors.delete(key))
    return mergeState(lsm, { anchors })
}
