import type { LSM } from "."
import { goTo } from "./goTo"
import { goToBottom } from "./goToBottom"
import { lastSelectedIndex } from "./lastSelectedIndex"

type GoToPrevOptions = {
    loopAround?: boolean
    startAtBottom?: boolean
}

/**
 * # goToPrev
 *
 * ```ts
 * function LSM.goToPrev<T>(lsm: LSM<T>, options?: {
 *     loopAround?: boolean;
 *     startAtBottom?: boolean;
 * }): LSM<T>;
 * ```
 *
 * Moves the selection to the previous item in the list.
 *
 * ## Options
 *
 * - `loopAround` - If `true`, wraps to the last item when at the beginning. Default: `false`
 * - `startAtBottom` - If `true`, starts at the last item when there is no selection. Default: `true`
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c"]);
 *
 * lsm = LSM.goToPrev(lsm);
 * lsm.selected; // ["c"]
 *
 * lsm = LSM.goToPrev(lsm);
 * lsm.selected; // ["b"]
 *
 * lsm = LSM.goToPrev(lsm);
 * lsm.selected; // ["a"]
 *
 * lsm = LSM.goToPrev(lsm);
 * lsm.selected; // ["a"] (no change, at start)
 *
 * lsm = LSM.goToPrev(lsm, { loopAround: true });
 * lsm.selected; // ["c"]
 * ```
 *
 */
export function goToPrev<T>(lsm: LSM<T>, options?: GoToPrevOptions): LSM<T> {
    const position = lastSelectedIndex(lsm)

    if (position < 0) {
        return options?.startAtBottom !== false
            ? goToBottom(lsm)
            : lsm
    }

    if (position === 0) {
        return options?.loopAround === true
            ? goToBottom(lsm)
            : lsm
    }

    return goTo(lsm, lsm.selectables[position - 1]!)
}
