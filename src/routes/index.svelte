<script>
    let click = 0;

    function addClick() {
        click +=1
    }
</script>


<h1 class="text-xl font-bold text-blue-500">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click={addClick} class="p-4 bg-red-300">{click}</button>                