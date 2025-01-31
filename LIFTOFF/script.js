// Cache DOM elements
const searchForm = document.getElementById('searchForm');
const searchResults = document.getElementById('searchResults');
const loadingBar = document.getElementById('loadingBar');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const fareCategories = document.querySelectorAll('.fare-category');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const discounts = {
    "Student": "https://www.airindia.in/student-discount.htm",
    "Senior Citizen": "https://www.indigo.in/senior-citizen-discount",
    "Armed Forces": "https://www.emirates.com/armed-forces-discount"
};

// Predefined cities for autocomplete suggestions
const cities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Miami",
    "London", "Paris", "Tokyo", "Dubai", "Sydney"
];

// Function to populate city options
document.addEventListener('DOMContentLoaded', () => {
    fromInput.setAttribute('list', 'cityOptions');
    toInput.setAttribute('list', 'cityOptions');
    const datalist = document.createElement('datalist');
    datalist.id = 'cityOptions';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        datalist.appendChild(option);
    });
    document.body.appendChild(datalist);
});

// Function to animate loading bar smoothly
function animateLoadingBar() {
    loadingBar.style.width = '100%';
    loadingBar.style.opacity = '1';
    setTimeout(() => {
        loadingBar.style.opacity = '0';
        loadingBar.style.width = '0';
    }, 800);
}

// Handle search form submission
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    animateLoadingBar();

    setTimeout(() => {
        const searchData = {
            from: fromInput.value,
            to: toInput.value,
            startDate: startDate.value,
            endDate: endDate.value,
            travelers: document.getElementById('travelers').value,
            travelClass: document.getElementById('class').value
        };

        // Mock API Call Simulation with actual airline booking links
        const results = [
            { airline: '✈️ AirIndia', departure: '10:00 AM', arrival: '12:00 PM', price: '$300', link: 'https://www.airindia.in/' },
            { airline: '🛩️ IndiGo', departure: '2:00 PM', arrival: '4:00 PM', price: '$280', link: 'https://www.goindigo.in/' },
            { airline: '🚀 Emirates', departure: '6:00 PM', arrival: '8:00 PM', price: '$500', link: 'https://www.emirates.com/' }
        ];

        displaySearchResults(results, searchData);
    }, 1000);
});

// Display search results with smooth animation
function displaySearchResults(results, searchData) {
    searchResults.innerHTML = `
        <h2 class='results-title'>Flight Results</h2>
        <p>From <strong>${searchData.from}</strong> to <strong>${searchData.to}</strong></p>
        <p>📅 ${searchData.startDate} - ${searchData.endDate}</p>
        <p>👥 ${searchData.travelers} | 🏷️ ${searchData.travelClass}</p>
    `;

    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'search-result fade-in';
        resultElement.innerHTML = `
            <div>
                <h3>${result.airline}</h3>
                <p>⏰ Departure: ${result.departure} | 🛬 Arrival: ${result.arrival}</p>
            </div>
            <div>
                <p>💰 ${result.price}</p>
                <a href="${result.link}" target="_blank" class="book-button">✅ Book Now</a>
            </div>
        `;
        fragment.appendChild(resultElement);
    });

    searchResults.appendChild(fragment);
    searchResults.style.display = 'block';
}

// Optimize fare category selection and apply discount links
document.querySelector('.fare-categories').addEventListener('click', function (e) {
    if (e.target.classList.contains('fare-category')) {
        e.target.classList.toggle('active');
        const categoryText = e.target.textContent.trim();
        if (discounts[categoryText]) {
            window.open(discounts[categoryText], '_blank');
        }
    }
});

// Handle dynamic date input validation
startDate.addEventListener('change', () => {
    endDate.min = startDate.value;
});

endDate.addEventListener('change', () => {
    if (endDate.value < startDate.value) {
        endDate.value = startDate.value;
    }
});

// Set minimum date to today for both inputs
const today = new Date().toISOString().split('T')[0];
startDate.min = today;
endDate.min = today;
