import { writable } from 'svelte/store';

/**
* This store would typically be used to cache the photos so avoid having to make unnecessary API calls
* as well as offer some offline support. I opted not to continue the implementation of this simply
* because I see it as a future feature (aka a nice to have).
* */
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

	/**
	 *  This function is unused in the app. It was iimplemented simply for testing purposes.
	 * */
	const getAllPhotos = async (): Promise<Photo[]> => {
		let response = await fetch('https://jsonplaceholder.typicode.com/photos');
		let photos: Photo[] = await response.json();

		return photos;
	}

	return {
		sortedAlbum,
		subscribe,
		setLibrary: (photos: Photo[]) => sortByAlbum(photos),
		getAllPhotos
	};
}

export const photoStore = createPhotoStore();
