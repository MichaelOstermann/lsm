<div align="center">

<h1>lsm</h1>

![Minified](https://img.shields.io/badge/Minified-5.36_KB-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff) ![Minzipped](https://img.shields.io/badge/Minzipped-1.56_KB-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff)

**List-selection-manager loosely modeled after MacOS Finder.**

[Documentation](https://MichaelOstermann.github.io/lsm)

</div>

## Example

```ts
import { LSM } from "@monstermann/lsm";

// Create a list with selectable items
let lsm = LSM.create(["a", "b", "c", "d", "e"]);

// Navigate to an item
lsm = LSM.goTo(lsm, "b");
lsm.selected; // ["b"]

// Extend selection downward (like Shift+ArrowDown)
lsm = LSM.selectNext(lsm);
lsm.selected; // ["b", "c"]

// Add a separate selection (like Cmd+Click)
lsm = LSM.select(lsm, "e");
lsm.selected; // ["b", "c", "e"]

// Check selection groups
LSM.groups(lsm); // [["b", "c"], ["e"]]

// Handle keyboard events
const [handled, newLsm] = LSM.handleKeyboardEvent(lsm, {
    key: "ArrowDown",
    shiftKey: true,
    metaKey: false,
    ctrlKey: false,
});

// Handle mouse events
const [handled2, newLsm2] = LSM.handleMouseEvent(lsm, "d", {
    button: 0,
    shiftKey: true,
    metaKey: false,
    ctrlKey: false,
});
```

## Installation

```sh [npm]
npm install @monstermann/lsm
```

```sh [pnpm]
pnpm add @monstermann/lsm
```

```sh [yarn]
yarn add @monstermann/lsm
```

```sh [bun]
bun add @monstermann/lsm
```

## Tree-shaking

### Installation

```sh [npm]
npm install -D @monstermann/unplugin-lsm
```

```sh [pnpm]
pnpm -D add @monstermann/unplugin-lsm
```

```sh [yarn]
yarn -D add @monstermann/unplugin-lsm
```

```sh [bun]
bun -D add @monstermann/unplugin-lsm
```

### Usage

```ts [Vite]
// vite.config.ts
import lsm from "@monstermann/unplugin-lsm/vite";

export default defineConfig({
    plugins: [lsm()],
});
```

```ts [Rollup]
// rollup.config.js
import lsm from "@monstermann/unplugin-lsm/rollup";

export default {
    plugins: [lsm()],
};
```

```ts [Rolldown]
// rolldown.config.js
import lsm from "@monstermann/unplugin-lsm/rolldown";

export default {
    plugins: [lsm()],
};
```

```ts [Webpack]
// webpack.config.js
const lsm = require("@monstermann/unplugin-lsm/webpack");

module.exports = {
    plugins: [lsm()],
};
```

```ts [Rspack]
// rspack.config.js
const lsm = require("@monstermann/unplugin-lsm/rspack");

module.exports = {
    plugins: [lsm()],
};
```

```ts [ESBuild]
// esbuild.config.js
import { build } from "esbuild";
import lsm from "@monstermann/unplugin-lsm/esbuild";

build({
    plugins: [lsm()],
});
```

## LSM

### anchor

```ts
function LSM.anchor<T>(lsm: LSM<T>): T | undefined;
```

Returns the most recently used anchor in the selection.

An anchor is the starting point of a selection range. When multiple anchors exist, this returns the one that was most recently added to the selection.

Returns `undefined` if there are no selections.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

const lsm = LSM.create(["a", "b", "c", "d", "e"]);

LSM.anchor(lsm); // undefined

const selected = LSM.goTo(lsm, "c");
LSM.anchor(selected); // "c"
```

### anchorGroup

```ts
function LSM.anchorGroup<T>(lsm: LSM<T>): T[];
```

Returns the contiguous group of selections that contains the current anchor.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);

lsm = LSM.goTo(lsm, "b");
lsm = LSM.selectNext(lsm); // selects "b", "c"

LSM.anchorGroup(lsm); // ["b", "c"]
```

### anchorIndex

```ts
function LSM.anchorIndex<T>(lsm: LSM<T>): number;
```

Returns the index of the current anchor within the selectables array.

Returns `-1` if there is no anchor.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);

LSM.anchorIndex(lsm); // -1

lsm = LSM.goTo(lsm, "c");
LSM.anchorIndex(lsm); // 2
```

### clear

```ts
function LSM.clear<T>(lsm: LSM<T>): LSM<T>;
```

Clears all selections and anchors.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "b");

lsm.selected; // ["b"]

lsm = LSM.clear(lsm);
lsm.selected; // []
```

### collapse

```ts
function LSM.collapse<T>(lsm: LSM<T>): LSM<T>;
```

Collapses the selection to only the current anchor.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "b");
lsm = LSM.selectNext(lsm);
lsm = LSM.selectNext(lsm);

lsm.selected; // ["b", "c", "d"]

lsm = LSM.collapse(lsm);
lsm.selected; // ["b"]
```

### create

```ts
function LSM.create<T>(selectables?: readonly T[]): LSM<T>;
```

Creates a new `LSM` instance.

Optionally accepts an array of selectable items to initialize the list.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

const lsm = LSM.create(["a", "b", "c"]);

lsm.selectables; // ["a", "b", "c"]
lsm.selected; // []
```

### focus

```ts
function LSM.focus<T>(lsm: LSM<T>): T | undefined;
```

Returns the focus of the current selection group.

The focus is the opposite end of the selection range from the anchor. If the anchor is at the start of the group, focus returns the end, and vice versa.

Returns `undefined` if there is no selection.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "b");
lsm = LSM.selectNext(lsm);
lsm = LSM.selectNext(lsm);

LSM.anchor(lsm); // "b"
LSM.focus(lsm); // "d"
```

### focusIndex

```ts
function LSM.focusIndex<T>(lsm: LSM<T>): number;
```

Returns the index of the current focus within the selectables array.

Returns `-1` if there is no focus.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "b");
lsm = LSM.selectNext(lsm);

LSM.focusIndex(lsm); // 2 (index of "c")
```

### goTo

```ts
function LSM.goTo<T>(lsm: LSM<T>, selectable: T): LSM<T>;
```

Clears the current selection and selects a single item.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);

lsm = LSM.goTo(lsm, "c");
lsm.selected; // ["c"]

lsm = LSM.goTo(lsm, "a");
lsm.selected; // ["a"]
```

### goToBottom

```ts
function LSM.goToBottom<T>(lsm: LSM<T>): LSM<T>;
```

Clears the current selection and selects the last item in the list.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);

lsm = LSM.goToBottom(lsm);
lsm.selected; // ["e"]
```

### goToIndex

```ts
function LSM.goToIndex<T>(lsm: LSM<T>, position: number): LSM<T>;
```

Clears the current selection and selects the item at the specified index.

Supports negative indices (e.g., `-1` for the last item).

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);

lsm = LSM.goToIndex(lsm, 2);
lsm.selected; // ["c"]

lsm = LSM.goToIndex(lsm, -1);
lsm.selected; // ["e"]
```

### goToNext

```ts
function LSM.goToNext<T>(lsm: LSM<T>, options?: {
    loopAround?: boolean;
    startAtTop?: boolean;
}): LSM<T>;
```

Moves the selection to the next item in the list.

#### Options

- `loopAround` - If `true`, wraps to the first item when at the end. Default: `false`
- `startAtTop` - If `true`, starts at the first item when there is no selection. Default: `true`

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);

lsm = LSM.goToNext(lsm);
lsm.selected; // ["a"]

lsm = LSM.goToNext(lsm);
lsm.selected; // ["b"]

lsm = LSM.goToNext(lsm);
lsm.selected; // ["c"]

lsm = LSM.goToNext(lsm);
lsm.selected; // ["c"] (no change, at end)

lsm = LSM.goToNext(lsm, { loopAround: true });
lsm.selected; // ["a"]
```

### goToPrev

```ts
function LSM.goToPrev<T>(lsm: LSM<T>, options?: {
    loopAround?: boolean;
    startAtBottom?: boolean;
}): LSM<T>;
```

Moves the selection to the previous item in the list.

#### Options

- `loopAround` - If `true`, wraps to the last item when at the beginning. Default: `false`
- `startAtBottom` - If `true`, starts at the last item when there is no selection. Default: `true`

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);

lsm = LSM.goToPrev(lsm);
lsm.selected; // ["c"]

lsm = LSM.goToPrev(lsm);
lsm.selected; // ["b"]

lsm = LSM.goToPrev(lsm);
lsm.selected; // ["a"]

lsm = LSM.goToPrev(lsm);
lsm.selected; // ["a"] (no change, at start)

lsm = LSM.goToPrev(lsm, { loopAround: true });
lsm.selected; // ["c"]
```

### goToTop

```ts
function LSM.goToTop<T>(lsm: LSM<T>): LSM<T>;
```

Clears the current selection and selects the first item in the list.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);

lsm = LSM.goToTop(lsm);
lsm.selected; // ["a"]
```

### groups

```ts
function LSM.groups<T>(lsm: LSM<T>): T[][];
```

Returns the current selections organized into contiguous groups.

Each group is an array of consecutive selections, sorted by their position in the selectables array.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);

// Select "a", "b" as one group
lsm = LSM.goTo(lsm, "a");
lsm = LSM.selectNext(lsm);

// Add "d", "e" as another group
lsm = LSM.select(lsm, "d");
lsm = LSM.selectNext(lsm);

LSM.groups(lsm); // [["a", "b"], ["d", "e"]]
```

### handleKeyboardEvent

```ts
function LSM.handleKeyboardEvent<T>(
    lsm: LSM<T>,
    evt: {
        ctrlKey: boolean;
        key: string;
        metaKey: boolean;
        shiftKey: boolean;
    },
    options?: {
        multiselect: boolean;
    }
): [boolean, LSM<T>];
```

Handles keyboard navigation events and returns a tuple of `[handled, newState]`.

#### Supported Keys

| Key         | Modifier   | Action           |
| ----------- | ---------- | ---------------- |
| `ArrowDown` | -          | `goToNext`       |
| `ArrowDown` | Shift      | `selectNext`     |
| `ArrowDown` | Meta       | `goToBottom`     |
| `ArrowDown` | Meta+Shift | `selectToBottom` |
| `ArrowUp`   | -          | `goToPrev`       |
| `ArrowUp`   | Shift      | `selectPrev`     |
| `ArrowUp`   | Meta       | `goToTop`        |
| `ArrowUp`   | Meta+Shift | `selectToTop`    |
| `Home`      | -          | `goToTop`        |
| `Home`      | Shift      | `selectToTop`    |
| `End`       | -          | `goToBottom`     |
| `End`       | Shift      | `selectToBottom` |

#### Options

- `multiselect` - If `false`, disables shift-based selection extensions. Default: `true`

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);

const [handled, newLsm] = LSM.handleKeyboardEvent(lsm, {
    key: "ArrowDown",
    shiftKey: false,
    metaKey: false,
    ctrlKey: false,
});

handled; // true
newLsm.selected; // ["a"]
```

### handleMouseEvent

```ts
function LSM.handleMouseEvent<T>(
    lsm: LSM<T>,
    selectable: T,
    evt: {
        button: number;
        ctrlKey: boolean;
        metaKey: boolean;
        shiftKey: boolean;
    },
    options?: {
        multiselect: boolean;
    }
): [boolean, LSM<T>];
```

Handles mouse click events and returns a tuple of `[handled, newState]`.

#### Options

- `multiselect` - If `false`, disables shift-based selection extensions. Default: `true`

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "a");

const [handled, newLsm] = LSM.handleMouseEvent(lsm, "c", {
    button: 0,
    shiftKey: true,
    metaKey: false,
    ctrlKey: false,
});

handled; // true
newLsm.selected; // ["a", "b", "c"]
```

### hasMultipleSelections

```ts
function LSM.hasMultipleSelections<T>(lsm: LSM<T>): boolean;
```

Returns `true` if more than one item is selected.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);

LSM.hasMultipleSelections(lsm); // false

lsm = LSM.goTo(lsm, "a");
LSM.hasMultipleSelections(lsm); // false

lsm = LSM.selectNext(lsm);
LSM.hasMultipleSelections(lsm); // true
```

### hasNoSelection

```ts
function LSM.hasNoSelection<T>(lsm: LSM<T>): boolean;
```

Returns `true` if no items are selected.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);

LSM.hasNoSelection(lsm); // true

lsm = LSM.goTo(lsm, "a");
LSM.hasNoSelection(lsm); // false
```

### hasSelection

```ts
function LSM.hasSelection<T>(lsm: LSM<T>): boolean;
```

Returns `true` if at least one item is selected.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);

LSM.hasSelection(lsm); // false

lsm = LSM.goTo(lsm, "a");
LSM.hasSelection(lsm); // true
```

### isFirstSelection

```ts
function LSM.isFirstSelection<T>(lsm: LSM<T>, selectable: T): boolean;
```

Returns `true` if the item is the first in the selection order.

The selection order reflects the order in which items were selected, not their position in the selectables array.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "b");
lsm = LSM.select(lsm, "a");

LSM.isFirstSelection(lsm, "b"); // true
LSM.isFirstSelection(lsm, "a"); // false
```

### isFirstSelectionInGroup

```ts
function LSM.isFirstSelectionInGroup<T>(lsm: LSM<T>, selectable: T): boolean;
```

Returns `true` if the item is the first selection in any contiguous group.

Groups are determined by position in the selectables array, not selection order.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "b");
lsm = LSM.selectNext(lsm);
lsm = LSM.select(lsm, "e");

// Groups: [["b", "c"], ["e"]]

LSM.isFirstSelectionInGroup(lsm, "b"); // true
LSM.isFirstSelectionInGroup(lsm, "c"); // false
LSM.isFirstSelectionInGroup(lsm, "e"); // true
```

### isLastSelection

```ts
function LSM.isLastSelection<T>(lsm: LSM<T>, selectable: T): boolean;
```

Returns `true` if the item is the last in the selection order.

The selection order reflects the order in which items were selected, not their position in the selectables array.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "b");
lsm = LSM.select(lsm, "a");

LSM.isLastSelection(lsm, "a"); // true
LSM.isLastSelection(lsm, "b"); // false
```

### isLastSelectionInGroup

```ts
function LSM.isLastSelectionInGroup<T>(lsm: LSM<T>, selectable: T): boolean;
```

Returns `true` if the item is the last selection in any contiguous group.

Groups are determined by position in the selectables array, not selection order.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "b");
lsm = LSM.selectNext(lsm);
lsm = LSM.select(lsm, "e");

// Groups: [["b", "c"], ["e"]]

LSM.isLastSelectionInGroup(lsm, "b"); // false
LSM.isLastSelectionInGroup(lsm, "c"); // true
LSM.isLastSelectionInGroup(lsm, "e"); // true
```

### isSelected

```ts
function LSM.isSelected<T>(lsm: LSM<T>, selectable: T): boolean;
```

Returns `true` if the item is currently selected.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "b");

LSM.isSelected(lsm, "a"); // false
LSM.isSelected(lsm, "b"); // true
LSM.isSelected(lsm, "c"); // false
```

### lastSelectedIndex

```ts
function LSM.lastSelectedIndex<T>(lsm: LSM<T>): number;
```

Returns the index of the most recently selected item within the selectables array.

Returns `-1` if there is no selection.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);

LSM.lastSelectedIndex(lsm); // -1

lsm = LSM.goTo(lsm, "b");
LSM.lastSelectedIndex(lsm); // 1

lsm = LSM.selectNext(lsm);
LSM.lastSelectedIndex(lsm); // 2
```

### normalize

```ts
function LSM.normalize<T>(lsm: LSM<T>): LSM<T>;
```

Normalizes the selection state by:

1. Removing selections that are no longer in the selectables array
2. Removing anchors that are no longer selected
3. Ensuring each contiguous group has exactly one anchor at either the beginning or end

This function is called automatically by most selection operations, but can be useful after manually modifying the selectables array via `setSelectables`.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "b");

// Remove "b" from selectables
lsm = LSM.setSelectables(lsm, ["a", "c"]);

lsm.selected; // [] (normalized automatically)
```

### select

```ts
function LSM.select<T>(lsm: LSM<T>, selectable: T): LSM<T>;
```

Adds an item to the current selection without clearing existing selections.

This creates a new anchor at the selected item, enabling independent selection ranges.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "a");

lsm.selected; // ["a"]

lsm = LSM.select(lsm, "c");
lsm.selected; // ["a", "c"]

lsm = LSM.select(lsm, "e");
lsm.selected; // ["a", "c", "e"]
```

### selectAll

```ts
function LSM.selectAll<T>(lsm: LSM<T>): LSM<T>;
```

Selects all items in the selectables array.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "b");

lsm.selected; // ["b"]

lsm = LSM.selectAll(lsm);
lsm.selected; // ["a", "b", "c", "d", "e"]
```

### selectNext

```ts
function LSM.selectNext<T>(lsm: LSM<T>): LSM<T>;
```

Extends the selection to include the next unselected item in the list.

If the focus is before the anchor (selection is "upward"), this will unselect the focus instead of extending downward.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "b");

lsm.selected; // ["b"]

lsm = LSM.selectNext(lsm);
lsm.selected; // ["b", "c"]

lsm = LSM.selectNext(lsm);
lsm.selected; // ["b", "c", "d"]
```

### selectPrev

```ts
function LSM.selectPrev<T>(lsm: LSM<T>): LSM<T>;
```

Extends the selection to include the previous unselected item in the list.

If the focus is after the anchor (selection is "downward"), this will unselect the focus instead of extending upward.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "d");

lsm.selected; // ["d"]

lsm = LSM.selectPrev(lsm);
lsm.selected; // ["c", "d"]

lsm = LSM.selectPrev(lsm);
lsm.selected; // ["b", "c", "d"]
```

### selectTo

```ts
function LSM.selectTo<T>(lsm: LSM<T>, selectable: T): LSM<T>;
```

Extends the current anchor group's selection to include all items between the anchor and the specified item.

Items outside the anchor-to-target range within the same group will be unselected.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "b");

lsm.selected; // ["b"]

lsm = LSM.selectTo(lsm, "e");
lsm.selected; // ["b", "c", "d", "e"]

lsm = LSM.selectTo(lsm, "c");
lsm.selected; // ["b", "c"]
```

### selectToBottom

```ts
function LSM.selectToBottom<T>(lsm: LSM<T>): LSM<T>;
```

Extends the current selection from the anchor to the last item in the list.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "c");

lsm.selected; // ["c"]

lsm = LSM.selectToBottom(lsm);
lsm.selected; // ["c", "d", "e"]
```

### selectToTop

```ts
function LSM.selectToTop<T>(lsm: LSM<T>): LSM<T>;
```

Extends the current selection from the anchor to the first item in the list.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "c");

lsm.selected; // ["c"]

lsm = LSM.selectToTop(lsm);
lsm.selected; // ["a", "b", "c"]
```

### setSelectables

```ts
function LSM.setSelectables<T>(lsm: LSM<T>, selectables: readonly T[]): LSM<T>;
```

Updates the list of selectable items.

The selection state is automatically normalized after updating, removing any selections that are no longer valid.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "b");

lsm.selected; // ["b"]
lsm.selectables; // ["a", "b", "c"]

lsm = LSM.setSelectables(lsm, ["x", "y", "z"]);
lsm.selectables; // ["x", "y", "z"]
lsm.selected; // [] (normalized, "b" no longer exists)
```

### toggleSelect

```ts
function LSM.toggleSelect<T>(lsm: LSM<T>, selectable: T): LSM<T>;
```

Toggles the selection state of an item.

If the item is selected, it will be unselected. If it is not selected, it will be selected.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "a");

lsm.selected; // ["a"]

lsm = LSM.toggleSelect(lsm, "b");
lsm.selected; // ["a", "b"]

lsm = LSM.toggleSelect(lsm, "a");
lsm.selected; // ["b"]
```

### unselect

```ts
function LSM.unselect<T>(lsm: LSM<T>, selectable: T): LSM<T>;
```

Removes an item from the current selection.

#### Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "a");
lsm = LSM.selectNext(lsm);
lsm = LSM.selectNext(lsm);

lsm.selected; // ["a", "b", "c"]

lsm = LSM.unselect(lsm, "b");
lsm.selected; // ["a", "c"]
```
