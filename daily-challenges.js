function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function runDelay() {
    await delay(2000);
    console.log("This prints after 2 seconds");
}

runDelay();

function randomDelay1() {
    return new Promise(resolve => {
        const time = Math.random() * 2000;
        setTimeout(() => resolve("First function completed"), time);
    });
}

function randomDelay2() {
    return new Promise(resolve => {
        const time = Math.random() * 2000;
        setTimeout(() => resolve("Second function completed"), time);
    });
}

function randomDelay3() {
    return new Promise(resolve => {
        const time = Math.random() * 2000;
        setTimeout(() => resolve("Third function completed"), time);
    });
}

console.time("Total execution time");

randomDelay1()
    .then(result => {
        console.log(result);
        return randomDelay2();
    })
    .then(result => {
        console.log(result);
        return randomDelay3();
    })
    .then(result => {
        console.log(result);
        console.timeEnd("Total execution time");
    })
    .catch(error => console.error(error));

async function fetchUser(userId) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        if (response.status === 404) {
            return {
                id: userId,
                name: "Default User",
                email: "default@example.com"
            };
        }

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        return await response.json();

    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}

async function testFetchUser() {
    const user = await fetchUser(999);
    console.log("User:", user);
}

testFetchUser();

function loadUserWithCallback(userId, callback) {
    setTimeout(() => {
        const user = {
            id: userId,
            name: "Evans"
        };

        callback(user);
    }, 1500);
}

// Convert callback into a Promise
function loadUserPromise(userId) {
    return new Promise(resolve => {
        loadUserWithCallback(userId, resolve);
    });
}

// Rewrite using async/await
async function displayUser() {
    const user = await loadUserPromise(1);
    console.log("User loaded:", user);
}

displayUser();

async function fetchMultipleEndpoints() {
    const endpoints = [
        "https://jsonplaceholder.typicode.com/users",
        "https://jsonplaceholder.typicode.com/posts",
        "https://jsonplaceholder.typicode.com/comments"
    ];

    const requests = endpoints.map(async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        return response.json();
    });

    // Display each result as it completes
    requests.forEach((request, index) => {
        request
            .then(data => {
                console.log(`Endpoint ${index + 1} completed:`, data);
            })
            .catch(error => {
                console.error(`Endpoint ${index + 1} failed:`, error.message);
            });
    });

    // Wait for all requests to settle
    const results = await Promise.allSettled(requests);

    console.log("All requests settled:", results);
}

fetchMultipleEndpoints();
