<script lang="ts">
	import '../app.css';
	import GNB from '$lib/components/GNB.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<GNB />
	<main>
		<slot />
	</main>
</div>
