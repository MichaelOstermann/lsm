# handleMouseEvent

```ts
function LSM.handleMouseEvent<T>(
    lsm: LSM<T>,
    selectable: T,
    evt: {
        button: number;
        ctrlKey: boolean;
        metaKey: boolean;
        shiftKey: boolean;
    },
    options?: {
        multiselect: boolean;
    }
): [boolean, LSM<T>];
```

Handles mouse click events and returns a tuple of `[handled, newState]`.

## Options

- `multiselect` - If `false`, disables shift-based selection extensions. Default: `true`

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);
lsm = LSM.goTo(lsm, "a");

const [handled, newLsm] = LSM.handleMouseEvent(lsm, "c", {
    button: 0,
    shiftKey: true,
    metaKey: false,
    ctrlKey: false,
});

handled; // true
newLsm.selected; // ["a", "b", "c"]
```
