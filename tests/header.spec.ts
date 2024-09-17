import { test, expect } from '@playwright/test';
import { RESULTS_PER_PAGE } from '@/constants';
import dotenv from 'dotenv';

dotenv.config();

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Fun APIs/);
});

test('has an avatar', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // An avatar img is visible
  const avatarImg = page.getByRole('img', { name: /Avatar with .* style/ });
  await expect(avatarImg).toBeVisible();
  const src = await avatarImg.getAttribute('src');
  expect(src).not.toBeNull();
});

// has a search input
test('has a search input', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // A search input is visible
  const searchInput = page.getByRole('searchbox', { name: 'Search...' });
  await expect(searchInput).toBeVisible();

  // Search input is working
  await searchInput.fill('cats');
  await expect(searchInput).toHaveValue('cats');
});

// An API call is made when the search input is changed
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&count=${RESULTS_PER_PAGE}`;
console.log(API_URL);

test('should make a successful API call', async ({ request }) => {
  const response = await request.get(API_URL);

  expect(response.ok()).toBe(true);
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBe(RESULTS_PER_PAGE);
});
