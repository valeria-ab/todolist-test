import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IconButton, TextField } from "@material-ui/core";
import { AddBox, ControlPoint } from "@material-ui/icons";
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../redux/store';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
    console.log("AddItemForm")
    let [title, setTitle] = useState('')

    const [error, setError] = useState<null | string>(null)


    let todolistNames = useSelector<AppRootStateType, string[]>(state => state.todolists.todolistNames)

    const trimmedTitle = title.trim()

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const addItem = () => {
        // проверяем: если строка обрезана (trimmedTitle) и её длина не равна 0 то условие выполняется, т.к. это псевдоложь
        // дальше проверяем что тудулиста с таким именем не существует
        if (trimmedTitle) {
            let existingTitle = todolistNames.find(title => title === trimmedTitle)


            if (existingTitle) {
                setError("Todolist with the same name already exists")
            } else {
                props.addItem(trimmedTitle);
                setTitle('')
                return
            }

        } else {
            setError('Title cannot be empty')
        }

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

        if (e.charCode === 13) {
            addItem()
        }
    };


    return (
        <div>
            <TextField
                variant={"outlined"}
                label={'Type title'}
                value={title}
                onChange={inputChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                color={'primary'}
                onClick={addItem}
            >
                <ControlPoint />
            </IconButton>

        </div>
    )
})