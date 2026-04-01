async function loadPosts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await response.json();

        const container = document.getElementById("posts");

        posts.slice(0, 5).forEach(post => {
            const div = document.createElement("div");

           div.innerHTML = `
    <h3>${post.title.toUpperCase()}</h3>
    <p>${post.body}</p>
`;

            container.appendChild(div);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

loadPosts();