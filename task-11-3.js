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

// Promise chaining
getUserData(1)
    .then(user => {
        console.log("User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error:", error);
    });

const promise1 = getUserData(1);
const promise2 = getUserData(2);
const promise3 = getUserData(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log("All users:", results);
    })
    .catch(error => {
        console.error("One failed:", error);
    });

const fast = new Promise(resolve => {
    setTimeout(() => resolve("Fast!"), 100);
});

const slow = new Promise(resolve => {
    setTimeout(() => resolve("Slow!"), 500);
});

Promise.race([fast, slow])
    .then(result => {
        console.log("Winner:", result);
    });

function displayThreeUsers() {
    Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ])
        .then(users => {
            console.log("Three users fetched successfully:");

            users.forEach(user => {
                console.log(user);
            });
        })
        .catch(error => {
            console.error("Failed to fetch users:", error);
        });
}

displayThreeUsers();
