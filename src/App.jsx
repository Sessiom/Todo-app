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
  const [lightMode, setLightMode] = useState(null)


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

  const handleLightMode = (value) => {
    // Update the CSS variables or add/remove the class for theme switching
    if (value === true) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else if (value === false) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  useEffect(() => {
    // Check if there's a saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      // If theme is found in localStorage, use it
      setLightMode(savedTheme === 'light');
      if(savedTheme === 'light'){
        handleLightMode(true)
      } else {
        handleLightMode(false)
      }
    } else {
      // If no theme is found, check for system's preferred theme
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // If the system prefers dark, set the theme to dark by default
      console.log('darkMode',prefersDarkScheme)
      if (prefersDarkScheme) {
        setLightMode(false);
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        setLightMode(true);
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
    //Get todos from local storage
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

    // After theme is set, enable the transitions 
    setTimeout(() => {
      // Select elements
      const elements = document.querySelectorAll('body, header, h1, .TodoContainer, .InputRow, input, button, .TodoCard');
      
    elements.forEach(el => {
      // Check the element type to apply transitions to specific properties
      if (el.tagName.toLowerCase() === 'body') {
        el.style.transition = 'background-color 1s ease'; // Apply transition for background-color only
      }
      
      if (el.classList.contains('InputRow')) {
        el.style.transition = 'background-color 1s ease'; // Apply transition for background-color and border-color
      }
      
      if (el.tagName.toLowerCase() === 'input') {
        el.style.transition = 'background-color 1s ease'; // Apply transition for background-color only
      }
      
      if (el.tagName.toLowerCase() === 'button') {
        el.style.transition = 'transform 0.3s ease'; // Apply transition for background-color, transform, and color
      }
      
      if (el.classList.contains('TodoCard')) {
        el.style.transition = 'background-color 1s ease'; // Apply transition for background-color only
      }
    });
  }, 0); // This ensures it happens immediately after the page load
  }, [])

  return (
    <>
      <Header lightMode={lightMode} setLightMode={setLightMode} handleLightMode={handleLightMode}/>
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
