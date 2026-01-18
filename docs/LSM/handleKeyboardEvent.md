# handleKeyboardEvent

```ts
function LSM.handleKeyboardEvent<T>(
    lsm: LSM<T>,
    evt: {
        ctrlKey: boolean;
        key: string;
        metaKey: boolean;
        shiftKey: boolean;
    },
    options?: {
        multiselect: boolean;
    }
): [boolean, LSM<T>];
```

Handles keyboard navigation events and returns a tuple of `[handled, newState]`.

## Supported Keys

| Key         | Modifier   | Action                               |
| ----------- | ---------- | ------------------------------------ |
| `ArrowDown` | -          | [`goToNext`](./goToNext)             |
| `ArrowDown` | Shift      | [`selectNext`](./selectNext)         |
| `ArrowDown` | Meta       | [`goToBottom`](./goToBottom)         |
| `ArrowDown` | Meta+Shift | [`selectToBottom`](./selectToBottom) |
| `ArrowUp`   | -          | [`goToPrev`](./goToPrev)             |
| `ArrowUp`   | Shift      | [`selectPrev`](./selectPrev)         |
| `ArrowUp`   | Meta       | [`goToTop`](./goToTop)               |
| `ArrowUp`   | Meta+Shift | [`selectToTop`](./selectToTop)       |
| `Home`      | -          | [`goToTop`](./goToTop)               |
| `Home`      | Shift      | [`selectToTop`](./selectToTop)       |
| `End`       | -          | [`goToBottom`](./goToBottom)         |
| `End`       | Shift      | [`selectToBottom`](./selectToBottom) |

## Options

- `multiselect` - If `false`, disables shift-based selection extensions. Default: `true`

## Example

```ts
import { LSM } from "@monstermann/lsm";

let lsm = LSM.create(["a", "b", "c"]);

const [handled, newLsm] = LSM.handleKeyboardEvent(lsm, {
    key: "ArrowDown",
    shiftKey: false,
    metaKey: false,
    ctrlKey: false,
});

handled; // true
newLsm.selected; // ["a"]
```
