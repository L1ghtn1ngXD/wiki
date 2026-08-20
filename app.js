const article =
    document.getElementById("article");

const pageTitle =
    document.querySelector("title");

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const editLink =
    document.getElementById("editLink");


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


function renderMainPage() {

    pageTitle.textContent =
        "V0ltage's Wiki";

    article.innerHTML = `

        <h1>
            Main Page
        </h1>

        <hr>

        <div class="welcome">

            <h2>
                Welcome to V0ltage's Wiki
            </h2>

            <p>
                Find something idk uhh um i dont know
            </p>

        </div>

        <h2>
            About
        </h2>

        <p>
            umm hello this is voltage
            ty for visiting this wiki
            have a nice day
        </p>

        <h2>
            Explore
        </h2>

        <ul>

            <li>
                <a href="#all">
                    Browse all pages
                </a>
            </li>

            <li>
                <a href="#random">
                    Random article
                </a>
            </li>

            <li>
                <a href="#categories">
                    Browse categories
                </a>
            </li>

        </ul>

    `;

}


function renderSearch(query) {

    pageTitle.textContent =
        "Search";

    article.innerHTML = `

        <h1>
            Search
        </h1>

        <hr>

        <p>
            Search results for:
            <strong>
                ${escapeHTML(query)}
            </strong>
        </p>

        <p>
            No matching articles were found.
        </p>

    `;

}


function renderMissingPage(page) {

    const title =
        page.replaceAll("_", " ");

    pageTitle.textContent =
        title + " - My Wiki";

    article.innerHTML = `

        <h1>
            ${escapeHTML(title)}
        </h1>

        <hr>

        <p>
            This page does not exist.
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

        renderMissingPage(page);

    }


    editLink.href =
        "https://github.com/L1ghtn1ngXD/wiki/edit/main/index.html";

}


searchForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const query =
            searchInput.value.trim();

        if (!query) {
            return;
        }

        location.hash =
            "search/" +
            encodeURIComponent(query);

    }
);


window.addEventListener(
    "hashchange",
    renderPage
);


renderPage();
