<script lang="ts">
	import { Gallery } from 'flowbite-svelte';

	export let data;
</script>

<div class="p-8">
	<Gallery class="gap-4 grid-cols-4">
		{#each data.albums as album}
			<div class="flex items-center justify-center h-36 max-w- rounded-lg bg-gray-500">
				{album}
			</div>
		{/each}
	</Gallery>
</div>
