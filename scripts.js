// Constants
const apiUrl = "https://en.wikipedia.org/w/api.php";

// Event listeners
document.getElementById("searchButton").addEventListener("click", searchWikipedia);
document.getElementById("randomButton").addEventListener("click", getRandomArticle);

// Function to perform Wikipedia search
function searchWikipedia() {
  const searchTerm = document.getElementById("searchInput").value.trim();
  if (searchTerm !== "") {
    const script = document.createElement("script");
    script.src = `${apiUrl}?action=query&format=json&list=search&srsearch=${encodeURIComponent(searchTerm)}&callback=displayResults`;
    document.head.appendChild(script);
  }
}

// Function to fetch a random Wikipedia article
function getRandomArticle() {
  const script = document.createElement("script");
  script.src = `${apiUrl}?action=query&format=json&list=random&rnnamespace=0&rnlimit=1&callback=openRandomArticle`;
  document.head.appendChild(script);
}

// Function to display search results
function displayResults(data) {
  if (data.query.search.length === 0) {
    document.getElementById("results").innerHTML = "<p>No results found.</p>";
  } else {
    const searchResults = data.query.search;
    const resultList = searchResults.map((result) => `
      <div>
        <h3>${result.title}</h3>
        <p>${result.snippet}</p>
        <a href="https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}" target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
    `).join("");
    document.getElementById("results").innerHTML = resultList;
  }
}

// Function to open random Wikipedia article
function openRandomArticle(data) {
  const title = data.query.random[0].title;
  window.location.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
}
