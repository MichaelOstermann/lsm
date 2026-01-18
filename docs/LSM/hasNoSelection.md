# hasNoSelection

```ts
function LSM.hasNoSelection<T>(lsm: LSM<T>): boolean;
```

Returns `true` if no items are selected.

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);

LSM.hasNoSelection(lsm); // true

lsm = LSM.goTo(lsm, "a");
LSM.hasNoSelection(lsm); // false
```
