# normalize

```ts
function LSM.normalize<T>(lsm: LSM<T>): LSM<T>;
```

Normalizes the selection state by:

1. Removing selections that are no longer in the selectables array
2. Removing anchors that are no longer selected
3. Ensuring each contiguous group has exactly one anchor at either the beginning or end

This function is called automatically by most selection operations, but can be useful after manually modifying the selectables array via [`setSelectables`](./setSelectables).

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "b");

// Remove "b" from selectables
lsm = LSM.setSelectables(lsm, ["a", "c"]);

lsm.selected; // [] (normalized automatically)
```
