---
aside: true
---

# lsm

<Badge type="info" class="size">
    <span>Minified</span>
    <span>5.36 KB</span>
</Badge>

<Badge type="info" class="size">
    <span>Minzipped</span>
    <span>1.56 KB</span>
</Badge>

**List-selection-manager loosely modeled after MacOS Finder.**

## Example

```ts
import { LSM } from "@monstermann/lsm";

// Create a list with selectable items
let lsm = LSM.create(["a", "b", "c", "d", "e"]);

// Navigate to an item
lsm = LSM.goTo(lsm, "b");
lsm.selected; // ["b"]

// Extend selection downward (like Shift+ArrowDown)
lsm = LSM.selectNext(lsm);
lsm.selected; // ["b", "c"]

// Add a separate selection (like Cmd+Click)
lsm = LSM.select(lsm, "e");
lsm.selected; // ["b", "c", "e"]

// Check selection groups
LSM.groups(lsm); // [["b", "c"], ["e"]]

// Handle keyboard events
const [handled, newLsm] = LSM.handleKeyboardEvent(lsm, {
    key: "ArrowDown",
    shiftKey: true,
    metaKey: false,
    ctrlKey: false,
});

// Handle mouse events
const [handled2, newLsm2] = LSM.handleMouseEvent(lsm, "d", {
    button: 0,
    shiftKey: true,
    metaKey: false,
    ctrlKey: false,
});
```

## Installation

::: code-group

```sh [npm]
npm install @monstermann/lsm
```

```sh [pnpm]
pnpm add @monstermann/lsm
```

```sh [yarn]
yarn add @monstermann/lsm
```

```sh [bun]
bun add @monstermann/lsm
```

:::

## Tree-shaking

### Installation

::: code-group

```sh [npm]
npm install -D @monstermann/unplugin-lsm
```

```sh [pnpm]
pnpm -D add @monstermann/unplugin-lsm
```

```sh [yarn]
yarn -D add @monstermann/unplugin-lsm
```

```sh [bun]
bun -D add @monstermann/unplugin-lsm
```

:::

### Usage

::: code-group

```ts [Vite]
// vite.config.ts
import lsm from "@monstermann/unplugin-lsm/vite";

export default defineConfig({
    plugins: [lsm()],
});
```

```ts [Rollup]
// rollup.config.js
import lsm from "@monstermann/unplugin-lsm/rollup";

export default {
    plugins: [lsm()],
};
```

```ts [Rolldown]
// rolldown.config.js
import lsm from "@monstermann/unplugin-lsm/rolldown";

export default {
    plugins: [lsm()],
};
```

```ts [Webpack]
// webpack.config.js
const lsm = require("@monstermann/unplugin-lsm/webpack");

module.exports = {
    plugins: [lsm()],
};
```

```ts [Rspack]
// rspack.config.js
const lsm = require("@monstermann/unplugin-lsm/rspack");

module.exports = {
    plugins: [lsm()],
};
```

```ts [ESBuild]
// esbuild.config.js
import { build } from "esbuild";
import lsm from "@monstermann/unplugin-lsm/esbuild";

build({
    plugins: [lsm()],
});
```

:::
