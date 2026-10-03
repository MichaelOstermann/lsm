<div align="center">

<h1>lsm</h1>

**List-selection-manager loosely modeled after MacOS Finder.**

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

```sh
bun add @monstermann/lsm
```

## API

Everything is documented with JSDoc, including examples. A selection is a plain immutable object, every function returns the same object when nothing changed.

|           |                                                                                                                                                                                                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| State     | `create`, `setSelectables`, `clear`, `collapse`, `normalize`                                                                                                                                                                                                      |
| Moving    | `goTo`, `goToIndex`, `goToNext`, `goToPrev`, `goToTop`, `goToBottom`                                                                                                                                                                                              |
| Selecting | `select`, `unselect`, `toggleSelect`, `selectAll`, `selectTo`, `selectNext`, `selectPrev`, `selectToTop`, `selectToBottom`                                                                                                                                        |
| Events    | `handleKeyboardEvent`, `handleMouseEvent`                                                                                                                                                                                                                         |
| Reading   | `isSelected`, `hasSelection`, `hasNoSelection`, `hasMultipleSelections`, `groups`, `anchor`, `anchorGroup`, `anchorIndex`, `focus`, `focusIndex`, `lastSelectedIndex`, `isFirstSelection`, `isLastSelection`, `isFirstSelectionInGroup`, `isLastSelectionInGroup` |

## Tree-shaking

`LSM` is a single object. To only bundle the functions that are used, replace its members with direct imports using [`@monstermann/barrels-treeshake`](https://github.com/MichaelOstermann/barrels):

```ts
import { treeshake } from "@monstermann/barrels-treeshake";

export default defineConfig({
    plugins: [
        treeshake({
            resolve({ importAlias, importName, importPath, propertyName }) {
                if (importPath !== "@monstermann/lsm" || importName !== "LSM")
                    return;
                return `import { ${propertyName} as ${importAlias} } from "@monstermann/lsm/LSM/${propertyName}.mjs";`;
            },
        }),
    ],
});
```
