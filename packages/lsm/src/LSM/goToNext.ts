import type { LSM } from "."
import { goTo } from "./goTo"
import { goToTop } from "./goToTop"
import { lastSelectedIndex } from "./lastSelectedIndex"

type GoToNextOptions = {
    loopAround?: boolean
    startAtTop?: boolean
}

/**
 * # goToNext
 *
 * ```ts
 * function LSM.goToNext<T>(lsm: LSM<T>, options?: {
 *     loopAround?: boolean;
 *     startAtTop?: boolean;
 * }): LSM<T>;
 * ```
 *
 * Moves the selection to the next item in the list.
 *
 * ## Options
 *
 * - `loopAround` - If `true`, wraps to the first item when at the end. Default: `false`
 * - `startAtTop` - If `true`, starts at the first item when there is no selection. Default: `true`
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c"]);
 *
 * lsm = LSM.goToNext(lsm);
 * lsm.selected; // ["a"]
 *
 * lsm = LSM.goToNext(lsm);
 * lsm.selected; // ["b"]
 *
 * lsm = LSM.goToNext(lsm);
 * lsm.selected; // ["c"]
 *
 * lsm = LSM.goToNext(lsm);
 * lsm.selected; // ["c"] (no change, at end)
 *
 * lsm = LSM.goToNext(lsm, { loopAround: true });
 * lsm.selected; // ["a"]
 * ```
 *
 */
export function goToNext<T>(lsm: LSM<T>, options?: GoToNextOptions): LSM<T> {
    const position = lastSelectedIndex(lsm)

    if (position < 0) {
        return options?.startAtTop !== false
            ? goToTop(lsm)
            : lsm
    }

    if (position === lsm.selectables.length - 1) {
        return options?.loopAround === true
            ? goToTop(lsm)
            : lsm
    }

    return goTo(lsm, lsm.selectables[position + 1]!)
}
