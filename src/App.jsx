import { useState } from 'react'
import { Header } from './components/Header'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { Tabs } from './components/Tabs'
import { useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([{
    input: 'Hello World', complete: true, id: 0
  }])
  const [id, setId] = useState(0)
  const [selectedTab, setSelectedTab] = useState('Open')


  const handleAddTodo = (input) => {
    //console.log("handleAddTodo", input)
    const newId = id + 1;
    setId(newId);
    let newTodoList = [...todos, {input: input, complete: false, id: newId}]
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  const handleDeleteTodo = (id) => {
    const newTodoList = todos.filter(val => val.id !== id)
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  const handleCompleteTodo = (id) => {
    const newTodoList = [...todos]
    const updateIndex = todos.findIndex(val => val.id === id)
    newTodoList[updateIndex].complete = true
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  const handleSaveData = (currTodos) => {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }))
  }

  useEffect(() => {
    if(!localStorage || !localStorage.getItem('todo-app')){ return }
    const db = JSON.parse(localStorage.getItem('todo-app'))
    setTodos(db.todos)
    //Prevent repeat IDs
    if(db.todos.length > 0){
      const lastItemIndex = db.todos.length - 1
      setId(db.todos[lastItemIndex].id)
    } else {
      setId(0)
    }
  }, [])

  return (
    <>
      <Header/>
      <div className='TodoContainer'>
      <Tabs 
        todos={todos} 
        selectedTab={selectedTab} 
        setSelectedTab={setSelectedTab}/>
      <TodoInput handleAddTodo={handleAddTodo}/>
      <TodoList 
        todos={todos} 
        selectedTab={selectedTab} 
        handleDeleteTodo={handleDeleteTodo}
        handleCompleteTodo={handleCompleteTodo}/>
      </div>
    </>
  )
}

export default App
