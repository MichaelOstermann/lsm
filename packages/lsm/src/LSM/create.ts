import type { LSM } from "."

/**
 * # create
 *
 * ```ts
 * function LSM.create<T>(selectables?: readonly T[]): LSM<T>;
 * ```
 *
 * Creates a new `LSM` instance.
 *
 * Optionally accepts an array of selectable items to initialize the list.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * const lsm = LSM.create(["a", "b", "c"]);
 *
 * lsm.selectables; // ["a", "b", "c"]
 * lsm.selected; // []
 * ```
 *
 */
export function create<T>(selectables?: readonly T[]): LSM<T> {
    return {
        anchors: new Set(),
        cache: {},
        selectables: selectables ?? [],
        selected: [],
    }
}
