import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Todolist } from "./components/Todolist";
import { AppRootStateType } from "./redux/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType } from "./redux/tasks-reducer";
import { addTodolistAC, changeTodolistTitleAC, removeTodolistAC, TodoListType } from "./redux/todolists-reducer";
import { Container, Grid,  Paper } from "@material-ui/core";
import { AddItemForm } from "./components/AddItemForm";



function App() {
  
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)



  const removeTask = useCallback( (todolistId: string, taskId: string) => {

      dispatch(removeTaskAC(todolistId,taskId))

  }, [dispatch] )


  const addTask = useCallback ( (todolistId: string, newTaskTitle: string) => {

      dispatch(addTaskAC(todolistId, newTaskTitle))
  }, [dispatch] )

  const changeTaskTitle = useCallback( (todolistId: string, taskId: string, newTitle: string) => {

      dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))

  }, [dispatch] )

  const changeTaskStatus = useCallback( (todolistId: string, taskId: string, isDone: boolean) => {

      dispatch(changeTaskStatusAC(todolistId, taskId, isDone))

  }, [dispatch] )

  const removeTodolist = useCallback( (todolistId: string) => {

      dispatch(removeTodolistAC(todolistId))

  }, [dispatch] )

  const addTodoList = useCallback( (title: string) => {

      const action = addTodolistAC(title)

      dispatch(action)

  }, [dispatch] )

  const changeTodolistTitle = useCallback( (todolistId: string, newTitle: string) => {

      dispatch(changeTodolistTitleAC(todolistId,newTitle))

  }, [dispatch] )

  return (
      <div>
          <Container fixed>
              <Grid container spacing={3} style={{padding: "20px"}}>
                  <AddItemForm addItem={addTodoList}/>
              </Grid>
              <Grid container spacing={3}>
                  {
                      todolists.map(td => {
                          let allTodolistTasks = tasks[td.id]

                          return <Grid item>
                              <Paper style={{padding: "10px"}}>
                                  <Todolist key={td.id}
                                            id={td.id}
                                            title={td.title}
                                            tasks={allTodolistTasks}                                    
                                            time={td.time}
                                            removeTask={removeTask}                                           
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                  />
                              </Paper>
                          </Grid>
                      })
                  }
              </Grid>

          </Container>
          </div>       
 )}

export default App;
