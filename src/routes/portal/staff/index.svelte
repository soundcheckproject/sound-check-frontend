<script lang="ts">
  import Box from '../../../components/Box.svelte'
  import Title from '../../../components/Title.svelte'
  import SubTitle from '../../../components/SubTitle.svelte'
  import Input from '../../../components/Input.svelte'
  import Button from '../../../components/Button.svelte'

  import Demos from './demo/index.svelte'
  import { quintOut } from 'svelte/easing'
  import { crossfade, fade, fly, slide } from 'svelte/transition'
  import { flip } from 'svelte/animate'

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
  <div class="grid gap-6 lg:grid-cols-2 items-start">
    <div class="grid gap-4 ">
      <SubTitle>How to review demo's</SubTitle>
      <div class="grid gap-4 text-gray-700">
        <p class="font-medium">Quality check ✅</p>
        <ul class="text-sm">
          <li>- Track has a theme</li>
          <li>- Track has an original vocal</li>
          <li>- Vocalist has made harmonies</li>
        </ul>
        <p class="font-medium">Give feedback on the track 🗣</p>
        <p class="text-sm">
          Nobody is perfect, everyone can make little mistakes when submitting
          their track. Check if the rendered track doesn't have any clicks or
          pops. <br />Ask the artist for a new version of necessary!
        </p>
      </div>
    </div>
    <div class="grid gap-4">
      <SubTitle>Todo list</SubTitle>

      <div class="overflow-y-scroll grid gap-2" style="max-height:300px">
        {#each todos as todo, index (todo)}
          <div
            in:fly|local={{ y: 25, opacity: 0, duration: 200 }}
            out:fade|local={{ duration: 200, delay: 200 }}
            animate:flip={{ duration: 200, delay: 200 }}
            class="p-4 text-sm flex items-center bg-gray-100 rounded-sm group"
          >
            <input type="checkbox" class="mr-2" bind:checked={todo.done} />
            {todo.text}
            <svg
              on:click={() => (todos = todos.filter(t => t.id !== todo.id))}
              class="ml-auto hover:text-red-700 cursor-pointer opacity-0 transition-all group-hover:opacity-75 "
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
      <div>
        <Input bind:value={todoInput} />
        <Button
          class="mt-2 ml-auto"
          onClick={() => addTodo()}
          color="bg-teal-700">Add</Button
        >
      </div>
    </div>
  </div>
</Box>
