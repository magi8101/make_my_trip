// Function to animate loading bar
function animateLoadingBar() {
    const loadingBar = document.getElementById('loadingBar');
    loadingBar.style.transform = 'translateX(0)';
    setTimeout(() => {
        loadingBar.style.transform = 'translateX(100%)';
    }, 300);
    setTimeout(() => {
        loadingBar.style.transform = 'translateX(-100%)';
    }, 600);
}

// Handle search form submission
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    animateLoadingBar();

    // Simulate search delay and display mock results
    setTimeout(() => {
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const travelers = document.getElementById('travelers').value;
        const travelClass = document.getElementById('class').value;

        // Mock search results
        const results = [
            { airline: 'AirIndia ✈️', departure: '10:00 AM', arrival: '12:00 PM', price: '$300' },
            { airline: 'IndiGo 🛩️', departure: '2:00 PM', arrival: '4:00 PM', price: '$280' },
            { airline: 'SpiceJet 🚀', departure: '6:00 PM', arrival: '8:00 PM', price: '$320' }
        ];

        displaySearchResults(results, from, to, startDate, endDate, travelers, travelClass);
    }, 1000);
});

// Display search results
function displaySearchResults(results, from, to, startDate, endDate, travelers, travelClass) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = `
        <h2>Flight Results</h2>
        <p>From ${from} to ${to}</p>
        <p>Start Date: ${startDate} | End Date: ${endDate}</p>
        <p>${travelers} | ${travelClass}</p>
    `;

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'search-result';
        resultElement.innerHTML = `
            <div>
                <h3>${result.airline}</h3>
                <p>✈️ Departure: ${result.departure} | 🛬 Arrival: ${result.arrival}</p>
            </div>
            <div>
                <p>💰 ${result.price}</p>
                <button class="book-button">✅ Book Now</button>
            </div>
        `;
        resultsContainer.appendChild(resultElement);
    });

    resultsContainer.style.display = 'block';
}

// Fare category selection and animation
document.querySelectorAll('.fare-category').forEach(function (category) {
    category.addEventListener('click', function () {
        this.classList.toggle('active');
    });
});

// Handle dynamic date input validation
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
startDate.addEventListener('change', function () {
    endDate.min = this.value;
});
endDate.addEventListener('change', function () {
    if (this.value < startDate.value) {
        this.value = startDate.value;
    }
});

// Set minimum date to today for both inputs
const today = new Date().toISOString().split('T')[0];
startDate.min = today;
endDate.min = today;
