// Travel recommendations data
const travelData = {
    beaches: [
        {
            name: "Maldives Paradise",
            description: "Crystal clear waters and white sandy beaches in the Indian Ocean.",
            images: ["images/beach1.jpg", "images/beach2.jpg"]
        },
        {
            name: "Bora Bora Luxury",
            description: "Overwater bungalows and turquoise lagoons in French Polynesia.",
            images: ["images/beach1.jpg", "images/beach2.jpg"]
        }
    ],
    temples: [
        {
            name: "Angkor Wat, Cambodia",
            description: "The world's largest religious monument, a UNESCO World Heritage site.",
            images: ["images/temple1.jpg", "images/temple2.jpg"]
        },
        {
            name: "Golden Temple, India",
            description: "A stunning gurdwara located in the heart of Amritsar.",
            images: ["images/temple1.jpg", "images/temple2.jpg"]
        }
    ],
    countries: [
        {
            name: "Japan Cultural Journey",
            description: "Experience ancient traditions and modern innovations in the Land of the Rising Sun.",
            images: ["images/country1.jpg", "images/country2.jpg"]
        },
        {
            name: "Italy Renaissance Tour",
            description: "Explore art, history, and cuisine in the heart of Europe.",
            images: ["images/country1.jpg", "images/country2.jpg"]
        }
    ]
};


document.addEventListener('DOMContentLoaded', function() {
   
    if (document.getElementById('recommendationsContainer')) {
        displayAllRecommendations();
    }

   
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', clearSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});


function displayAllRecommendations() {
    const container = document.getElementById('recommendationsContainer');
    if (!container) return;

    let html = '';

    
    html += '<div class="recommendation-category">';
    html += '<h3>🏖️ Beach Destinations</h3>';
    html += '<div class="category-grid">';
    travelData.beaches.forEach(beach => {
        html += createRecommendationCard(beach);
    });
    html += '</div></div>';

   
    html += '<div class="recommendation-category">';
    html += '<h3>🛕 Temple Destinations</h3>';
    html += '<div class="category-grid">';
    travelData.temples.forEach(temple => {
        html += createRecommendationCard(temple);
    });
    html += '</div></div>';

    
    html += '<div class="recommendation-category">';
    html += '<h3>🌍 Country Destinations</h3>';
    html += '<div class="category-grid">';
    travelData.countries.forEach(country => {
        html += createRecommendationCard(country);
    });
    html += '</div></div>';

    container.innerHTML = html;
}


function createRecommendationCard(destination) {
    return `
        <div class="recommendation-card">
            <img src="${destination.images[0]}" alt="${destination.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Travel+Image'">
            <div class="card-content">
                <h3>${destination.name}</h3>
                <p>${destination.description}</p>
            </div>
        </div>
    `;
}


function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const container = document.getElementById('recommendationsContainer');
    
    if (!container) return;

    if (!searchTerm) {
        displayAllRecommendations();
        return;
    }

    let filteredResults = [];

   
    Object.values(travelData).forEach(category => {
        category.forEach(destination => {
            if (destination.name.toLowerCase().includes(searchTerm) || 
                destination.description.toLowerCase().includes(searchTerm)) {
                filteredResults.push(destination);
            }
        });
    });

    displaySearchResults(filteredResults, searchTerm);
}


function displaySearchResults(results, searchTerm) {
    const container = document.getElementById('recommendationsContainer');
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>No destinations found for "${searchTerm}"</h3>
                <p>Try searching for beaches, temples, or countries</p>
            </div>
        `;
        return;
    }

    let html = `<h3>Search Results for "${searchTerm}"</h3><div class="search-results-grid">`;
    
    results.forEach(destination => {
        html += createRecommendationCard(destination);
    });
    
    html += '</div>';
    container.innerHTML = html;
}


function clearSearch() {
    document.getElementById('searchInput').value = '';
    displayAllRecommendations();
}


function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

   
    console.log('Form submitted:', formData);
    
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
}


const additionalCSS = `
.recommendation-category {
    margin-bottom: 3rem;
}

.recommendation-category h3 {
    margin-bottom: 1.5rem;
    color: #667eea;
    font-size: 1.5rem;
}

.category-grid,
.search-results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.no-results {
    text-align: center;
    padding: 3rem;
    color: #666;
}
`;


const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);