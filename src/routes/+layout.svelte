<script lang="ts">
	import '../app.css';
	import GNB from '$lib/components/GNB.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<GNB />
	<main>
  {@render children()} 
		<!-- {#if children}
			{@html children}
		{/if} -->
	</main>
</div>

<Footer />