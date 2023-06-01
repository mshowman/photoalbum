<script lang="ts">
	import { photoStore } from '$lib/stores/PhotoStore';
	import { Button, Carousel, Gallery, Modal } from 'flowbite-svelte';

	export let data;
	let open = false;
	let selectedAlbum: number | null = null;

	let colors = ['green', 'purple', 'blue', 'red', 'yellow'];

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

<div class="bg-slate-300 overflow-y-scroll h-screen pt-28">
	<p class="font-semibold text-5xl text-center dark:text-white mt-2">Album View</p>
	<p class="font-semibold text-3xl text-center dark:text-white mb-4">
		Click an album to view a preview gallery
	</p>
	<Gallery class="gap-4 grid-cols-2 sm:grid-cols-10 p-4">
		{#each data.albums as album, index}
			<Button
				color={colors[index % 5]}
				on:click={() => {
					selectedAlbum = album;
					open = true;
				}}
				class={`flex items-center justify-center h-36 max-w- rounded-lg opacity-100 hover:opacity-70 hover:border-4 hover:border-black`}
			>
				{album}
			</Button>
		{/each}
	</Gallery>

	<Modal bind:open placement="center">
		<Button href={`/albums/${selectedAlbum}`}>View Entire Album</Button>
		<p class="font-semibold text-lg">Preview of first 10 photos</p>
		<Carousel
			images={selectedAlbumPhotos.slice(0, 10)}
			showIndicators={true}
			showCaptions={false}
			showThumbs={false}
			loop
			duration={1500}
		/>
	</Modal>
</div>
