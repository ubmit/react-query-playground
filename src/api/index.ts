import {Todo} from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function getTodos(): Promise<Array<Todo>> {
  const response = await fetch(`${API_BASE_URL}/todos`)
  const data = await response.json()
  return data
}

async function postTodo(newTodo: Todo): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}

export {getTodos, postTodo}
