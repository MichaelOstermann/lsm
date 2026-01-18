# isFirstSelection

```ts
function LSM.isFirstSelection<T>(lsm: LSM<T>, selectable: T): boolean;
```

Returns `true` if the item is the first in the selection order.

The selection order reflects the order in which items were selected, not their position in the selectables array.

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "b");
lsm = LSM.select(lsm, "a");

LSM.isFirstSelection(lsm, "b"); // true
LSM.isFirstSelection(lsm, "a"); // false
```
