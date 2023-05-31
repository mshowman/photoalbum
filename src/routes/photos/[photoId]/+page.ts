import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	let { photoId } = params;

	if (!photoId) return { photo: {} };

	const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
	const photo: Photo = await response.json();

	if (Object.keys(photo).length === 0) throw error(404, 'Photo with that ID does not exist');

	return {
		photo
	};
}
