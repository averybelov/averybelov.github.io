async function fetchBlogPosts() {
    const loadingIndicator = document.getElementById("loading");
    const postsList = document.getElementById("latest-posts");

    // Show the loading indicator
    loadingIndicator.style.display = 'block';
    postsList.innerHTML = ''; // Clear any existing posts

    try {
        const response = await fetch('http://45-56-108-13.ip.linodeusercontent.com/wp-json/wp/v2/posts?per_page=5');
        const posts = await response.json();

        posts.forEach(post => {
            const title = post.title.rendered;
            const link = post.link;

            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
            postsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        postsList.innerHTML = '<li>Error loading posts. Please try again later.</li>';
    } finally {
        // Hide the loading indicator after fetching
        loadingIndicator.style.display = 'none';
    }
}

// Call the function when the script loads
fetchBlogPosts();
