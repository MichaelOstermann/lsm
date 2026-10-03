import { describe, expect, it } from "bun:test"
import { LSM } from "../src"

const left = { button: 0, ctrlKey: false, metaKey: false, shiftKey: false }

describe("selectAll", () => {
    it("should select everything when nothing is selected", () => {
        const lsm = LSM.selectAll(LSM.create(["a", "b", "c"]))
        expect(lsm.selected).toEqual(["a", "b", "c"])
    })

    it("should select everything when something is selected", () => {
        const lsm = LSM.selectAll(LSM.goTo(LSM.create(["a", "b", "c"]), "b"))
        expect(lsm.selected.toSorted()).toEqual(["a", "b", "c"])
    })

    it("should allow extending and shrinking the selection afterwards", () => {
        const lsm = LSM.selectAll(LSM.create(["a", "b", "c", "d"]))
        expect(LSM.anchor(lsm)).toBe("a")
        expect(LSM.focus(lsm)).toBe("d")
        expect(LSM.selectPrev(lsm).selected).toEqual(["a", "b", "c"])
        expect(LSM.selectTo(lsm, "b").selected).toEqual(["a", "b"])
    })

    it("should do nothing when everything is selected or there is nothing to select", () => {
        const lsm = LSM.selectAll(LSM.create(["a", "b"]))
        expect(LSM.selectAll(lsm)).toBe(lsm)
        const empty = LSM.create<string>([])
        expect(LSM.selectAll(empty)).toBe(empty)
    })
})

describe("falsy keys", () => {
    it("should go to index 0 with a key of 0", () => {
        expect(LSM.goToIndex(LSM.create([0, 1, 2]), 0).selected).toEqual([0])
        expect(LSM.goToIndex(LSM.create(["", "a"]), 0).selected).toEqual([""])
        expect(LSM.goToIndex(LSM.create([false, true]), 0).selected).toEqual([false])
    })

    it("should ignore positions that do not exist", () => {
        const lsm = LSM.create([0, 1, 2])
        expect(LSM.goToIndex(lsm, 3)).toBe(lsm)
        expect(LSM.goToIndex(lsm, -4)).toBe(lsm)
        expect(LSM.goToIndex(lsm, -1).selected).toEqual([2])
    })

    it("should extend the selection onto a key of 0", () => {
        const lsm = LSM.goTo(LSM.create([0, 1, 2]), 1)
        expect(LSM.selectPrev(lsm).selected).toEqual([1, 0])
        expect(LSM.selectNext(LSM.goTo(LSM.create([1, 0, 2]), 1)).selected).toEqual([1, 0])
    })

    it("should keep a key of 0 as the anchor", () => {
        let lsm = LSM.goTo(LSM.create([2, 1, 0]), 0)
        lsm = LSM.selectPrev(lsm)
        lsm = LSM.selectPrev(lsm)
        expect(LSM.anchor(lsm)).toBe(0)
        expect(LSM.focus(lsm)).toBe(2)
        expect(lsm.anchors.size).toBe(1)
    })
})

describe("anchors", () => {
    it("should keep an anchor when a gap between two selections is filled", () => {
        let lsm = LSM.create(["a", "b", "c", "d"])
        lsm = LSM.select(lsm, "a")
        lsm = LSM.select(lsm, "c")
        lsm = LSM.select(lsm, "b")
        expect(Array.from(lsm.anchors)).toEqual(["a"])
        expect(LSM.selectNext(lsm).selected).toEqual(["a", "c", "b", "d"])
    })
})

describe("multiselect: false", () => {
    const options = { multiselect: false }

    it("should replace the selection when clicking with meta or ctrl", () => {
        let lsm = LSM.goTo(LSM.create(["a", "b", "c"]), "a")
        lsm = LSM.handleMouseEvent(lsm, "b", { ...left, metaKey: true }, options)[1]
        expect(lsm.selected).toEqual(["b"])
        lsm = LSM.handleMouseEvent(lsm, "c", { ...left, ctrlKey: true }, options)[1]
        expect(lsm.selected).toEqual(["c"])
    })

    it("should unselect when clicking the selected item with meta", () => {
        let lsm = LSM.goTo(LSM.create(["a", "b", "c"]), "a")
        lsm = LSM.handleMouseEvent(lsm, "a", { ...left, metaKey: true }, options)[1]
        expect(lsm.selected).toEqual([])
    })

    it("should not extend the selection with shift", () => {
        let lsm = LSM.goTo(LSM.create(["a", "b", "c"]), "a")
        lsm = LSM.handleMouseEvent(lsm, "c", { ...left, shiftKey: true }, options)[1]
        expect(lsm.selected).toEqual(["c"])
        lsm = LSM.handleKeyboardEvent(lsm, { ctrlKey: false, key: "ArrowUp", metaKey: false, shiftKey: true }, options)[1]
        expect(lsm.selected).toEqual(["b"])
    })
})
