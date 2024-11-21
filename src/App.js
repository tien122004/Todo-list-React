import React, { useEffect, useState } from 'react'
import InputTodo from './Components/InputTodo'
import ListTodo from './Components/ListTodo'

export default function App() {
  const API_URL = "http://localhost:3000/todos"
  const [todos, setTodos] = useState([])
  const [done, setDone] = useState('all')

  const handlAdd = value => {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(value)
    })
      .then(res => res.json())
      .then(data => setTodos([...todos, data]))
      .catch(err => console.log("Error add data: " + err))
  }

  const handlGetTodos = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTodos(data))
  }

  useEffect(() => handlGetTodos(), [])

  const handlDelete = id => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => setTodos(todos.filter(todo => {
        return todo.id !== data.id
      })))
  }

  const handleDone = todo => {
    fetch(`${API_URL}/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ ...todo, done: !todo.done })
    })
      .then(res => res.json())
      .then(data => handlGetTodos())
  }

  const handleFilter = todos.filter(item => {
    if (done === 'done') return item.done
    if (done === 'notDone') return !item.done
    return true
  })
  return (
    <div className='app__todo'>
      <InputTodo handlInputTodo={handlAdd} />
      <div className='filter__todo'>
        <button onClick={() => setDone('all')}>All</button>
        <button onClick={() => setDone('done')}>Done</button>
        <button onClick={() => setDone('notDone')}>Not Done</button>
      </div>
      <ListTodo handleFilter={handleFilter}
        handlDelete={handlDelete} handleDone={handleDone} />
    </div>
  )
}
