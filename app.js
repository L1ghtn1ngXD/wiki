const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const article = document.getElementById("article");
const toc = document.getElementById("toc");

const pageTitle = document.getElementById("pageTitle");

const editLink = document.getElementById("editLink");
const sourceLink = document.getElementById("sourceLink");

const tocToggle = document.getElementById("tocToggle");


menuButton.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});


tocToggle.addEventListener("click", () => {

    if (toc.style.display === "none") {

        toc.style.display = "flex";

        tocToggle.textContent = "hide";

    } else {

        toc.style.display = "none";

        tocToggle.textContent = "show";

    }

});


searchForm.addEventListener("submit", event => {

    event.preventDefault();

    const query =
        searchInput.value.trim();

    if (!query) {
        return;
    }

    location.hash =
        "search/" +
        encodeURIComponent(query);

});


function getPage() {

    return decodeURIComponent(
        location.hash.substring(1)
    ) || "Main_Page";

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


function updateTOC() {

    toc.innerHTML = "";

    const headings =
        article.querySelectorAll("h2, h3");

    headings.forEach((heading, index) => {

        const id =
            heading.id ||
            "section-" + index;

        heading.id = id;

        const link =
            document.createElement("a");

        link.href =
            "#" + id;

        link.textContent =
            heading.textContent;

        if (heading.tagName === "H3") {

            link.classList.add(
                "toc-level-3"
            );

        }

        toc.appendChild(link);

    });

}


function updateGitHubLinks() {

    const repository =
        "https://github.com/L1ghtn1ngXD/wiki";

    const editURL =
        repository +
        "/edit/main/index.html";

    const sourceURL =
        repository +
        "/blob/main/index.html";

    editLink.href =
        editURL;

    sourceLink.href =
        sourceURL;

}


function renderMainPage() {

    pageTitle.textContent =
        "Main Page";

    article.innerHTML = `

        <div class="mw-welcome">

            <h2>
                Welcome to My Wiki
            </h2>

            <p>
                The free encyclopedia that anyone can edit.
            </p>

        </div>


        <h2>
            About My Wiki
        </h2>

        <p>
            My Wiki is a free encyclopedia containing
            articles, documentation, guides and information.
        </p>


        <h2>
            Featured content
        </h2>

        <p>
            There is currently no featured content.
        </p>


        <h2>
            Did you know?
        </h2>

        <ul>

            <li>
                This wiki is hosted on GitHub Pages.
            </li>

            <li>
                Articles can be contributed through GitHub.
            </li>

        </ul>

    `;

}


function renderSearch(query) {

    pageTitle.textContent =
        "Search results";

    article.innerHTML = `

        <h2>
            Search results
        </h2>

        <p>
            Search results for:
            <strong>${escapeHTML(query)}</strong>
        </p>

        <p>
            No matching articles were found.
        </p>

    `;

}


function renderPage() {

    const page =
        getPage();

    if (page === "Main_Page") {

        renderMainPage();

    }

    else if (page.startsWith("search/")) {

        const query =
            decodeURIComponent(
                page.substring(7)
            );

        renderSearch(query);

    }

    else if (page === "random") {

        renderMainPage();

    }

    else {

        pageTitle.textContent =
            page.replaceAll("_", " ");

        article.innerHTML = `

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


    updateTOC();

    updateGitHubLinks();

}


window.addEventListener(
    "hashchange",
    renderPage
);


renderPage();
