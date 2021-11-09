import React, {ChangeEvent, useState, KeyboardEvent,} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      
        if (e.charCode === 13) {
            setEditMode(false)
            props.onChange(title)
        }
    };

    return editMode
        ? <TextField variant={"standard"}
                     value={title}
                     onBlur={activateViewMode}
                     autoFocus
                     onChange={onChangeTitleHandler}
                     onKeyPress={onKeyPressHandler}
        />
        : <span onDoubleClick={activateEditMode}>{title}</span>

})