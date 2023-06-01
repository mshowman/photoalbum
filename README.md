# PhotoAlbum

Tech showcase for UI using [Svelte](https://svelte.dev), Sveltekit, [Flowbite Svelte](https://flowbite-svelte.com/), Typescript, Vitest, and Playwright tests.

## Features

#### Navbar

- Search by Photo ID

#### Home Page - `/`

- Provides list of available albums
  > Clicking a card will present a modal providing a preview of the first 10 photos available in the album. You can choose to view the entire album from this modal.

#### Album Page - `/albums/[albumId]`

- Provides list of available photos in album
  > Clicking a card will navigate to that photo's unique page

#### Photo Page - `/photos/[photoId]`

- Provides details for specific photo

#### Responsive Design

- Support for mobile and desktop screen sizes

## Limitations / Future Thinking

I tried to implement a bunch of things to enhance the showcase requirements. I decided to try Tailwind CSS for this project (just because I was interested in it), which I think looks pretty decent for a POC.

Obviously, the testing applied to this app is limited. I tried to show unit testing and E2E testing using Vitest and Playwright respectively. I've never used either of these, but I have experience with Jest, Cypress, Selenium, etc. so it really wasn't any different.

Navigating to `/photos` or `/albums` will redirect to `/`. I'd normally implement pages for these routes that would offer additional features like adding/editing/removing photos or albums, etc.

Navigating to an invalid ID for photo or album will present a simple error page. I could see offering a page that would use incremental search so you could see all of the photos or albums that contain the search text.

> Example: Searching `12` would present a list with all photos with IDs containing `12`

## Running the application

1. Install dependencies with `npm install` (or `pnpm install` or `yarn`)
2. Start server with `npm run dev -- --open`

## Running tests

- To run unit tests: `npm run test:unit`
- To run e2e tests: `npm run test`
