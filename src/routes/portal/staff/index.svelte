<script lang="ts">
  import Box from '../../../components/Box.svelte'
  import Title from '../../../components/Title.svelte'
  import SubTitle from '../../../components/SubTitle.svelte'
  import Input from '../../../components/Input.svelte'
  import Button from '../../../components/Button.svelte'

  import Demos from './demo/index.svelte'

  interface TodoType {
    id: string
    text: string
    done: boolean
  }

  // let todos: TodoType[] =[]
  let todos: TodoType[] = JSON.parse(localStorage.getItem('todos')) ?? []
  let todoInput: string
  
  const addTodo = () => {
    todos = [
      ...todos,
      {
        id: Math.random().toString().replace('0.', ''),
        text: todoInput,
        done: false,
      },
    ]
  }
  $: {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
</script>

<!-- <Demos /> -->
<Box>
  <Title>Staff overview</Title>
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <SubTitle>How to review demo's</SubTitle>
      <p />
    </div>
    <div class="grid gap-4">
      <SubTitle>Todo list</SubTitle>
      <div>
        <Input bind:value={todoInput} />
        <Button
          class="mt-2 ml-auto"
          onClick={() => addTodo()}
          color="bg-teal-700">Add</Button
        >
      </div>

      {#each todos as todo}
        <div class="p-4 text-sm flex items-center bg-gray-100 rounded-sm">
          <input
            type="checkbox"
            class="mr-2"

            bind:checked={todo.done}
          />
          {todo.text}
          <svg
            on:click={() => (todos = todos.filter(t => t.id !== todo.id))}
            class="ml-auto text-red-700 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path
              d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
            />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </div>
      {/each}
    </div>
  </div>
</Box>
