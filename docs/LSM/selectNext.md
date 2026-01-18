# selectNext

```ts
function LSM.selectNext<T>(lsm: LSM<T>): LSM<T>;
```

Extends the selection to include the next unselected item in the list.

If the focus is before the anchor (selection is "upward"), this will unselect the focus instead of extending downward.

## Example

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
