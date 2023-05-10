const API_KEY = `1191de317ad442a58c7b31d6942a11b3`;   
const API = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const AllNews = document.querySelector(".all-news");
const newsByCategory = document.querySelector(".news-by-category");
const newsBySource = document.querySelector(".search");
const categoryForm = document.querySelector("#category-form");
const category = document.getElementById("category");
const submit = document.getElementById("category-input");
const search = document.getElementById("search");
const query = document.getElementById("query");

let articles = [];

window.addEventListener("load", async () => {
  fetchApi(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`,
    AllNews  
  );
  fetchApi(
    `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${API_KEY}`,
    newsByCategory  
  );
  fetchApi(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`,
    search 
  );
});


submit.addEventListener("click", (e) => {
  e.preventDefault();
  fetchApi(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category.value}&apiKey=${API_KEY}`,
    newsByCategory
  );
});

search.addEventListener("click", (e) => {
  e.preventDefault();
  if (query.value != "") {
    fetchApi(
      `https://newsapi.org/v2/everything?q=${query.value}&apiKey=${API_KEY}`,
      search
    );
  } else {
    fetchApi(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`,
      search
    );
  }
});

const fetchApi = (API, part) => {
  articles = [];
  fetch(API)
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      articles = data.articles;

      printArticle(part);
    })
    .catch((err) => {
      console.error(err);
    });
};

const printArticle = (type) => {
  let output = "";
  if (articles != undefined) {
    articles.forEach((article) => {
      let img = "";
      if (article.urlToImage != null) {
        img = article.urlToImage;
      } else {
        img = "./img/no_image.png"; 
      }
      output += `
             <div class="col s4">
               <div class="card large">
                 <div class="card-image">
                   <img src=${img} >
                 </div>
                 <div class="card-content " style="flex-wrap: wrap;">
                   <h5>${article.title}</h5>
                   <p>${article.publishedAt}</p>
                 </div>
                 <div class="card-action">
                   <a href="${article.url}" target="_blank">Read More</a>
                 </div>
               </div>
             </div>
           `;
    });
  } else {
    output = "no results found";
  }

  if (type.classList.contains("all-news")) {
    AllNews.innerHTML = output;
  } else if (type.classList.contains("news-by-category")) {
    newsByCategory.innerHTML = output;
  } else {
    newsBySource.innerHTML = output;
  }
};