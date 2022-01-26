const grid = document.querySelector(".card-grid");
const regionDropdown = document.querySelector(".region-query");
const form = document.querySelector(".form");
const inputCountry = document.querySelector(".country-query");
//* Form Functions
function regionSelected() {
  const region = regionDropdown.value;
  getRegionData(region);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  grid.innerHTML = "";

  const country = inputCountry.value;
  console.log(country);

  getCountryDataByName(country);
});

grid.addEventListener("click", function (e) {
  const card = e.target.closest(".card");
  const cardCountry = card.querySelector(".card__title").innerText;
  console.log(cardCountry);
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
  console.log(countryData);
  renderCountry(countryData);
}

//* Given the data of one country it this creates the markup for that country
function renderCountry(country) {
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
