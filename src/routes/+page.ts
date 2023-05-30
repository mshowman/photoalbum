import { photoStore } from '../lib/stores/PhotoStore';

export async function load() {
	let response = await fetch('https://jsonplaceholder.typicode.com/photos');
	let photos: Photo[] = await response.json();

	// Add photos to writable store for later use
	photoStore.setLibrary(photos);

	// Remove duplicate albumIds for Album display page
	let albums = new Set(photos.map((photo) => photo.albumId));

	return {
		albums: Array.from(albums)
	};
}
