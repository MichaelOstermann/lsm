const cache = new WeakMap<readonly unknown[], ReadonlyMap<unknown, number>>()

export function selectablePositions<T>(selectables: readonly T[]): ReadonlyMap<T, number> {
    let positions = cache.get(selectables)
    if (!positions) {
        positions = new Map(selectables.map((key, idx) => [key, idx]))
        cache.set(selectables, positions)
    }
    return positions as ReadonlyMap<T, number>
}
