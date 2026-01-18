# isLastSelectionInGroup

```ts
function LSM.isLastSelectionInGroup<T>(lsm: LSM<T>, selectable: T): boolean;
```

Returns `true` if the item is the last selection in any contiguous group.

Groups are determined by position in the selectables array, not selection order.

## Example

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
