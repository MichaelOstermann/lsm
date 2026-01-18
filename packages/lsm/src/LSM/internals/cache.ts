import type { LSM } from ".."

export function cached<T, U>(lsm: LSM<T>, key: symbol, fn: () => U): U {
    return lsm.cache[key] ??= fn() as any
}
