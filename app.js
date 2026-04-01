// PROMISE FUNCTIONS
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
                { id: 2, text: "Nice one!" }
            ]);
        }, 1000);
    });
}


// 🔗 PROMISE CHAINING
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


// ⚡ PROMISE.ALL
const promise1 = getUserData(1);
const promise2 = getUserData(2);
const promise3 = getUserData(3);

Promise.all([promise1, promise2, promise3])
    .then(users => {
        console.log("All users:", users);
    })
    .catch(error => {
        console.error("One failed:", error);
    });


// 🏁 PROMISE.RACE
const fast = new Promise(resolve =>
    setTimeout(() => resolve("Fast!"), 100)
);

const slow = new Promise(resolve =>
    setTimeout(() => resolve("Slow!"), 500)
);

Promise.race([fast, slow])
    .then(result => {
        console.log("Winner:", result);
    });

    async function getDataWithAsync() {
    const user = await getUserData(1);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);

    return comments;
}

// Run it
getDataWithAsync().then(comments => {
    console.log("Async/Await comments:", comments);
});

const fetch = require("node-fetch");

async function fetchUserData(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);

        return { user, posts };

    } catch (error) {
        console.error("Failed:", error);
    }
}

// Test it
fetchUserData(1).then(data => {
    console.log("User + Posts:", data);
});

async function getAllUsers() {
    const [u1, u2, u3] = await Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ]);

    console.log("All users (async):", [u1, u2, u3]);
}

getAllUsers();