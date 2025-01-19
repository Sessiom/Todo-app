export function TodoCard(props) {

    const { todo, handleDeleteTodo, handleCompleteTodo } = props

    return (
        <div className='TodoCard'>
            <span>{todo.input}</span>
            <div>
                <button disabled={todo.complete} onClick={() => handleCompleteTodo(todo.id)}>Done</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
        </div>
    )
}