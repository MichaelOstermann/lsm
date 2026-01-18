import { defineConfig } from "vitepress"
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"

export default defineConfig({
    base: "/lsm/",
    description: "List-selection-manager loosely modeled after MacOS Finder.",
    title: "lsm",
    markdown: {
        theme: {
            dark: "catppuccin-macchiato",
            light: "github-light-default",
        },
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },
    themeConfig: {
        aside: false,
        outline: "deep",
        docFooter: {
            next: false,
            prev: false,
        },
        search: {
            provider: "local",
        },
        sidebar: [
            { base: "/LSM/", text: "LSM", items: [
                { link: "anchorGroup", text: "anchorGroup" },
                { link: "anchorIndex", text: "anchorIndex" },
                { link: "anchor", text: "anchor" },
                { link: "clear", text: "clear" },
                { link: "collapse", text: "collapse" },
                { link: "create", text: "create" },
                { link: "focusIndex", text: "focusIndex" },
                { link: "focus", text: "focus" },
                { link: "goToBottom", text: "goToBottom" },
                { link: "goToIndex", text: "goToIndex" },
                { link: "goTo", text: "goTo" },
                { link: "goToNext", text: "goToNext" },
                { link: "goToPrev", text: "goToPrev" },
                { link: "goToTop", text: "goToTop" },
                { link: "groups", text: "groups" },
                { link: "handleKeyboardEvent", text: "handleKeyboardEvent" },
                { link: "handleMouseEvent", text: "handleMouseEvent" },
                { link: "hasMultipleSelections", text: "hasMultipleSelections" },
                { link: "hasNoSelection", text: "hasNoSelection" },
                { link: "hasSelection", text: "hasSelection" },
                { link: "isFirstSelectionInGroup", text: "isFirstSelectionInGroup" },
                { link: "isFirstSelection", text: "isFirstSelection" },
                { link: "isLastSelectionInGroup", text: "isLastSelectionInGroup" },
                { link: "isLastSelection", text: "isLastSelection" },
                { link: "isSelected", text: "isSelected" },
                { link: "lastSelectedIndex", text: "lastSelectedIndex" },
                { link: "normalize", text: "normalize" },
                { link: "selectAll", text: "selectAll" },
                { link: "select", text: "select" },
                { link: "selectNext", text: "selectNext" },
                { link: "selectPrev", text: "selectPrev" },
                { link: "selectToBottom", text: "selectToBottom" },
                { link: "selectTo", text: "selectTo" },
                { link: "selectToTop", text: "selectToTop" },
                { link: "setSelectables", text: "setSelectables" },
                { link: "toggleSelect", text: "toggleSelect" },
                { link: "unselect", text: "unselect" },
            ] },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/lsm" },
        ],
    },
    vite: {
        plugins: [
            groupIconVitePlugin(),
        ],
    },
})
