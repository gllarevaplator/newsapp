const newsContainer = document.querySelector(".news-container");
const searchForm = document.querySelector("#search-form");
let language = document.querySelector("#language-input").value;
let pagination = document.querySelector(".page");
let searchInput = "";
let nextPageQuery = "";

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchInput = document.querySelector("#search-input").value;
  language = document.querySelector("#language-input").value;
  nextPageQuery = "";
  getNews(searchInput, nextPageQuery, language);
});

const nextPage = document.querySelector(".next");
nextPage.addEventListener("click", (event) => {
  event.preventDefault();
  getNews(searchInput, nextPageQuery, language);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

const getNews = (search, nextPage, language) => {
  const baseURL = "https://newsdata.io/api/";
  const apiKey = "pub_30437a0204cdc364b33a1a8ac748559c0ebe3";
  fetch(
    `${baseURL}1/news?apikey=${apiKey}&q=${search}&page=${nextPage}&language=${language}`
  )
    .then((response) => response.json())
    .then((data) => {
      nextPageQuery = data.nextPage;
      if (data.results.length === 10) {
        pagination.style.display = "block";
      } else {
        pagination.style.display = "none";
      }
      newsContainer.innerHTML = data.results
        .map((news) => {
          return `<div class="card">
        <img
          src=${
            news.image_url != null
              ? news.image_url
              : "https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg"
          }
          alt="News Image"
        />
        <div class="news-content">
          <h2 class="news-title"><a href="${
            news.link
          }" target="_blank">${news.title
            .substring(0, 20)
            .concat("...")}</a></h2>
          <p class="news-description">
            ${
              news.description != null
                ? news.description.substring(0, 100).concat("...")
                : ""
            }
          </p>
        </div>
        <div class="news-meta-data">
          <p class="news-data">${news.pubDate.substring(0, 10)}</p>
          <p class="news-meta">${news.category[0]}</p>
        </div>
      </div>`;
        })
        .join("");
    })
    .catch((err) => {
      newsContainer.innerHTML = "Something went wrong, please try again!";
      console.log(err);
    });
};

getNews(searchInput, nextPageQuery, language);
