import type { LSM } from "."
import { goTo } from "./goTo"
import { isSelected } from "./isSelected"
import { selectTo } from "./selectTo"
import { toggleSelect } from "./toggleSelect"

/**
 * # handleMouseEvent
 *
 * ```ts
 * function LSM.handleMouseEvent<T>(
 *     lsm: LSM<T>,
 *     selectable: T,
 *     evt: {
 *         button: number;
 *         ctrlKey: boolean;
 *         metaKey: boolean;
 *         shiftKey: boolean;
 *     },
 *     options?: {
 *         multiselect: boolean;
 *     }
 * ): [boolean, LSM<T>];
 * ```
 *
 * Handles mouse click events and returns a tuple of `[handled, newState]`.
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
 * lsm = LSM.goTo(lsm, "a");
 *
 * const [handled, newLsm] = LSM.handleMouseEvent(lsm, "c", {
 *     button: 0,
 *     shiftKey: true,
 *     metaKey: false,
 *     ctrlKey: false,
 * });
 *
 * handled; // true
 * newLsm.selected; // ["a", "b", "c"]
 * ```
 *
 */
export function handleMouseEvent<T>(
    lsm: LSM<T>,
    selectable: T,
    evt: {
        button: number
        ctrlKey: boolean
        metaKey: boolean
        shiftKey: boolean
    },
    options?: {
        multiselect: boolean
    },
): [boolean, LSM<T>] {
    if (evt.button === 0 || evt.button === undefined) {
        if (evt.metaKey || evt.ctrlKey) return [true, toggleSelect(lsm, selectable)]
        if (evt.shiftKey && options?.multiselect !== false) return [true, selectTo(lsm, selectable)]
        return [true, goTo(lsm, selectable)]
    }

    if (evt.button === 2) {
        if (evt.shiftKey && options?.multiselect !== false) return [true, selectTo(lsm, selectable)]
        if (isSelected(lsm, selectable)) return [true, lsm]
        return [true, goTo(lsm, selectable)]
    }

    return [false, lsm]
}
