const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const cityFilter = document.getElementById("city-filter");
const emptyMessage = document.getElementById("empty-message");

let allUsers = [];

async function loadUsers() {
    try {
        showLoading();

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        allUsers = await response.json();

        populateCities();
        displayUsers(allUsers);

    } catch (error) {
        showError(error.message);

    } finally {
        hideLoading();
    }
}

function showLoading() {
    loading.classList.remove("hidden");
    errorDiv.classList.add("hidden");
    container.innerHTML = "";
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.classList.remove("hidden");
}

function populateCities() {
    const cities = [...new Set(
        allUsers.map(user => user.address.city)
    )];

    cities.sort();

    cities.forEach(city => {
        const option = document.createElement("option");

        option.value = city;
        option.textContent = city;

        cityFilter.appendChild(option);
    });
}

function displayUsers(users) {
    container.innerHTML = "";

    emptyMessage.classList.toggle("hidden", users.length > 0);

    users.forEach(user => {
        const card = document.createElement("article");
        card.classList.add("user-card");

        const name = document.createElement("h2");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.textContent = `📧 ${user.email}`;

        const company = document.createElement("p");
        company.textContent = `🏢 ${user.company.name}`;

        const city = document.createElement("p");
        city.textContent = `📍 ${user.address.city}`;

        card.append(name, email, company, city);
        container.appendChild(card);
    });
}

function filterAndSortUsers() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedCity = cityFilter.value;
    const sortOrder = sortSelect.value;

    let filteredUsers = allUsers.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query);

        const matchesCity =
            selectedCity === "all" ||
            user.address.city === selectedCity;

        return matchesSearch && matchesCity;
    });

    filteredUsers.sort((a, b) => {
        return sortOrder === "az"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });

    displayUsers(filteredUsers);
}

// Search event
searchInput.addEventListener("input", filterAndSortUsers);

// Sorting event
sortSelect.addEventListener("change", filterAndSortUsers);

// City filtering event
cityFilter.addEventListener("change", filterAndSortUsers);

// Initialize application
loadUsers();
