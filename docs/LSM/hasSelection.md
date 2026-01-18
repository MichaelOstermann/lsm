# hasSelection

```ts
function LSM.hasSelection<T>(lsm: LSM<T>): boolean;
```

Returns `true` if at least one item is selected.

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);

LSM.hasSelection(lsm); // false

lsm = LSM.goTo(lsm, "a");
LSM.hasSelection(lsm); // true
```
