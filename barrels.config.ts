import { defineConfig } from "@monstermann/barrels"
import { flat } from "@monstermann/barrels-flat"
import { namespace } from "@monstermann/barrels-namespace"

export default defineConfig([
    namespace({
        entries: "./packages/lsm/src/LSM",
    }),
    flat({
        entries: "./packages/lsm/src",
        include: ["*", "LSM/index.js"],
    }),
])
