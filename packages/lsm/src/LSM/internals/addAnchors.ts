import type { LSM } from "../"
import { mergeState } from "./mergeState"

export function addAnchors<T>(lsm: LSM<T>, keys: T[]): LSM<T> {
    keys = keys.filter(key => !lsm.anchors.has(key))
    if (!keys.length) return lsm
    const anchors = new Set(lsm.anchors)
    keys.forEach(key => anchors.add(key))
    return mergeState(lsm, { anchors })
}
