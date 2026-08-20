const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");

const themeButton = document.getElementById("themeButton");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const article = document.getElementById("article");
const toc = document.getElementById("toc");

const editLink = document.getElementById("editLink");
const sourceLink = document.getElementById("sourceLink");


menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});


themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "wiki-theme",
        document.body.classList.contains("dark")
            ? "dark"
            : "light"
    );

});


if (localStorage.getItem("wiki-theme") === "dark") {
    document.body.classList.add("dark");
}


function updateContents() {

    toc.innerHTML = "";

    const headings = article.querySelectorAll("h2, h3");

    headings.forEach((heading, index) => {

        const id =
            heading.id ||
            "section-" + index;

        heading.id = id;

        const link = document.createElement("a");

        link.href = "#" + id;

        link.textContent = heading.textContent;

        if (heading.tagName === "H3") {
            link.classList.add("toc-level-3");
        }

        toc.appendChild(link);

    });

}


function updateGitHubLinks() {

    const repository =
        "https://github.com/L1ghtn1ngXD/wiki";

    const file =
        "index.html";

    const editUrl =
        repository +
        "/edit/main/" +
        file;

    const sourceUrl =
        repository +
        "/blob/main/" +
        file;

    editLink.href = editUrl;

    sourceLink.href = sourceUrl;

}


function getCurrentPage() {

    return decodeURIComponent(
        location.hash.substring(1)
    ) || "Main_Page";

}


function randomArticle() {

    const pages = [
        "Main_Page"
    ];

    const page =
        pages[
            Math.floor(
                Math.random() * pages.length
            )
        ];

    location.hash = page;

}


document
    .querySelector('a[href="#random"]')
    .addEventListener("click", (event) => {

        event.preventDefault();

        randomArticle();

    });


searchForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const query =
        searchInput.value.trim();

    if (!query) {
        return;
    }

    const encoded =
        encodeURIComponent(query);

    location.hash = "search/" + encoded;

});


function renderPage() {

    const page =
        getCurrentPage();

    if (page === "Main_Page") {

        article.innerHTML = `
            <h1>Main Page</h1>

            <hr>

            <section class="welcome-box">

                <h2>
                    Welcome to My Wiki
                </h2>

                <p>
                    Welcome to the free encyclopedia
                    that anyone can edit.
                </p>

            </section>

            <h2>About this wiki</h2>

            <p>
                My Wiki is a community-driven encyclopedia
                containing articles, information, guides,
                technical documentation and other useful content.
            </p>

            <h2>Navigation</h2>

            <ul>
                <li>
                    <a href="#all">
                        Browse all pages
                    </a>
                </li>

                <li>
                    <a href="#random">
                        Read a random article
                    </a>
                </li>

                <li>
                    <a href="#categories">
                        Browse categories
                    </a>
                </li>
            </ul>

            <h2>Featured article</h2>

            <p>
                There are currently no featured articles.
            </p>
        `;

    }

    else if (page === "all") {

        article.innerHTML = `
            <h1>All pages</h1>

            <hr>

            <p>
                This page contains all articles available
                on My Wiki.
            </p>

            <ul>
                <li>
                    <a href="#Main_Page">
                        Main Page
                    </a>
                </li>
            </ul>
        `;

    }

    else if (page === "categories") {

        article.innerHTML = `
            <h1>Categories</h1>

            <hr>

            <p>
                Browse the categories of My Wiki.
            </p>

            <ul>
                <li>
                    <a href="#all">
                        All pages
                    </a>
                </li>
            </ul>
        `;

    }

    else if (page.startsWith("search/")) {

        const query =
            decodeURIComponent(
                page.substring(7)
            );

        article.innerHTML = `
            <h1>Search results</h1>

            <hr>

            <p>
                Search results for:
                <strong>${escapeHtml(query)}</strong>
            </p>

            <p>
                No matching articles were found.
            </p>
        `;

    }

    else {

        article.innerHTML = `
            <h1>${escapeHtml(page.replaceAll("_", " "))}</h1>

            <hr>

            <p>
                This page does not exist yet.
            </p>

            <p>
                <a
                    href="https://github.com/L1ghtn1ngXD/wiki/new/main"
                    target="_blank"
                >
                    Create this page on GitHub
                </a>
            </p>
        `;

    }

    updateContents();

    updateGitHubLinks();

}


function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


window.addEventListener(
    "hashchange",
    renderPage
);


renderPage();
