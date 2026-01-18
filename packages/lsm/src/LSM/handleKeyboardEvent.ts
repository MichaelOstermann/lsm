import type { LSM } from "."
import { goToBottom } from "./goToBottom"
import { goToNext } from "./goToNext"
import { goToPrev } from "./goToPrev"
import { goToTop } from "./goToTop"
import { selectNext } from "./selectNext"
import { selectPrev } from "./selectPrev"
import { selectToBottom } from "./selectToBottom"
import { selectToTop } from "./selectToTop"

/**
 * # handleKeyboardEvent
 *
 * ```ts
 * function LSM.handleKeyboardEvent<T>(
 *     lsm: LSM<T>,
 *     evt: {
 *         ctrlKey: boolean;
 *         key: string;
 *         metaKey: boolean;
 *         shiftKey: boolean;
 *     },
 *     options?: {
 *         multiselect: boolean;
 *     }
 * ): [boolean, LSM<T>];
 * ```
 *
 * Handles keyboard navigation events and returns a tuple of `[handled, newState]`.
 *
 * ## Supported Keys
 *
 * | Key         | Modifier   | Action                               |
 * | ----------- | ---------- | ------------------------------------ |
 * | `ArrowDown` | -          | `goToNext`             |
 * | `ArrowDown` | Shift      | `selectNext`         |
 * | `ArrowDown` | Meta       | `goToBottom`         |
 * | `ArrowDown` | Meta+Shift | `selectToBottom` |
 * | `ArrowUp`   | -          | `goToPrev`             |
 * | `ArrowUp`   | Shift      | `selectPrev`         |
 * | `ArrowUp`   | Meta       | `goToTop`               |
 * | `ArrowUp`   | Meta+Shift | `selectToTop`       |
 * | `Home`      | -          | `goToTop`               |
 * | `Home`      | Shift      | `selectToTop`       |
 * | `End`       | -          | `goToBottom`         |
 * | `End`       | Shift      | `selectToBottom` |
 *
 * ## Options
 *
 * - `multiselect` - If `false`, disables shift-based selection extensions. Default: `true`
 *
 * ## Example
 *
 * ```ts
 * import { LSM } from "@monstermann/lsm";
 *
 * let lsm = LSM.create(["a", "b", "c"]);
 *
 * const [handled, newLsm] = LSM.handleKeyboardEvent(lsm, {
 *     key: "ArrowDown",
 *     shiftKey: false,
 *     metaKey: false,
 *     ctrlKey: false,
 * });
 *
 * handled; // true
 * newLsm.selected; // ["a"]
 * ```
 *
 */
export function handleKeyboardEvent<T>(
    lsm: LSM<T>,
    evt: {
        ctrlKey: boolean
        key: string
        metaKey: boolean
        shiftKey: boolean
    },
    options?: {
        multiselect: boolean
    },
): [boolean, LSM<T>] {
    const multiselect = options?.multiselect !== false

    switch (evt.key) {
        case "ArrowDown":
            if (evt.metaKey && evt.shiftKey && multiselect) return [true, selectToBottom(lsm)]
            if (evt.metaKey) return [true, goToBottom(lsm)]
            if (evt.shiftKey && multiselect) return [true, selectNext(lsm)]
            return [true, goToNext(lsm)]

        case "ArrowUp":
            if (evt.metaKey && evt.shiftKey && multiselect) return [true, selectToTop(lsm)]
            if (evt.metaKey) return [true, goToTop(lsm)]
            if (evt.shiftKey && multiselect) return [true, selectPrev(lsm)]
            return [true, goToPrev(lsm)]

        case "Home":
            if (evt.shiftKey && multiselect) return [true, selectToTop(lsm)]
            return [true, goToTop(lsm)]

        case "End":
            if (evt.shiftKey && multiselect) return [true, selectToBottom(lsm)]
            return [true, goToBottom(lsm)]

        default:
            return [false, lsm]
    }
}
