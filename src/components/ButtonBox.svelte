<button
  class="border-2 border-opacity-0 transition-all border-gray-300 font-semibold'
        shadow-sm cursor-pointer bg-white text-sm h-8 w-auto px-3 rounded-md grid grid-flow-col justify-center items-center focus-ring {$$props.active
    ? 'border-opacity-100 text-gray-600 '
    : 'text-gray-400'} {$$props.class}"
  on:click
>
  <slot />
</button>
