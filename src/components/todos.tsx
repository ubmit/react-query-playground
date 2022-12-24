import {useQueryClient, useQuery, useMutation} from '@tanstack/react-query'
import {useState} from 'react'
import {v4 as uuid} from 'uuid'

import {getTodos, postTodo} from '../api'

export function Todos() {
  const [inputText, setInputText] = useState('')
  const queryClient = useQueryClient()

  const {isLoading, isError, data, error} = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']})
    },
  })

  // TODO: type event correctly
  function handleChange(e: any) {
    setInputText(e.target.value)
  }

  // TODO: type event correctly
  function handleSubmit(e: any) {
    e.preventDefault()
    mutation.mutate({
      id: uuid(),
      completed: false,
      title: inputText,
    })
    setInputText('')
  }

  if (isLoading) return <span>Loading...</span>

  if (isError) return <span>Error: {(error as Error).message}</span>

  return (
    <div>
      <ul>
        {data.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your new todo"
          value={inputText}
          onChange={handleChange}
        />
        <button>Add Todo</button>
      </form>
    </div>
  )
}
