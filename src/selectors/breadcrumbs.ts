
import { IBreadcrumbProps } from "@blueprintjs/core"
import { AppState } from "../stores"

export const selectBreadcrumb = (state: AppState): IBreadcrumbProps[] => {
    return [
        { href:"#", text: "Contests" },
        { href:"#", text: "Arkavidia Final" },
        { href:"#", text: "A. Memotong Kue" }
    ]
}