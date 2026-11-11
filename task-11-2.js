function getUserData(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "John" });
    }, 1000);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ]);
    }, 1000);
}

function getPostComments(postId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, text: "Great post!" },
            { id: 2, text: "Thanks for sharing" }
        ]);
    }, 1000);
}

// Callback Hell
getUserData(1, function(user) {
    console.log("User:", user);

    getUserPosts(user.id, function(posts) {
        console.log("Posts:", posts);

        getPostComments(posts[0].id, function(comments) {
            console.log("Comments:", comments);
        });
    });
});

function getUserDataPromise(userId) {
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

function getUserPostsPromise(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1" },
                { id: 2, title: "Post 2" }
            ]);
        }, 1000);
    });
}

function getPostCommentsPromise(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!" },
                { id: 2, text: "Thanks for sharing" }
            ]);
        }, 1000);
    });
}

// Test Promise
getUserDataPromise(1)
    .then(user => console.log("Promise user:", user))
    .catch(error => console.error("Error:", error));
