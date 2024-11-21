
export default function ListTodo({ handleFilter, handlDelete, handleDone }) {

    return (
        <div className='list__todo'>
            {handleFilter.map(todo => {
                return (
                    <div className='flex-between' key={todo.id}>
                        <p className='item__todo p-x5'>{todo.name}</p>
                        <div className="group__todo flex_gap-5">
                            <button onClick={() => handlDelete(todo.id)}>X</button>
                            <button onClick={() => handleDone(todo)}>{todo.done ? 'Undo' : 'Done'}</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
