import { renderCountryShowcase } from "./countryShowcaseView.js";
const main = document.querySelector(".main");

function init() {
  main.innerHTML = "";
  const markup = `
<header class="main-content__header">
  <form action="#" class="form">
    <input
      type="text"
      class="main-content__input country-query"
      placeholder="Search for a country..."
    />
    <select class="region-query" >
      <option class="region-select" value="" disabled selected hidden>Filter by Region</option>
      <option class="region-select" value="africa">Africa</option>
      <option class="region-select" value="americas">Americas</option>
      <option class="region-select" value="asia">Asia</option>
      <option class="region-select" value="europe">Europe</option>
      <option class="region-select" value="oceania">Oceania</option>
    </select>
  </form>
<section class="card-grid"></section>
`;
  main.insertAdjacentHTML("afterbegin", markup);
}
init();

//! Form Functions
//* Listening for a click on the region dropdown and getting the value from it
main.addEventListener("click", function (e) {
  const selcted = e.target.closest(".region-query");
  if (!selcted || selcted.value === "") return;
  const region = selcted.value;
  getRegionData(region);
  selcted.value = "";
});

//* Listening for a submit on our text form
main.addEventListener("submit", function (e) {
  const grid = document.querySelector(".card-grid");
  e.preventDefault();
  grid.innerHTML = "";
  const country = document.querySelector(".country-query").value;
  console.log(country);
  getCountryDataByName(country);
});

//! get country name from clicking on card
main.addEventListener("click", function (e) {
  const card = e.target.closest(".card");
  if (!card) return;
  const cardCountry = card.querySelector(".card__title").innerText;

  renderCountryShowcase(cardCountry);
});
const starterCountries = [
  "germany",
  "united states of america",
  "brazil",
  "iceland",
  "afghanistan",
  "aland islands",
  "albania",
  "algeria",
];
//* Gets all the country data by the selected region
async function getRegionData(region) {
  const grid = document.querySelector(".card-grid");
  grid.innerHTML = "";

  const response = await fetch(
    `https://restcountries.com/v3.1/region/${region}`
  );
  const regionData = await response.json();

  regionData.forEach((country) => getCountryDataByName(country.name.common));
}

//* Gets the individual country data by name
async function getCountryDataByName(countryName) {
  const response = await fetch(
    `https://restcountries.com/v2/name/${countryName}`
  );
  const [countryData] = await response.json();
  //! console.log(countryData);
  renderCountry(countryData);
}

//* Given the data of one country it this creates the markup for that country
function renderCountry(country) {
  const grid = document.querySelector(".card-grid");
  const markupCard = `
  <article class="card">
    <figure class="card__img-container">
      <img class="card__img" src="${country.flag}" alt="" />
    </figure>
    <figcaption class="card__info-container">
      <h3 class="card__title">${country.name}</h3>
      <p class="card__pop"><strong>Population:</strong> ${country.population}</p>
      <p class="card__region"><strong>Region:</strong> ${country.region}</p>
      <p class="card__capital"><strong>Capital:</strong> ${country.capital}</p>
    </figcaption>
  </article>
  `;
  grid.insertAdjacentHTML("afterbegin", markupCard);
}

//* Loads the landing page
function loadHomepage() {
  starterCountries.forEach((country) => getCountryDataByName(country));
}
loadHomepage();
export { init };
