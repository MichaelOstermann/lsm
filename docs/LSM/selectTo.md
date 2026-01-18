# selectTo

```ts
function LSM.selectTo<T>(lsm: LSM<T>, selectable: T): LSM<T>;
```

Extends the current anchor group's selection to include all items between the anchor and the specified item.

Items outside the anchor-to-target range within the same group will be unselected.

## Example

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
