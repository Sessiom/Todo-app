import { useState } from "react"

export function TodoInput(props) {

    const { handleAddTodo } = props

    const [input, setInput] = useState('')

    return (
        <div className='InputRow'>
            <input value={input} onChange={(e) => {setInput(e.target.value)}}></input>
            <button onClick={() => {
                if(input === '') {return}
                handleAddTodo(input) 
                setInput('')}}>Add</button>
        </div>
    )
}