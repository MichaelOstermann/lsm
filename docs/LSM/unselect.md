# unselect

```ts
function LSM.unselect<T>(lsm: LSM<T>, selectable: T): LSM<T>;
```

Removes an item from the current selection.

## Example

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
