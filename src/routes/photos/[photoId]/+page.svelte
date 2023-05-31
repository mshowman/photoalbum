<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Card, Listgroup } from 'flowbite-svelte';

	export let data;

	$: photo = data.photo;
	$: photoItems = [
		{ label: 'Album ID', value: photo.albumId },
		{ label: 'Photo ID', value: photo.id },
		{ label: 'Full Size', value: photo.url },
		{ label: 'Thumbnail', value: photo.thumbnailUrl }
	];
</script>

<div
	class="flex flex-col justify-evenly items-center h-screen sm:h-[calc(100vh-110px)] w-full overflow-y-scroll bg-slate-300 sm:absolute sm:top-[110px] px-2 pt-32 pb-2 sm:p-0"
>
	{#if !!photo}
		<Card img={photo?.url} class="mx-2">
			<p class="text-center font-semibold text-lg mb-2">{photo.title}</p>

			<Listgroup items={photoItems} let:item>
				<p class="font-semibold text-md mb-2">{item.label}: {item.value}</p>
			</Listgroup>

			<div class="flex justify-evenly pt-2">
				<Button
					on:click={() => {
						goto(`/albums/${photo?.albumId}`);
					}}
				>
					Go to Album
				</Button>
				<Button
					on:click={() => {
						goto('/');
					}}
				>
					Home
				</Button>
			</div>
		</Card>
	{:else}
		<p class="font-semibold text-5xl">Photo not found</p>
		<Button href="/">Go Back</Button>
	{/if}
</div>
