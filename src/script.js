// fetch(`https://restcountries.com/v2/name/peru`)
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));
const grid = document.querySelector(".card-grid");

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
async function getCountryData(countryName) {
  const response = await fetch(
    `https://restcountries.com/v2/name/${countryName}`
  );
  const [countryData] = await response.json();
  console.log(countryData);
  renderCountry(countryData);
}
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

// getCountryData("united states of america");
function loadHomepage() {
  starterCountries.forEach((country) => getCountryData(country));
}

loadHomepage();
