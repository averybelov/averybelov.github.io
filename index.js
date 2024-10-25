async function fetchBlogPosts() {
    const loadingIndicator = document.getElementById("loading");
    const postsList = document.getElementById("latest-posts");

    // Show the loading indicator
    loadingIndicator.style.display = 'block';
    postsList.innerHTML = ''; // Clear any existing posts

    try {
        const response = await fetch('https://www.theoreticalstate.xyz/feeds/posts/default?alt=rss');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const items = xml.getElementsByTagName("item");

        for (let i = 0; i < Math.min(items.length, 5); i++) {
            const title = items[i].getElementsByTagName("title")[0].textContent;
            const link = items[i].getElementsByTagName("link")[0].textContent;

            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
            postsList.appendChild(listItem);
        }
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
