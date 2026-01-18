export type LSM<T> = {
    readonly anchors: ReadonlySet<T>
    readonly cache: Record<symbol, unknown>
    readonly selectables: readonly T[]
    readonly selected: readonly T[]
}
