import { init } from "./script.js";
const main = document.querySelector(".main");
const templateCountryShowcase = ` 
<section class="country-card">
  <figure class="country-card__img-container">
    <img
      src="{%FLAG%}"
      alt=""
      class="country-card__img"
    />
  </figure>
  <figcaption class="country-card_info">
    <h2 class="country-card__title">{%NAME%}</h2>
    <div class="left-column column">
      <p class="country-card_native-name">
        <strong>Native name:</strong> {%NATIVE%}
      </p>
      <p class="country-card_pop">
        <strong>Population:</strong> {%POP%}
      </p>
      <p class="country-card_region"><strong>Region:</strong> {%REGION%}</p>
      <p class="country-card_sub-region">
        <strong>Sub Region:</strong> {%SUBREGION%}
      </p>
      <p class="country-card_capital">
        <strong>Capital:</strong> {%CAPITAL%}
      </p>
    </div>
    <div class="right-column column">
      <p class="country-card_domain">
        <strong>Top Level Domain:</strong> {%DOMAIN%}
      </p>
      <p class="country-card_currency">
        <strong>Currencies:</strong> {%CURRENCY%}
      </p>
      <p class="country-card_pop">
        <strong>Languages:</strong> {%LANG%}
      </p>
    </div>

    <div class="country-card__border-countries">
      <strong>Border Countries: </strong>
      {%BORDER%}
      <a class="border-country-btn">France</a>
      <a class="border-country-btn">Germany</a>
      <a class="border-country-btn">Netherlands</a>
    </div>
  </figcaption>
</section>
`;

async function getCountryDataByName(countryName) {
  const response = await fetch(
    `https://restcountries.com/v2/name/${countryName}`
  );
  const [countryData] = await response.json();
  return countryData;
}

async function renderCountryData(data) {
  console.log(data);
  const markup = await `
  <section class="country-card">
    <figure class="country-card__img-container">
    <img
      src="${data.flag}"
      alt=""
      class="country-card__img"
    />
  </figure>
  <figcaption class="country-card_info">
    <h2 class="country-card__title">${data.name}</h2>
    <div class="left-column column">
      <p class="country-card_native-name">
        <strong>Native name:</strong> ${data.nativeName}
      </p>
      <p class="country-card_pop">
        <strong>Population:</strong> ${data.population}
      </p>
      <p class="country-card_region"><strong>Region:</strong> ${data.region}</p>
      <p class="country-card_sub-region">
        <strong>Sub Region:</strong> ${data.subregion}
      </p>
      <p class="country-card_capital">
        <strong>Capital:</strong> ${data.capital}
      </p>
    </div>
    <div class="right-column column">
      <p class="country-card_domain">
        <strong>Top Level Domain:</strong> ${data.topLevelDomain[0]}
      </p>
      <p class="country-card_currency">
        <strong>Currencies:</strong> ${renderList(data.currencies)}
      </p>
      <p class="country-card_pop">
        <strong>Languages:</strong> ${renderList(data.languages)}
      </p>
    </div>

    <div class="country-card__border-countries">
      <strong class="border-list">Border Countries: </strong> 
      

    </div>
  </figcaption>
  <section>`;
  if (data.borders) {
    await renderListOfCountries(data.borders);
  }
  return markup;
}
//* Given a list of country codes we get the countries name and insert it as a button to the markup
async function renderListOfCountries(arr) {
  if (!arr) {
    return;
  }
  arr.forEach((code) => {
    getCountryDataCode(code).then((name) => {
      const markup = `<a class="border-country-btn">${name}</a>`;
      const button = document.createElement("a");
      button.innerHTML = markup;
      const list = document.querySelector(".border-list");
      list.insertAdjacentHTML("afterend", markup);
    });
  });
}

async function getCountryDataCode(code) {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  const [countryData] = await response.json();
  const countryName = countryData.name.common;
  return countryName;
}

const renderList = (arr) => {
  const list = arr.map((el) => el.name).join(", ");
  return list;
};

async function renderCountryShowcase(countryname) {
  main.innerHTML = "";
  const headerHTML = `
  <header class="main-content__header">
    <a href="#" class="country-display_back-btn"
      >&larr; Back</a
    >
  </header>`;

  const countryData = await getCountryDataByName(countryname);
  const showcaseHTML = await renderCountryData(countryData);
  main.insertAdjacentHTML("afterbegin", headerHTML + showcaseHTML);
}
//! Go back to home page
main.addEventListener("click", function (e) {
  const btnBack = e.target.closest(".country-display_back-btn");
  if (!btnBack) return;
  init();
});
//* Displays the country when we click on a bordering country
main.addEventListener("click", function (e) {
  const borderCountry = e.target.closest(".border-country-btn");
  if (!borderCountry) return;
  console.log(borderCountry.innerText);
  renderCountryShowcase(borderCountry.innerText);
});

export { renderCountryShowcase };
