# select

```ts
function LSM.select<T>(lsm: LSM<T>, selectable: T): LSM<T>;
```

Adds an item to the current selection without clearing existing selections.

This creates a new anchor at the selected item, enabling independent selection ranges.

## Example

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
