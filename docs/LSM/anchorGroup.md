# anchorGroup

```ts
function LSM.anchorGroup<T>(lsm: LSM<T>): T[];
```

Returns the contiguous group of selections that contains the current anchor.

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);

lsm = LSM.goTo(lsm, "b");
lsm = LSM.selectNext(lsm); // selects "b", "c"

LSM.anchorGroup(lsm); // ["b", "c"]
```
