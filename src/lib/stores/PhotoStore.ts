import { writable } from 'svelte/store';

function createPhotoStore() {
	const { subscribe, set } = writable<Photo[]>([]);
	const sortedAlbum = new Map<number, Photo[]>();

	const sortByAlbum = (photos: Photo[]) => {
		photos.forEach((photo) => {
			if (sortedAlbum.has(photo.albumId)) {
				sortedAlbum.get(photo.albumId)?.push(photo);
			} else {
				sortedAlbum.set(photo.albumId, [photo]);
			}
		});

		set(photos);
	};

	return {
		sortedAlbum,
		subscribe,
		setLibrary: (photos: Photo[]) => sortByAlbum(photos)
	};
}

export const photoStore = createPhotoStore();
