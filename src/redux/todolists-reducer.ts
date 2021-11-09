import { v1 } from "uuid";


const initialState: InitialStateType = {
    todolists: [
        { id: "1", time: "09.11.2021, 00:00:00", title: "test" }
    ],
    todolistNames: ["test"]
}


export const todolistsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            let newState = { ...state }
            let todolist = newState.todolists.find(tl => tl.id === action.id)
            let todolistTitle: string;
            if (todolist) { todolistTitle = todolist.title }
            newState.todolists = newState.todolists.filter(tl => tl.id !== action.id);
            newState.todolistNames = newState.todolistNames.filter(n => n !== todolistTitle)
            return newState
        }
        case 'ADD-TODOLIST': {
            let newState = { ...state, ...state.todolistNames }
            let now = new Date().toLocaleString()
            let newTodoList: TodoListType = { id: action.todolistID, title: action.title, time: now }
            newState.todolists = [...newState.todolists, newTodoList]
            newState.todolistNames.push(action.title)
            return newState
        }

        case 'CHANGE-TODOLIST-TITLE': {
            let newState = { ...state, ...state.todolists }
            let todolist = newState.todolists.find(t => t.id === action.id)

            if (todolist) {
                let todolistTitle = todolist.title
                newState.todolistNames = newState.todolistNames.filter(n => n !== todolistTitle)
                todolist.title = action.title
                newState.todolistNames.push(action.title)
            }

            return newState
        }

        default: return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistID: v1() }
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}



// types

export type InitialStateType = {
    todolists: Array<TodoListType>
    todolistNames: string[]
}


export type TodoListType = {
    id: string
    title: string
    time: string
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}


