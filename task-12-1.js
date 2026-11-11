// Fetch a single user
fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
        console.log("Response object:", response);
        console.log("Status:", response.status);
        console.log("OK:", response.ok);

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        return response.json();
    })
    .then(data => {
        console.log("User data:", data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });

async function getUser(id) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

async function main() {
    const user = await getUser(1);
    console.log("Async user:", user);
}

main();

async function getAllUsers() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        console.log("All users:", users);

    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

getAllUsers();

async function getUserPosts() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/1/posts"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const posts = await response.json();

        console.log("User 1 posts:", posts);

    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

getUserPosts();
