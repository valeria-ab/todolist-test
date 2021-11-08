import { v1 } from "uuid";


const initialState: InitialStateType = {
    todolists: [],
    todolistNames: []
}


export const todolistsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            let newState = { ...state }
            newState.todolists = newState.todolists.filter(tl => tl.id !== action.id);
            return newState
        }
        case 'ADD-TODOLIST': {
            let newState = { ...state, ...state.todolistNames }
            let now = new Date().toLocaleString()
            let newTodoList: TodoListType = { id: action.todolistID, title: action.title, filter: 'all', time: now }
            newState.todolists = [...newState.todolists, newTodoList]
            newState.todolistNames.push(action.title)
            return newState
        }

        case 'CHANGE-TODOLIST-TITLE': {
            let newState = { ...state, ...state.todolists }
            let todolist = newState.todolists.find(t => t.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return newState
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let newState = { ...state, ...state.todolists }
            let changedTodoList = newState.todolists.find(tl => tl.id === action.id);
            if (changedTodoList) {
                changedTodoList.filter = action.filter
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
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}





// types

type InitialStateType = {
    todolists: Array<TodoListType>
    todolistNames: string[]
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
    time: string
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

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
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}


