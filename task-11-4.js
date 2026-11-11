function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1" },
                { id: 2, title: "Post 2" }
            ]);
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!" },
                { id: 2, text: "Thanks for sharing" }
            ]);
        }, 1000);
    });
}

async function getDataWithAsync() {
    const user = await getUserData(1);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);

    return comments;
}

getDataWithAsync()
    .then(comments => console.log("Comments:", comments));

async function fetchUserData(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);

        return { user, posts };
    } catch (error) {
        console.error("Failed to fetch:", error);
        throw error;
    }
}

fetchUserData(1)
    .then(data => console.log("User data:", data))
    .catch(error => console.error("Request failed:", error));

async function getAllUsers() {
    try {
        const [user1, user2, user3] = await Promise.all([
            getUserData(1),
            getUserData(2),
            getUserData(3)
        ]);

        return [user1, user2, user3];

    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
}

getAllUsers().then(users => {
    console.log("All users:", users);
});

async function getCompleteUserData(userId) {
    try {
        const user = await getUserData(userId);
        console.log("User:", user);

        const posts = await getUserPosts(user.id);
        console.log("Posts:", posts);

        const comments = await getPostComments(posts[0].id);
        console.log("Comments:", comments);

        return { user, posts, comments };

    } catch (error) {
        console.error("Error retrieving user data:", error);
    }
}

getCompleteUserData(1);
