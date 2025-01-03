const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const carouselContainer = document.querySelector('.cat');

prevButton.addEventListener('click', () => {
    carouselContainer.scrollBy({ left: -200, behavior: 'smooth' });
});

nextButton.addEventListener('click', () => {
    carouselContainer.scrollBy({ left: 200, behavior: 'smooth' });
});
