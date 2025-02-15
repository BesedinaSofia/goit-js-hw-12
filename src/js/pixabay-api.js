import axios from 'axios';

export async function fetchImages(query, page = 1, perPage = 40) {
    const API_KEY = '48567917-ad299c95fd5743fafa8b1579d';
    const BASE_URL = 'https://pixabay.com/api/';
    
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
    };

    try {
        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
