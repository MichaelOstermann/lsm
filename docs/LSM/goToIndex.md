# goToIndex

```ts
function LSM.goToIndex<T>(lsm: LSM<T>, position: number): LSM<T>;
```

Clears the current selection and selects the item at the specified index.

Supports negative indices (e.g., `-1` for the last item).

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);

lsm = LSM.goToIndex(lsm, 2);
lsm.selected; // ["c"]

lsm = LSM.goToIndex(lsm, -1);
lsm.selected; // ["e"]
```
