import { TodoCard } from "./TodoCard"

export function TodoList(props) {
    
    const { todos, selectedTab } = props

    const filteredTodoList = selectedTab === "All" ? todos : 
    selectedTab === "Open" ? todos.filter(val => !val.complete):
    todos.filter(val => val.complete)

    return(
        <>
        {filteredTodoList.map((todo) => {
            
            return(
            <TodoCard key={todo.id} todo={todo} {...props}/>
            )
        })}
        </>
    )
}