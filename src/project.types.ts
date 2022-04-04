import { User, UserCredential } from "firebase/auth"

export type Mytask = {
    deadline: number | undefined
    id: string
    taskName: string | undefined
}


export type TodoTaskProps = {
  element: Mytask
  deleteTaks(taksIdtodelete: string): void
  editTask(taskIdtoedit: string): void
  ID: string
}


export type UserContextType = {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    LogIn(email: string, password: string): Promise<UserCredential>
    SignUp(email: string, password: string): Promise<UserCredential>
    LogOut(): Promise<void>
}