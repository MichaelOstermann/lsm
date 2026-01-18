# collapse

```ts
function LSM.collapse<T>(lsm: LSM<T>): LSM<T>;
```

Collapses the selection to only the current anchor.

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "b");
lsm = LSM.selectNext(lsm);
lsm = LSM.selectNext(lsm);

lsm.selected; // ["b", "c", "d"]

lsm = LSM.collapse(lsm);
lsm.selected; // ["b"]
```
