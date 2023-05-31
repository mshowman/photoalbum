import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	let { albumId } = params;

	if (!albumId) return { album: [] };

	const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
	const album: Photo[] = await response.json();

	if (Object.keys(album).length === 0) throw error(404, 'Album with that ID does not exist');

	return {
		album
	};
}
