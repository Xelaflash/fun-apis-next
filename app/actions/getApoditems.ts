import { ApodData } from '@/app/types/apiTypes';
import { RESULTS_PER_PAGE } from '@/constants';

export async function fetchApodData(): Promise<ApodData[]> {
  // await new Promise((resolve) => setTimeout(resolve, 0));

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&count=${RESULTS_PER_PAGE}`,
      { cache: 'no-store' },
    );

    const data = (await response.json()) as ApodData[];

    if (!response.ok) {
      throw new Error('Failed to fetch APOD data');
    }
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
}
