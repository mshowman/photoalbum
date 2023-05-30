<script lang="ts">
	import { photoStore } from '$lib/stores/PhotoStore';
	import { Button, Carousel, Gallery, Modal } from 'flowbite-svelte';

	export let data;
	let open = false;
	let selectedAlbum: number | null = null;

	let colors = ['green', 'purple', 'blue', 'pink', 'teal'];

	$: selectedAlbumPhotos = getPhotosForCarousel(selectedAlbum);

	function getPhotosForCarousel(selectedAlbum: number | null): CarouselPhoto[] {
		if (!selectedAlbum) {
			return [];
		}

		return (
			photoStore.sortedAlbum.get(selectedAlbum)?.map((photo) => {
				return {
					id: photo.id,
					name: photo.title,
					imgurl: photo.url,
					attribution: photo.url
				};
			}) ?? []
		);
	}
</script>

<div class=" bg-slate-500">
	<p class="font-semibold dark:text-white">Album View</p>
	<p class="font-semibold dark:text-white">Click an album to view a preview gallery</p>
	<Gallery class="gap-4 grid-cols-10 p-4">
		{#each data.albums as album, index}
			<div
				on:click={() => {
					selectedAlbum = album;
					open = true;
				}}
				on:keypress={() => {
					selectedAlbum = album;
					open = true;
				}}
				class={`flex items-center justify-center h-36 max-w- rounded-lg bg-${
					colors[index % 5]
				}-500 hover:cursor-pointer opacity-100 hover:opacity-70 hover:border-4 hover:border-white`}
			>
				{album}
			</div>
		{/each}
	</Gallery>

	<Modal bind:open placement="center">
		<Button href={`/albums/${selectedAlbum}`}>View Entire Album</Button>
		<Carousel
			images={selectedAlbumPhotos.slice(0, 10)}
			showIndicators={true}
			showCaptions={true}
			showThumbs={true}
			loop
			duration={1500}
		/>
	</Modal>
</div>
