import React, { useCallback } from 'react';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, IconButton } from '@material-ui/core';
import { Delete } from "@material-ui/icons";
import { Task } from "./Task";
import { TaskType } from '../redux/tasks-reducer';
import s from "./Todolist.module.css"

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (todoListID: string, title: string) => void
    removeTask: (todoListID: string, id: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todoListID: string, newTitle: string) => void
    time: string
    removeTodolist: (todoListID: string) => void
}


export const Todolist = React.memo(function (props: TodoListPropsType) {



    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])

    const removeTodoList = () => {
        props.removeTodolist(props.id)
    }


    let tasksForTodolist = props.tasks

    //проверяем есть ли невыполненная таска. если есть, значит тудулист не выполнен.
    // используем это для задания прозрачности тудулисту в className
    let todolistIsDone: boolean = false;
    if (tasksForTodolist.length >= 1) {
        const unfulfilledTask = tasksForTodolist.find(t => t.isDone !== true)
        if (!unfulfilledTask) {
            todolistIsDone = true
        }
    }




    return (
        <div className={todolistIsDone ? s.isDone : ""}>
            <h3><EditableSpan title={props.title} onChange={
                useCallback((newValue) => {
                    props.changeTodolistTitle(props.id, newValue)
                }, [props.changeTodolistTitle, props.id])
            } />
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
                <span className={s.dataTime}>{props.time}</span>
            </h3>

            <AddItemForm
                addItem={addTask}
            />

            <div>
                {
                    tasksForTodolist.map(t => <Task key={t.id}
                        taskId={t.id}
                        title={t.title}
                        isDone={t.isDone}
                        todolistId={props.id}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                    />)
                }

            </div>
        </div>
    )
})

