# groups

```ts
function LSM.groups<T>(lsm: LSM<T>): T[][];
```

Returns the current selections organized into contiguous groups.

Each group is an array of consecutive selections, sorted by their position in the selectables array.

## Example

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
