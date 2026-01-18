# clear

```ts
function LSM.clear<T>(lsm: LSM<T>): LSM<T>;
```

Clears all selections and anchors.

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "b");

lsm.selected; // ["b"]

lsm = LSM.clear(lsm);
lsm.selected; // []
```
