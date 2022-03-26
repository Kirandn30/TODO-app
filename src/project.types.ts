export type Mytask2 = {
    deadline: number | undefined
    id: string
    taskName: string | undefined
}

export type Mytask1 = {
    deadline: number
    id: string
    taskName: string
}

export type Mytask = Mytask1 | Mytask2
