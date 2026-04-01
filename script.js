let start = 0;
const limit = 5;
let allPosts = [];

async function loadPosts() {
    start = 0;
    allPosts = [];
    document.getElementById("posts").innerHTML = "";
    await fetchPosts();
}

async function loadMore() {
    start += limit;
    await fetchPosts();
}

async function fetchPosts() {
    const status = document.getElementById("status");
    status.textContent = "Loading...";

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`);
        const posts = await response.json();

        allPosts = [...allPosts, ...posts];
        displayPosts(allPosts);

        status.textContent = "";

    } catch (error) {
        status.textContent = "Failed to load ❌";
    }
}

function displayPosts(posts) {
    const container = document.getElementById("posts");
    container.innerHTML = "";

    if (posts.length === 0) {
        container.innerHTML = "<p>No posts found 😢</p>";
        return;
    }

    posts.forEach(post => {
        const div = document.createElement("div");
        div.classList.add("post");

        div.innerHTML = `
            <h3>${post.title.toUpperCase()}</h3>
            <p>${post.body}</p>
            <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
        `;

        container.appendChild(div);
    });
}

function deletePost(id) {
    allPosts = allPosts.filter(post => post.id !== id);
    displayPosts(allPosts);
}

function searchPosts() {
    const query = document.getElementById("search").value.toLowerCase();

    const filtered = allPosts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query)
    );

    displayPosts(filtered);
}
