<script lang="ts">
	import { goto } from '$app/navigation';
	import { Card, Gallery } from 'flowbite-svelte';

	export let data;
</script>

<Gallery
	class="p-4 gap-4 grid-cols-1 sm:grid-cols-5 bg-slate-400 overflow-y-scroll w-full h-screen pb-32 fixed top-[64px] sm:top-[110px]"
>
	{#each data.album as photo}
		<Card
			class="hover:cursor-pointer"
			id={`${photo.id}`}
			img={photo.url}
			on:click={() => goto(`/photos/${photo.id}`)}
		>
			<h3>{photo.id}: {photo.title}</h3>
		</Card>
	{/each}
</Gallery>
