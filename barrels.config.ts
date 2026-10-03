import { defineConfig, flat, namespace } from "@monstermann/barrels"

export default defineConfig([
    namespace({
        entries: "./packages/lsm/src/LSM",
    }),
    flat({
        entries: "./packages/lsm/src",
        include: ["LSM/index.js"],
    }),
])
