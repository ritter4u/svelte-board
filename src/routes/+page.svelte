<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  type Board = {
    id: number;
    title: string;
    content: string;
  };

  let boards = writable<Board[]>([]);

  onMount(async () => {
    // Fetch initial boards data from an API or local storage
    const response = await fetch('/api/boards');
    boards.set(await response.json());
  });
</script>

<h1>Board List</h1>

{#each $boards as board (board.id)}
  <div>
    <h2>{board.title}</h2>
    <p>{board.content}</p>
  </div>
{/each}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
