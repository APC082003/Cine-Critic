// Sample review data
const reviews = [
    {
        id: 1,
        title: "Inception",
        type: "movie",
        genre: "sci-fi",
        image: "images/inception.jpeg",
        rating: 4,
        date: "2023-05-15",
        author: "John Doe",
        excerpt: "A mind-bending masterpiece that challenges perception and reality. Christopher Nolan delivers another visually stunning and intellectually engaging film.",
        fullReview: "Inception is a cinematic tour de force that blends science fiction with heist thriller elements. Leonardo DiCaprio delivers a powerful performance as Dom Cobb, a skilled extractor who specializes in stealing secrets from people's subconscious during dream states. The visual effects are groundbreaking, particularly the scenes featuring bending cityscapes and zero-gravity fights. Hans Zimmer's score perfectly complements the film's tension and emotional depth. While the complex narrative may require multiple viewings to fully grasp, it's this very complexity that makes Inception so rewarding."
    },
    {
        id: 2,
        title: "Breaking Bad",
        type: "series",
        genre: "drama",
        image: "images/breaking-bad.jpg",
        rating: 5,
        date: "2023-04-22",
        author: "Jane Smith",
        excerpt: "One of the greatest TV series ever made, with unparalleled character development and storytelling.",
        fullReview: "Breaking Bad is a masterclass in television storytelling, featuring one of the most remarkable character arcs in TV history. Bryan Cranston's transformation from mild-mannered chemistry teacher Walter White to ruthless drug kingpin Heisenberg is nothing short of extraordinary. The writing is consistently brilliant, with each season building tension and raising the stakes. The supporting cast, particularly Aaron Paul as Jesse Pinkman, delivers equally compelling performances. The cinematography and direction are cinematic in quality, making Breaking Bad not just great television, but great art."
    },
    {
        id: 3,
        title: "The Dark Knight",
        type: "movie",
        genre: "action",
        image: "images/dark-knight.jpg",
        rating: 5,
        date: "2023-03-10",
        author: "Mike Johnson",
        excerpt: "Heath Ledger's Joker is one of the most iconic performances in cinema history.",
        fullReview: "The Dark Knight transcends the superhero genre to become a gripping crime drama. Christopher Nolan's direction is flawless, creating a Gotham City that feels both fantastical and grounded in reality. Christian Bale delivers a strong performance as Bruce Wayne/Batman, but it's Heath Ledger's unforgettable portrayal of the Joker that elevates the film to legendary status. The moral dilemmas presented throughout the film add depth rarely seen in comic book adaptations. With spectacular action sequences, a haunting score, and profound themes about chaos and order, The Dark Knight sets the standard for what superhero films can achieve."
    },
    {
        id: 4,
        title: "Stranger Things",
        type: "series",
        genre: "sci-fi",
        image: "images/stranger-things.jpg",
        rating: 4,
        date: "2023-02-18",
        author: "Sarah Williams",
        excerpt: "A nostalgic trip to the 80s with supernatural elements and lovable characters.",
        fullReview: "Stranger Things brilliantly captures the spirit of 1980s Amblin entertainment while adding its own unique supernatural twist. The young cast delivers remarkably mature performances, particularly Millie Bobby Brown as Eleven. The Duffer Brothers expertly balance horror, sci-fi, and coming-of-age drama, creating a show that appeals to both younger and older audiences. While later seasons occasionally struggle to maintain the freshness of the first, the series remains consistently entertaining with its blend of nostalgia, humor, and genuine scares. The production design and soundtrack perfectly evoke the 1980s setting."
    },
    {
        id: 5,
        title: "Parasite",
        type: "movie",
        genre: "drama",
        image: "images/parasite.jpg",
        rating: 5,
        date: "2023-01-05",
        author: "David Kim",
        excerpt: "A genre-defying masterpiece that offers sharp social commentary.",
        fullReview: "Bong Joon-ho's Parasite is a cinematic triumph that seamlessly blends dark comedy, thriller elements, and social drama. The film's exploration of class disparity is both incisive and entertaining, with each act taking unexpected turns that keep viewers on the edge of their seats. The ensemble cast delivers flawless performances, particularly Song Kang-ho as the patriarch of the Kim family. The production design is meticulous, with the Park family's modernist home serving as a character in itself. Parasite's universal themes and masterful storytelling rightfully earned it historic Oscar wins, including Best Picture."
    }
];

// DOM Elements
const featuredReviewsContainer = document.getElementById('featuredReviews');
const allReviewsContainer = document.getElementById('allReviews');
const mediaTypeFilter = document.getElementById('mediaTypeFilter');
const genreFilter = document.getElementById('genreFilter');
const ratingFilter = document.getElementById('ratingFilter');
const newsletterForm = document.getElementById('newsletterForm');

// Display featured reviews on homepage
function displayFeaturedReviews() {
    if (!featuredReviewsContainer) return;
    
    const featured = reviews.slice(0, 3); // Get first 3 reviews as featured
    featuredReviewsContainer.innerHTML = featured.map(review => createReviewCard(review)).join('');
}

// Display all reviews on reviews page
function displayAllReviews() {
    if (!allReviewsContainer) return;
    
    allReviewsContainer.innerHTML = reviews.map(review => createReviewCard(review)).join('');
}

// Create review card HTML
function createReviewCard(review) {
    return `
        <div class="review-card" data-id="${review.id}" data-type="${review.type}" data-genre="${review.genre}" data-rating="${review.rating}">
            <img src="${review.image}" alt="${review.title}">
            <div class="review-content">
                <h3>${review.title}</h3>
                <div class="meta-info">
                    <span>${review.type === 'movie' ? 'Movie' : 'TV Series'}</span>
                    <span class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                </div>
                <p>${review.excerpt}</p>
                <a href="#" class="read-more" data-id="${review.id}">Read Full Review</a>
            </div>
        </div>
    `;
}

// Filter reviews based on selected options
function filterReviews() {
    if (!allReviewsContainer) return;
    
    const selectedType = mediaTypeFilter.value;
    const selectedGenre = genreFilter.value;
    const selectedRating = ratingFilter.value;
    
    const filteredReviews = reviews.filter(review => {
        return (selectedType === 'all' || review.type === selectedType) &&
               (selectedGenre === 'all' || review.genre === selectedGenre) &&
               (selectedRating === 'all' || review.rating >= parseInt(selectedRating));
    });
    
    allReviewsContainer.innerHTML = filteredReviews.map(review => createReviewCard(review)).join('');
}

// Handle newsletter subscription
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    // In a real app, you would send this to a server
    alert(`Thank you for subscribing with ${email}! You'll receive our weekly reviews.`);
    e.target.reset();
}

// Initialize the page
function init() {
    displayFeaturedReviews();
    displayAllReviews();
    
    // Add event listeners
    if (mediaTypeFilter) {
        mediaTypeFilter.addEventListener('change', filterReviews);
        genreFilter.addEventListener('change', filterReviews);
        ratingFilter.addEventListener('change', filterReviews);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // For demo purposes, we'll handle the "Read More" click here
    // In a real app, you might have a separate page for each review
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('read-more')) {
            e.preventDefault();
            const reviewId = parseInt(e.target.getAttribute('data-id'));
            const review = reviews.find(r => r.id === reviewId);
            alert(`Full Review of ${review.title}:\n\n${review.fullReview}`);
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// FAQ functionality for contact page
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                question.classList.toggle('active');
                const answer = question.nextElementSibling;
                answer.classList.toggle('show');
            });
        });
    }
}

// Contact form submission
function handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    
    // In a real app, you would send this data to a server
    console.log('Form submitted:', formProps);
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
}

// Update the init function to include these
function init() {
    displayFeaturedReviews();
    displayAllReviews();
    setupFAQ();
    
    // Add event listeners
    if (mediaTypeFilter) {
        mediaTypeFilter.addEventListener('change', filterReviews);
        genreFilter.addEventListener('change', filterReviews);
        ratingFilter.addEventListener('change', filterReviews);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // For demo purposes, we'll handle the "Read More" click here
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('read-more')) {
            e.preventDefault();
            const reviewId = parseInt(e.target.getAttribute('data-id'));
            const review = reviews.find(r => r.id === reviewId);
            alert(`Full Review of ${review.title}:\n\n${review.fullReview}`);
        }
    });
}