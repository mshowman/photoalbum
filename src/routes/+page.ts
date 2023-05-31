import { photoStore } from '$lib/stores/PhotoStore';

export async function load({ fetch }) {
	const getAlbums = async (): Promise<Photo[]> => {
		let response = await fetch('https://jsonplaceholder.typicode.com/photos');
		return await response.json();
	};

	const photos = await getAlbums();

	// Add photos to writable store for later use
	photoStore.setLibrary(photos);

	// Remove duplicate albumIds for Album display page
	let albums = new Set(photos.map((photo) => photo.albumId));

	return {
		albums: Array.from(albums)
	};
}
