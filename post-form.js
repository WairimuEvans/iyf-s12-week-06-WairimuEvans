const form = document.getElementById("post-form");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const userIdInput = document.getElementById("user-id");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const postDisplay = document.getElementById("post-display");

async function createPost(title, body, userId) {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                body,
                userId
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    const userId = Number(userIdInput.value);

    if (!title || !body || !Number.isInteger(userId) || userId < 1) {
        error.textContent = "Please enter valid post information.";
        return;
    }

    try {
        loading.hidden = false;
        error.textContent = "";
        postDisplay.hidden = true;

        const newPost = await createPost(title, body, userId);

        displayPost(newPost);

        form.reset();

    } catch (err) {
        error.textContent = err.message;

    } finally {
        loading.hidden = true;
    }
});

function displayPost(post) {
    postDisplay.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = post.title;

    const content = document.createElement("p");
    content.textContent = post.body;

    const user = document.createElement("p");
    user.textContent = `User ID: ${post.userId}`;

    const id = document.createElement("p");
    id.textContent = `Post ID: ${post.id}`;

    postDisplay.append(heading, content, user, id);
    postDisplay.hidden = false;
}
