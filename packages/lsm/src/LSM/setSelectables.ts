import type { LSM } from "."
import { arraysShallowEqual } from "./internals/arraysShallowEqual"
import { mergeState } from "./internals/mergeState"
import { normalize } from "./normalize"

/**
 * # setSelectables
 *
 * ```ts
 * function LSM.setSelectables<T>(lsm: LSM<T>, selectables: readonly T[]): LSM<T>;
 * ```
 *
 * Updates the list of selectable items.
 *
 * The selection state is automatically normalized after updating, removing any selections that are no longer valid.
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c"]);
 * lsm = LSM.goTo(lsm, "b");
 *
 * lsm.selected; // ["b"]
 * lsm.selectables; // ["a", "b", "c"]
 *
 * lsm = LSM.setSelectables(lsm, ["x", "y", "z"]);
 * lsm.selectables; // ["x", "y", "z"]
 * lsm.selected; // [] (normalized, "b" no longer exists)
 * ```
 *
 */
export function setSelectables<T>(lsm: LSM<T>, selectables: readonly T[]): LSM<T> {
    if (arraysShallowEqual(lsm.selectables, selectables)) return lsm
    lsm = mergeState(lsm, { selectables })
    return normalize(lsm)
}
