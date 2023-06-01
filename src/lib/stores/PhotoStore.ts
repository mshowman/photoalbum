import { writable } from 'svelte/store';

/*
* This store would typically be used to cache the photos so avoid having to make unnecessary API calls
* as well as offer some offline support. I opted not to continue the implementation of this simply
* because I see it as a future feature (aka a nice to have).
*/
function createPhotoStore() {
	const { subscribe, set } = writable<Photo[]>([]);
	const sortedAlbum = new Map<number, Photo[]>();

	const sortByAlbum = (photos: Photo[]) => {
		sortedAlbum.clear();

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
