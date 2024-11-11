import React, { useState } from 'react'

export default function App() {
  const [inputTodo, setInputTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  const handleAddTodo = e => {
    e.preventDefault()
    setTodos([...todos, {
      id: Math.random().toString(16),
      todo: inputTodo,
      done: false
    }])
    setInputTodo('')
    console.log(todos);

  }

  const handleDeleteTodo = id => setTodos(todos.filter(item => item.id !== id))

  const handleDone = todo => setTodos(todos.map(item => item.id === todo.id ? { ...todo, done: !todo.done } : item))

  const filterTodo = todos.filter(item => {
    if (filter === 'done') return item.done
    if (filter === 'notDone') return !item.done
    return item
  })

  return (
    <div className='todo-list'>
      <div className='todo-list__ctn'>
        <form className='todo-list__form' onSubmit={handleAddTodo}>
          <input onChange={e => setInputTodo(e.target.value)} value={inputTodo} />
          <button type='submit'>Add Todo</button>
          
        </form>
        <div className='todo-list__filter'>
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('done')}>Done</button>
          <button onClick={() => setFilter('notDone')}>Not Done</button>
        </div>
        {filterTodo.map(todo => {
          return (
            <div className='todo-list__task' key={todo.id}>
              <p className={`todo-list__task-name ${todo.done ? 'red' : ''}`}>{todo.todo}</p>
              <div className='todo-list__task-btn'>
                <button className='btn-del' onClick={() => handleDeleteTodo(todo.id)}>X</button>
                <button className='btn-done' onClick={() => handleDone(todo)}>Done</button>
              </div>
            </div>

          )
        })}
      </div>
    </div>
  )
}
