# toggleSelect

```ts
function LSM.toggleSelect<T>(lsm: LSM<T>, selectable: T): LSM<T>;
```

Toggles the selection state of an item.

If the item is selected, it will be unselected. If it is not selected, it will be selected.

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "a");

lsm.selected; // ["a"]

lsm = LSM.toggleSelect(lsm, "b");
lsm.selected; // ["a", "b"]

lsm = LSM.toggleSelect(lsm, "a");
lsm.selected; // ["b"]
```
