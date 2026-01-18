# focus

```ts
function LSM.focus<T>(lsm: LSM<T>): T | undefined;
```

Returns the focus of the current selection group.

The focus is the opposite end of the selection range from the anchor. If the anchor is at the start of the group, focus returns the end, and vice versa.

Returns `undefined` if there is no selection.

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c", "d", "e"]);
lsm = LSM.goTo(lsm, "b");
lsm = LSM.selectNext(lsm);
lsm = LSM.selectNext(lsm);

LSM.anchor(lsm); // "b"
LSM.focus(lsm); // "d"
```
