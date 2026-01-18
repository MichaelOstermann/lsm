# goToPrev

```ts
function LSM.goToPrev<T>(lsm: LSM<T>, options?: {
    loopAround?: boolean;
    startAtBottom?: boolean;
}): LSM<T>;
```

Moves the selection to the previous item in the list.

## Options

- `loopAround` - If `true`, wraps to the last item when at the beginning. Default: `false`
- `startAtBottom` - If `true`, starts at the last item when there is no selection. Default: `true`

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);

lsm = LSM.goToPrev(lsm);
lsm.selected; // ["c"]

lsm = LSM.goToPrev(lsm);
lsm.selected; // ["b"]

lsm = LSM.goToPrev(lsm);
lsm.selected; // ["a"]

lsm = LSM.goToPrev(lsm);
lsm.selected; // ["a"] (no change, at start)

lsm = LSM.goToPrev(lsm, { loopAround: true });
lsm.selected; // ["c"]
```
