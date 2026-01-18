# goToNext

```ts
function LSM.goToNext<T>(lsm: LSM<T>, options?: {
    loopAround?: boolean;
    startAtTop?: boolean;
}): LSM<T>;
```

Moves the selection to the next item in the list.

## Options

- `loopAround` - If `true`, wraps to the first item when at the end. Default: `false`
- `startAtTop` - If `true`, starts at the first item when there is no selection. Default: `true`

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);

lsm = LSM.goToNext(lsm);
lsm.selected; // ["a"]

lsm = LSM.goToNext(lsm);
lsm.selected; // ["b"]

lsm = LSM.goToNext(lsm);
lsm.selected; // ["c"]

lsm = LSM.goToNext(lsm);
lsm.selected; // ["c"] (no change, at end)

lsm = LSM.goToNext(lsm, { loopAround: true });
lsm.selected; // ["a"]
```
