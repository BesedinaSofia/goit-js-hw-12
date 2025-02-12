import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#load-more');

let query = '';
let page = 1;
const perPage = 40;
const lightbox = new SimpleLightbox('.gallery a');


loadMoreBtn.style.display = 'none';

form.addEventListener('submit', async event => {
    event.preventDefault();
    query = event.target.elements.searchQuery.value.trim();
    if (!query) {
        iziToast.error({ message: 'Please enter a search query!' });
        return;
    }

    page = 1;
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    loader.classList.remove('hidden');

    try {
        const data = await fetchImages(query, page, perPage);
        if (data.hits.length === 0) {
            iziToast.warning({ message: 'Sorry, no images found. Try again!' });
        } else {
            renderGallery(data.hits);
            lightbox.refresh();
            if (data.totalHits > perPage) {
                loadMoreBtn.style.display = 'block';
            }
        }
    } catch (error) {
        iziToast.error({ message: 'Error fetching images. Please try again later.' });
    } finally {
        loader.classList.add('hidden');
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    loader.classList.remove('hidden');

    try {
        const data = await fetchImages(query, page, perPage);
        renderGallery(data.hits, true);
        lightbox.refresh();
        smoothScroll();

        const maxPages = Math.ceil(data.totalHits / perPage);
        if (page >= maxPages) {
            loadMoreBtn.style.display = 'none';
            iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
        }
    } catch (error) {
        iziToast.error({ message: 'Error fetching images. Please try again later.' });
    } finally {
        loader.classList.add('hidden');
    }
});

function smoothScroll() {
    const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}
