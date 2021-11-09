import {
    addTodolistAC,
    changeTodolistTitleAC,
    InitialStateType,
    removeTodolistAC,
    todolistsReducer,
    TodoListType
} from './todolists-reducer';
import { v1 } from 'uuid';


let todolistId1: string;
let todolistId2: string;
let startState: InitialStateType = {
    todolists: [],
    todolistNames: []
};

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = {
        todolists: [
            { id: todolistId1, title: "What to learn", time: "" },
            { id: todolistId2, title: "What to buy", time: "" }
        ],
        todolistNames: ["What to learn", "What to buy"]
    }
        })

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.todolists.length).toBe(1);
    expect(endState.todolists[0].id).toBe(todolistId2);
    expect(endState.todolistNames[0]).toBe("What to buy");
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.todolists.length).toBe(3);
    expect(endState.todolists[2].title).toBe(newTodolistTitle);
    expect(endState.todolistNames[2]).toBe("New Todolist");
});

test('correct todolist should change its name', () => {


    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState.todolists[0].title).toBe("What to learn");
    expect(endState.todolists[1].title).toBe(newTodolistTitle);
});




