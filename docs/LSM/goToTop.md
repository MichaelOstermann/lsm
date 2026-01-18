# goToTop

```ts
function LSM.goToTop<T>(lsm: LSM<T>): LSM<T>;
```

Clears the current selection and selects the first item in the list.

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);

lsm = LSM.goToTop(lsm);
lsm.selected; // ["a"]
```
