const countryCardContainer = document.querySelector(".country-card");

async function getCountryDataByName(countryName) {
  const response = await fetch(
    `https://restcountries.com/v2/name/${countryName}`
  );
  const [countryData] = await response.json();
  console.log(countryData);
  renderCountryData(countryData);
}

getCountryDataByName("Spain");

function renderCountryData(data) {
  const markup = `
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
  </figcaption>`;
  countryCardContainer.innerHTML = "";
  countryCardContainer.insertAdjacentHTML("afterbegin", markup);
  renderListOfCountries(data.borders);
}
const bArr = ["BEL", "DEU"];
async function renderListOfCountries(arr) {
  arr.forEach((code) => {
    getCountryDataCode(code).then((name) => {
      const markup = `<a class="border-country-btn">${name}</a>`;
      console.log(markup);
      const button = document.createElement("a");
      button.innerHTML = markup;
      document
        .querySelector(".border-list")
        .insertAdjacentHTML("afterend", markup);
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
