import { describe, expect, it } from "bun:test"
import { LSM } from "../src"

const items = ["a", "b", "c", "d", "e"]
const create = (...selected: string[]): LSM<string> => selected.reduce((lsm, key) => LSM.select(lsm, key), LSM.create(items))
const key = (key: string, modifiers: { meta?: boolean, shift?: boolean } = {}) => ({ ctrlKey: false, key, metaKey: !!modifiers.meta, shiftKey: !!modifiers.shift })
const click = (modifiers: { button?: number, ctrl?: boolean, meta?: boolean, shift?: boolean } = {}) => ({ button: modifiers.button ?? 0, ctrlKey: !!modifiers.ctrl, metaKey: !!modifiers.meta, shiftKey: !!modifiers.shift })

describe("create", () => {
    it("should start without a selection", () => {
        const lsm = LSM.create(items)
        expect(lsm.selectables).toBe(items)
        expect(lsm.selected).toEqual([])
        expect(LSM.hasNoSelection(lsm)).toBe(true)
        expect(LSM.hasSelection(lsm)).toBe(false)
        expect(LSM.anchor(lsm)).toBe(undefined)
        expect(LSM.focus(lsm)).toBe(undefined)
        expect(LSM.lastSelectedIndex(lsm)).toBe(-1)
        expect(LSM.create().selectables).toEqual([])
    })
})

describe("goTo", () => {
    it("should select a single item", () => {
        const lsm = LSM.goTo(create("a", "c"), "d")
        expect(lsm.selected).toEqual(["d"])
        expect(LSM.anchor(lsm)).toBe("d")
        expect(LSM.focus(lsm)).toBe("d")
        expect(LSM.lastSelectedIndex(lsm)).toBe(3)
    })

    it("should return the same state when nothing changes", () => {
        const lsm = LSM.goTo(LSM.create(items), "b")
        expect(LSM.goTo(lsm, "b")).toBe(lsm)
    })

    it("should go to the top and bottom", () => {
        expect(LSM.goToTop(create("c")).selected).toEqual(["a"])
        expect(LSM.goToBottom(create("c")).selected).toEqual(["e"])
        expect(LSM.goToIndex(create("c"), 1).selected).toEqual(["b"])
        const empty = LSM.create<string>([])
        expect(LSM.goToTop(empty)).toBe(empty)
        expect(LSM.goToBottom(empty)).toBe(empty)
    })

    it("should go to the next item", () => {
        expect(LSM.goToNext(create("b")).selected).toEqual(["c"])
        expect(LSM.goToNext(create("a", "b", "c")).selected).toEqual(["d"])
        expect(LSM.goToNext(LSM.create(items)).selected).toEqual(["a"])
        expect(LSM.goToNext(LSM.create(items), { startAtTop: false }).selected).toEqual([])
        expect(LSM.goToNext(create("e")).selected).toEqual(["e"])
        expect(LSM.goToNext(create("e"), { loopAround: true }).selected).toEqual(["a"])
    })

    it("should go to the previous item", () => {
        expect(LSM.goToPrev(create("b")).selected).toEqual(["a"])
        expect(LSM.goToPrev(LSM.create(items)).selected).toEqual(["e"])
        expect(LSM.goToPrev(LSM.create(items), { startAtBottom: false }).selected).toEqual([])
        expect(LSM.goToPrev(create("a")).selected).toEqual(["a"])
        expect(LSM.goToPrev(create("a"), { loopAround: true }).selected).toEqual(["e"])
    })
})

describe("select", () => {
    it("should add to the selection in the order of selecting", () => {
        const lsm = create("d", "a")
        expect(lsm.selected).toEqual(["d", "a"])
        expect(LSM.isSelected(lsm, "a")).toBe(true)
        expect(LSM.isSelected(lsm, "b")).toBe(false)
        expect(LSM.hasMultipleSelections(lsm)).toBe(true)
        expect(LSM.isFirstSelection(lsm, "d")).toBe(true)
        expect(LSM.isLastSelection(lsm, "a")).toBe(true)
        expect(LSM.anchor(lsm)).toBe("a")
    })

    it("should unselect and toggle", () => {
        expect(LSM.unselect(create("a", "c"), "a").selected).toEqual(["c"])
        expect(LSM.toggleSelect(create("a", "c"), "c").selected).toEqual(["a"])
        expect(LSM.toggleSelect(create("a"), "c").selected).toEqual(["a", "c"])
        const lsm = create("a")
        expect(LSM.unselect(lsm, "b")).toBe(lsm)
    })

    it("should clear and collapse", () => {
        expect(LSM.clear(create("a", "c")).selected).toEqual([])
        expect(LSM.clear(create("a", "c")).anchors.size).toBe(0)
        expect(LSM.collapse(create("a", "c")).selected).toEqual(["c"])
        const empty = LSM.create(items)
        expect(LSM.clear(empty)).toBe(empty)
        expect(LSM.collapse(empty)).toBe(empty)
    })
})

describe("groups", () => {
    it("should group adjacent selections in the order of the list", () => {
        const lsm = create("e", "b", "a", "d")
        expect(LSM.groups(lsm)).toEqual([["a", "b"], ["d", "e"]])
        expect(LSM.isFirstSelectionInGroup(lsm, "a")).toBe(true)
        expect(LSM.isFirstSelectionInGroup(lsm, "d")).toBe(true)
        expect(LSM.isFirstSelectionInGroup(lsm, "b")).toBe(false)
        expect(LSM.isLastSelectionInGroup(lsm, "b")).toBe(true)
        expect(LSM.isLastSelectionInGroup(lsm, "e")).toBe(true)
        expect(LSM.anchorGroup(lsm)).toEqual(["d", "e"])
    })

    it("should keep one anchor per group, at one of its ends", () => {
        const lsm = create("a", "c", "b")
        expect(LSM.groups(lsm)).toEqual([["a", "b", "c"]])
        expect(lsm.anchors.size).toBe(1)
        expect(["a", "c"]).toContain(LSM.anchor(lsm)!)
    })
})

describe("selectTo", () => {
    it("should select the range between the anchor and the item", () => {
        const down = LSM.selectTo(create("b"), "d")
        expect(down.selected).toEqual(["b", "c", "d"])
        expect(LSM.anchor(down)).toBe("b")
        expect(LSM.focus(down)).toBe("d")
        expect(LSM.anchorIndex(down)).toBe(1)
        expect(LSM.focusIndex(down)).toBe(3)

        const up = LSM.selectTo(create("d"), "b")
        expect(up.selected.toSorted()).toEqual(["b", "c", "d"])
        expect(LSM.anchor(up)).toBe("d")
        expect(LSM.focus(up)).toBe("b")
    })

    it("should replace the range when the item is on the other side of the anchor", () => {
        const lsm = LSM.selectTo(LSM.selectTo(create("c"), "e"), "a")
        expect(lsm.selected.toSorted()).toEqual(["a", "b", "c"])
        expect(LSM.anchor(lsm)).toBe("c")
    })

    it("should leave other groups alone", () => {
        const lsm = LSM.selectTo(create("a", "d"), "e")
        expect(LSM.groups(lsm)).toEqual([["a"], ["d", "e"]])
    })

    it("should do nothing without an anchor or for unknown items", () => {
        const empty = LSM.create(items)
        expect(LSM.selectTo(empty, "c")).toBe(empty)
        const lsm = create("a")
        expect(LSM.selectTo(lsm, "x")).toBe(lsm)
    })

    it("should select to the top and bottom", () => {
        expect(LSM.selectToTop(create("c")).selected.toSorted()).toEqual(["a", "b", "c"])
        expect(LSM.selectToBottom(create("c")).selected).toEqual(["c", "d", "e"])
    })
})

describe("selectNext and selectPrev", () => {
    it("should extend the selection away from the anchor", () => {
        expect(LSM.selectNext(create("b")).selected).toEqual(["b", "c"])
        expect(LSM.selectNext(LSM.selectNext(create("b"))).selected).toEqual(["b", "c", "d"])
        expect(LSM.selectPrev(create("b")).selected).toEqual(["b", "a"])
    })

    it("should shrink the selection towards the anchor", () => {
        const lsm = LSM.selectNext(LSM.selectNext(create("b")))
        expect(LSM.selectPrev(lsm).selected).toEqual(["b", "c"])
        expect(LSM.selectNext(LSM.selectPrev(create("b"))).selected).toEqual(["b"])
    })

    it("should stop at the ends of the list", () => {
        const bottom = create("e")
        expect(LSM.selectNext(bottom)).toBe(bottom)
        const top = create("a")
        expect(LSM.selectPrev(top)).toBe(top)
    })

    it("should merge with a group that is in the way", () => {
        const lsm = LSM.selectNext(LSM.select(create("d"), "b"))
        expect(LSM.groups(lsm)).toEqual([["b", "c", "d"]])
    })

    it("should do nothing without a selection", () => {
        const empty = LSM.create(items)
        expect(LSM.selectNext(empty)).toBe(empty)
        expect(LSM.selectPrev(empty)).toBe(empty)
    })
})

describe("setSelectables", () => {
    it("should drop selections that are gone", () => {
        const lsm = LSM.setSelectables(create("a", "c", "e"), ["a", "b", "e"])
        expect(lsm.selected).toEqual(["a", "e"])
        expect(Array.from(lsm.anchors).toSorted()).toEqual(["a", "e"])
    })

    it("should regroup when the order changes", () => {
        const lsm = LSM.setSelectables(create("a", "b"), ["a", "c", "b"])
        expect(LSM.groups(lsm)).toEqual([["a"], ["b"]])
    })

    it("should return the same state for the same items", () => {
        const lsm = create("a")
        expect(LSM.setSelectables(lsm, [...items])).toBe(lsm)
    })
})

describe("handleKeyboardEvent", () => {
    it("should move with the arrow keys", () => {
        expect(LSM.handleKeyboardEvent(create("b"), key("ArrowDown"))[1].selected).toEqual(["c"])
        expect(LSM.handleKeyboardEvent(create("b"), key("ArrowUp"))[1].selected).toEqual(["a"])
        expect(LSM.handleKeyboardEvent(create("b"), key("ArrowDown", { meta: true }))[1].selected).toEqual(["e"])
        expect(LSM.handleKeyboardEvent(create("b"), key("ArrowUp", { meta: true }))[1].selected).toEqual(["a"])
        expect(LSM.handleKeyboardEvent(create("b"), key("Home"))[1].selected).toEqual(["a"])
        expect(LSM.handleKeyboardEvent(create("b"), key("End"))[1].selected).toEqual(["e"])
    })

    it("should extend with shift", () => {
        expect(LSM.handleKeyboardEvent(create("b"), key("ArrowDown", { shift: true }))[1].selected).toEqual(["b", "c"])
        expect(LSM.handleKeyboardEvent(create("b"), key("ArrowUp", { shift: true }))[1].selected).toEqual(["b", "a"])
        expect(LSM.handleKeyboardEvent(create("c"), key("ArrowDown", { meta: true, shift: true }))[1].selected).toEqual(["c", "d", "e"])
        expect(LSM.handleKeyboardEvent(create("c"), key("End", { shift: true }))[1].selected).toEqual(["c", "d", "e"])
        expect(LSM.handleKeyboardEvent(create("c"), key("Home", { shift: true }))[1].selected.toSorted()).toEqual(["a", "b", "c"])
    })

    it("should report whether the event was handled", () => {
        const lsm = create("b")
        expect(LSM.handleKeyboardEvent(lsm, key("ArrowDown"))[0]).toBe(true)
        expect(LSM.handleKeyboardEvent(lsm, key("Enter"))).toEqual([false, lsm])
    })
})

describe("handleMouseEvent", () => {
    it("should select the clicked item", () => {
        expect(LSM.handleMouseEvent(create("a", "b"), "d", click())[1].selected).toEqual(["d"])
    })

    it("should toggle with meta or ctrl", () => {
        expect(LSM.handleMouseEvent(create("a"), "c", click({ meta: true }))[1].selected).toEqual(["a", "c"])
        expect(LSM.handleMouseEvent(create("a", "c"), "c", click({ ctrl: true }))[1].selected).toEqual(["a"])
    })

    it("should select a range with shift", () => {
        expect(LSM.handleMouseEvent(create("b"), "d", click({ shift: true }))[1].selected).toEqual(["b", "c", "d"])
    })

    it("should keep the selection when right clicking a selected item", () => {
        const lsm = create("a", "c")
        expect(LSM.handleMouseEvent(lsm, "c", click({ button: 2 }))).toEqual([true, lsm])
        expect(LSM.handleMouseEvent(lsm, "d", click({ button: 2 }))[1].selected).toEqual(["d"])
    })

    it("should ignore other buttons", () => {
        const lsm = create("a")
        expect(LSM.handleMouseEvent(lsm, "c", click({ button: 1 }))).toEqual([false, lsm])
    })
})
