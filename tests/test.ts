import { expect, test } from '@playwright/test';

test('Navbar logo and product title navigates to home page', async ({ page }) => {
	await page.goto('http://localhost:4173/albums/1');

	await expect(page).toHaveURL('http://localhost:4173/albums/1');

	await page.getByRole('link', { name: 'Photo Album' }).click();

	await expect(page).toHaveURL('http://localhost:4173/');
});

test.describe('Searching by photo ID', () => {
	test('returns to album if Go to Album button was clicked', async ({ page }) => {
		await page.goto('http://localhost:4173/');

		await page.getByPlaceholder('Search by Photo ID').click();
		await page.getByPlaceholder('Search by Photo ID').fill('123');
		await page.getByRole('button', { name: 'Search' }).click();

		await page.waitForURL('http://localhost:4173/photos/123');
		expect(await page.getByPlaceholder('Search by Photo ID').textContent()).toBe('');

		await page.getByRole('button', { name: 'Go to Album' }).click();

		await page.waitForURL('http://localhost:4173/albums/3');
	});

	test('returns to home page if Home button was clicked', async ({ page }) => {
		await page.goto('http://localhost:4173/');

		await page.getByPlaceholder('Search by Photo ID').click();
		await page.getByPlaceholder('Search by Photo ID').fill('123');
		await page.getByRole('button', { name: 'Search' }).click();

		await page.waitForURL('http://localhost:4173/photos/123');
		expect(await page.getByPlaceholder('Search by Photo ID').textContent()).toBe('');

		await page.getByRole('button', { name: 'Home' }).click();

		await page.waitForURL('http://localhost:4173/');
	});
});

test.describe('Redirects', () => {
	test('/albums redirects to home page', async ({ page }) => {
		await page.goto('http://localhost:4173/albums');
		await page.waitForURL('http://localhost:4173/');
	});

	test('/photos redirects to home page', async ({ page }) => {
		await page.goto('http://localhost:4173/photos');
		await page.waitForURL('http://localhost:4173/');
	});
});

test.describe('Error Pages', () => {
	test('invalid album ID navigates to error page', async ({ page }) => {
		await page.goto('http://localhost:4173/albums/300');
		expect(page.getByText('Album with that ID does not exist')).not.toBeNull();
	});

	test('invalid photo ID navigates to error page', async ({ page }) => {
		await page.goto('http://localhost:4173/photos/10300');
		expect(page.getByText('Album with that ID does not exist')).not.toBeNull();
	});
});
