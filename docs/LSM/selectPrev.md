# selectPrev

```ts
function LSM.selectPrev<T>(lsm: LSM<T>): LSM<T>;
```

Extends the selection to include the previous unselected item in the list.

If the focus is after the anchor (selection is "downward"), this will unselect the focus instead of extending upward.

## Example

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
