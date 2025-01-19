export function Tabs(props) {

    const { selectedTab, todos, setSelectedTab } = props

    const numOfTodos = todos.length
    const numOfOpenTodos = todos.filter(todo => todo.complete !== true).length
    const numOfClosedTodos = todos.filter(todo => todo.complete === true).length
    return (
        <>
            <div>
            <button onClick={() => setSelectedTab('All')} className={selectedTab === "All" ? "selected": ""}>All ({numOfTodos})</button>
            <button onClick={() => setSelectedTab('Open')} className={selectedTab === "Open" ? "selected": ""}>Open ({numOfOpenTodos})</button>
            <button onClick={() => setSelectedTab('Closed')} className={selectedTab === "Closed" ? "selected": ""}>Closed ({numOfClosedTodos})</button>
            </div>
        </>
    )
}