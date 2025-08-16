export type Todo = {
    id: number,
    text: string,
    complete: boolean
}

export enum Filter {
    ALL = "all",
    COMPLETE = "complete",
    INCOMPLETE = "incomplete"
}

export enum Theme {
    DARK = "dark",
    LIGHT = "light"
}