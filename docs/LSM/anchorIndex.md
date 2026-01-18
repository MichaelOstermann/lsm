# anchorIndex

```ts
function LSM.anchorIndex<T>(lsm: LSM<T>): number;
```

Returns the index of the current anchor within the selectables array.

Returns `-1` if there is no anchor.

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);

LSM.anchorIndex(lsm); // -1

lsm = LSM.goTo(lsm, "c");
LSM.anchorIndex(lsm); // 2
```
