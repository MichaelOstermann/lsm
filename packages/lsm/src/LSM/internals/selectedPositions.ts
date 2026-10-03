import type { LSM } from ".."
import { cached } from "./cache"

const key = Symbol("selectedPositions")

export function selectedPositions<T>(lsm: LSM<T>): ReadonlyMap<T, number> {
    return cached(lsm, key, () => new Map(lsm.selected.map((key, idx) => [key, idx])))
}
