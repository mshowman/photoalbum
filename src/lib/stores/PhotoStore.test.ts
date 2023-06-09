import chance from 'chance';
import { describe, expect, it, vi } from 'vitest';
import { photoStore } from './PhotoStore';

const SINGLE_PHOTO_ARRAY = [randomPhoto()];
const SINGLE_PHOTO_MAP = new Map<number, Photo[]>([[SINGLE_PHOTO_ARRAY[0].albumId, SINGLE_PHOTO_ARRAY]]);

const MULTI_PHOTO_IN_ONE_ALBUM_ARRAY = [randomPhoto(0), randomPhoto(0), randomPhoto(1)];
const MULTI_PHOTO_IN_ONE_ALBUM_MAP = new Map<number, Photo[]>([[0, MULTI_PHOTO_IN_ONE_ALBUM_ARRAY.slice(0,2)], [1, [MULTI_PHOTO_IN_ONE_ALBUM_ARRAY[2]]]]);

describe('PhotoStore', () => {
    it('sets sortedAlbum given an array of Photos', () => {
        photoStore.setLibrary(SINGLE_PHOTO_ARRAY);
        
        expect(photoStore.sortedAlbum.size).toBe(1);        
        expect(photoStore.sortedAlbum).toMatchObject(SINGLE_PHOTO_MAP);
        
        photoStore.setLibrary(MULTI_PHOTO_IN_ONE_ALBUM_ARRAY);
        
        expect(photoStore.sortedAlbum.size).toBe(2);        
        expect(photoStore.sortedAlbum).toMatchObject(MULTI_PHOTO_IN_ONE_ALBUM_MAP);
        
    });
    
    it('fetches all photos', async () => {
        global.fetch = vi.fn().mockImplementation(() => Promise.resolve({ json() { return Promise.resolve(MULTI_PHOTO_IN_ONE_ALBUM_ARRAY)}}));

        let photos = await photoStore.getAllPhotos();
        
        expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/photos');
        expect(photos).toMatchObject(MULTI_PHOTO_IN_ONE_ALBUM_ARRAY);
    })
});

function randomPhoto(albumId?: number): Photo {
    return {albumId: albumId ?? chance().integer({min:0,max:2}), id: chance().integer({min:0}), title: chance().string(), url: chance().url(), thumbnailUrl: chance().url()}
}
