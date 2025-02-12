export async function fetchImages(query, page = 1, perPage = 40) {
    const API_KEY = '48567917-ad299c95fd5743fafa8b1579d';
    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
    });

    try {
        const response = await fetch(`${BASE_URL}?${params}`);
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
