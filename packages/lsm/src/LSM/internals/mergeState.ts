import type { LSM } from ".."

export function mergeState<T>(lsm: LSM<T>, update: Partial<LSM<T>>): LSM<T> {
    for (const key in update) {
        const k = key as keyof LSM<T>
        if (update[k] === lsm[k]) continue
        return { ...lsm, ...update, cache: {} }
    }
    return lsm
}
