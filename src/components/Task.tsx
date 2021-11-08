import { Checkbox, IconButton } from "@material-ui/core"
import React, { useCallback } from "react"
import { EditableSpan } from "./EditableSpan"
import s from "./Todolist.module.css"

type TaskPropsType = {
    taskId: string
    title: string
    isDone: boolean
    todolistId: string
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTask: (todolistId: string, taskId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const onTitleChangeHandler = useCallback((newValue) => props.changeTaskTitle(props.todolistId, props.taskId, newValue),
        [props.changeTaskTitle, props.todolistId, props.taskId])

    return (<div className={props.isDone ? s.isDone : ''}>
        <Checkbox
            color={'secondary'}
            checked={props.isDone}
            onChange={(e) =>
                props.changeTaskStatus(props.todolistId, props.taskId, e.currentTarget.checked)}
        />
        <EditableSpan title={props.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={() => props.removeTask(props.todolistId, props.taskId)}>
            x
        </IconButton>
    </div>
    )
})