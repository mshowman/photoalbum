<script lang="ts">
	import { Card, CardPlaceholder, Gallery } from 'flowbite-svelte';

	export let data;

	async function getAlbumPhotos(): Promise<Photo[]> {
		let response = await fetch(`https://jsonplaceholder.typicode.com/photos?album=${data.albumId}`);
		return await response.json();
	}
</script>

<Gallery class="p-4 gap-4 grid-cols-5 bg-slate-500">
	{#await getAlbumPhotos()}
		{#each Array(10).fill(null) as _}
			<CardPlaceholder />
		{/each}
	{:then photos}
		{#each photos as photo}
			<Card img={photo.url}>
				<h3>{photo.id}: {photo.title}</h3>
			</Card>
		{/each}
	{/await}
</Gallery>
