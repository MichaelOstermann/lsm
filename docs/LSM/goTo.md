# goTo

```ts
function LSM.goTo<T>(lsm: LSM<T>, selectable: T): LSM<T>;
```

Clears the current selection and selects a single item.

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);

lsm = LSM.goTo(lsm, "c");
lsm.selected; // ["c"]

lsm = LSM.goTo(lsm, "a");
lsm.selected; // ["a"]
```
