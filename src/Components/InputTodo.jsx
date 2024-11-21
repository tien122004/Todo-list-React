
export default function InputTodo({ handlInputTodo }) {
    const handlSubmit = e => {
        e.preventDefault()
        handlInputTodo({
            id: Math.random().toString(16),
            name: e.target[0].value,
            done: false
        })
        e.target[0].value = ''
    }

    return (
        <form className='form__todo' onSubmit={handlSubmit}>
            <input className='form__todo-input' />
            <button className='form__todo-submit' type='submit'>Add Todo</button>
        </form>
    )
}
